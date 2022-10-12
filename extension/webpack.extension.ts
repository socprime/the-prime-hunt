import { join, parse } from 'path';
import { existsSync } from 'fs';
import minimist from 'minimist';
import TerserPlugin from 'terser-webpack-plugin';
import { BundleAnalyzerPlugin } from 'webpack-bundle-analyzer';
import { WebpackCompiler, WebpackConfiguration } from 'webpack-cli';
import { copySync, emptyDirSync, outputFileSync } from 'fs-extra';
import { AbsFilePath, HTMLTextContent, LogLevel, Mode } from '../common/types';
import { buildManifest } from './manifest/manifest-utils';
import { Browser, PlatformID } from './common/types/types-common';
import { DefinePlugin } from 'webpack';
import { appStyles, microsoftDefenderInline, microsoftSentinelInline } from './manifest/public-resources';

const args = minimist<{
  mode: Mode;
  browser: Browser;
  env: string | string[];
  analyze: boolean;
  'content-platform': PlatformID;
  'background-platform': PlatformID;
  level: LogLevel;
  debugID: string;
}>(process.argv.slice(2));
[args.env]
  .flat(1)
  .forEach(arg => String(arg).split('=')
    .forEach((part, _, arr) => args[arr[0]] = arr.length === 2 ? arr[1] : undefined,
    ),
  );

const allowedBrowsers = Object.keys(Browser);

let browsers = String(args?.browser)
  .split(',')
  .map(b => b.toLowerCase())
  .filter(b => allowedBrowsers.includes(b));
browsers = browsers.length ? browsers : allowedBrowsers;

const mode = String(args?.mode).toLowerCase() === Mode.production ? Mode.production : Mode.development;
const distDirPath = join(__dirname, '../dist');

emptyDirSync(join(distDirPath, mode));

const browser = browsers.splice(0, 1)[0];
const output = join(distDirPath, mode);
const iconsFolder = join(__dirname, 'manifest', 'icons');
const contentPlatform = Object.keys(PlatformID).includes(args['content-platform'])
  ? args['content-platform']
  : null;
const backgroundPlatform = Object.keys(PlatformID).includes(args['background-platform'])
  ? args['background-platform']
  : null;
const logLevel = Object.keys(LogLevel).includes(args.level)
  ? args.level
  : LogLevel.info;

const buildBrowserAssets = (b: Browser) => {
  outputFileSync(join(output, b, 'manifest.json'), JSON.stringify(buildManifest(b, mode), null, 3));
  if (existsSync(iconsFolder)) {
    copySync(iconsFolder, join(output, b, 'icons'), { overwrite: true });
  }
};

const styles = new Map<AbsFilePath, HTMLTextContent>();

module.exports = {
  mode,
  entry: {
    content: join(__dirname, './content.ts'),
    background: join(__dirname, './background.ts'),
    [parse(microsoftSentinelInline).name]: join(__dirname, `./inline/${parse(microsoftSentinelInline).name}.ts`),
    [parse(microsoftDefenderInline).name]: join(__dirname, `./inline/${parse(microsoftDefenderInline).name}.ts`),
  },
  output: {
    path: join(output, browser),
  },
  optimization: {
    minimizer: [
      new TerserPlugin({
        extractComments: false,
      }),
    ],
  },
  resolveLoader: {
    modules: ['./node_modules', './@loaders'],
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js'],
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ['to-string-loader', 'css-loader'],
      },
      {
        test: /\.s[ac]ss$/i,
        use: [
          {
            loader: 'transform',
            options: {
              transform: (content: string, assets: {
                filePath: AbsFilePath,
              }) => {
                styles.set(assets.filePath, content);
                return '';
              },
            },
          },
          'sass-loader',
        ],
      },
      {
        test: /\.tsx?$/i,
        use: [
          {
            loader: 'ts-loader',
            options: {
              configFile: join(__dirname, '../tsconfig.json'),
              allowTsInNodeModules: true,
            },
          },
        ],
      },
    ],
  },
  devtool: false,
  plugins: [
    {
      apply(compiler: WebpackCompiler) {
        compiler.hooks.done.tap('webpackOnDone', () => {
          setTimeout(() => {
            outputFileSync(
              join(output, browser, appStyles),
              Array.from(styles).reduce((res: string[], [, value]) => {
                res.push(value);
                return res;
              }, []).join('\n'),
            );
            browsers.forEach(b => {
              copySync(join(output, browser), join(output, b), { overwrite: true });
              buildBrowserAssets(b as Browser);
            });
            buildBrowserAssets(browser as Browser);
            console.log('~~~~~~~~~~~~~~~~~~~~');
            console.log('Compilation finished');
            console.log(`Mode: ${mode}`);
            console.log(`check "dist/${mode}/" folder`);
            console.log('~~~~~~~~~~~~~~~~~~~~');
          }, 0);
        });
      },
    },
    new DefinePlugin({
      'process.env.MODE': JSON.stringify(mode),
      'process.env.CONTENT_PLATFORM': JSON.stringify(contentPlatform),
      'process.env.BACKGROUND_PLATFORM': JSON.stringify(backgroundPlatform),
      'process.env.LOG_LEVEL': JSON.stringify(logLevel),
      'process.env.DEBUG_ID': JSON.stringify(args.debugID),
    }),
    ...(args.analyze ? [new BundleAnalyzerPlugin()] : []),
  ],
} as WebpackConfiguration;

// yarn extension --watch --env=content-platform=microsoftSentinel