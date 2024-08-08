import TerserPlugin from "terser-webpack-plugin";
import { fileURLToPath } from "url";
import path from "path";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

/**
 * Helper function to create webpack configurations.
 * @param {Object} options Options for creating a webpack target.
 * @param {string} options.name Name of output file.
 * @param {string} options.suffix Suffix of output file.
 * @param {string} options.format Format of output file.
 * @param {string} options.type Type of library.
 * @param {string} options.dynamicImportMode Dynamic import mode.
 * @returns {import('webpack').Configuration} One webpack target.
 */
function buildConfig({
  name = "",
  suffix = ".js",
  type = "module", // 'module' | 'commonjs'
  ignoreModules = [],
} = {}) {
  const outputModule = type === "module";

  const alias = Object.fromEntries(
    ignoreModules.map((module) => {
      return [module, false];
    }),
  );

  /** @type {import('webpack').Configuration} */
  const config = {
    mode: 'development',
    devtool: 'source-map',
    entry: {
      [`transformers${name}`]: './src/transformers.js',
      [`transformers${name}.min`]: './src/transformers.js',
    },
    output: {
      filename: `[name]${suffix}`,
      path: path.join(__dirname, 'dist'),
      library: {
        type,
      },
      assetModuleFilename: '[name][ext]',
      chunkFormat: 'module',
    },
    optimization: {
      minimize: true,
      minimizer: [new TerserPlugin({
        test: new RegExp(`\\.min\\${suffix}$`),
        extractComments: false,
      })],
    },
    experiments: {
      outputModule,
    },
    resolve: { alias },

    // Do not bundle the following modules with webpack (mark as external)
    // NOTE: This is necessary for both type="module" and type="commonjs",
    // and will be ignored when building for web (only used for node/deno)
    externals: ['onnxruntime-node', 'sharp'],

    // Development server
    devServer: {
      static: {
        directory: __dirname,
      },
      port: 8080,
    },
  };

  if (outputModule) {
    config.module = {
      parser: {
        javascript: {
          importMeta: false
        }
      }
    }
  } else {
    config.externalsType = 'commonjs';
  }

  return config;
}

export default [
  buildConfig({
    type: "module",
  }),
  buildConfig({
    suffix: ".cjs",
    type: "commonjs",
    ignoreModules: ["onnxruntime-web", "onnxruntime-web/webgpu"],
  }),
];
