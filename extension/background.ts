import {
  registerPlatformsOnOpenedTabs,
} from './background/services/background-services';

require('./background/background-listeners');

registerPlatformsOnOpenedTabs();
