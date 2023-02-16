import { getDebugPrefix } from './common/loggers/loggers-helpers';

require('./common/loggers').loggers
  .setPrefix(getDebugPrefix('inline'));
