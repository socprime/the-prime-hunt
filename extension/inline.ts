import { getDebugPrefix } from './common/loggers/loggers-debug';

require('./common/loggers').loggers
  .setPrefix(getDebugPrefix('inline'));
