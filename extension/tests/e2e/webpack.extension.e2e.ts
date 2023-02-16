import minimist from 'minimist';
import { WebpackConfiguration } from 'webpack-cli';
import { Mode } from '../../../common/types';
import { EntryObject } from 'webpack';
import { join } from 'path';

const args = minimist<{
  mode?: Mode;
}>(process.argv.slice(2));
[args.env]
  .flat(1)
  .forEach(arg => String(arg).split('=')
    .forEach((part, _, arr) => args[arr[0]] = arr.length === 2 ? arr[1] : undefined,
    ),
  );

const mode = String(args?.mode).toLowerCase() === Mode.development ? Mode.development : Mode.production;

const entries = [
  'elastic',
  'qradar',
  'splunk',
  'arcsight',
  'microsoft-sentinel',
  'microsoft-defender',
].reduce((entry, name) => {
  entry[name] = [
    join(__dirname, 'platforms', `${name}.ts`),
  ];
  return entry;
}, {} as EntryObject);

module.exports = {
  mode,
  entry: {
    ...entries,
  },
  output: {
    path: join(__dirname, 'compiled', 'scenarios'),
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js'],
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/i,
        use: [
          {
            loader: 'ts-loader',
            options: {
              configFile: join(__dirname, '../../../tsconfig.json'),
              allowTsInNodeModules: true,
            },
          },
        ],
      },
    ],
  },
} as WebpackConfiguration;