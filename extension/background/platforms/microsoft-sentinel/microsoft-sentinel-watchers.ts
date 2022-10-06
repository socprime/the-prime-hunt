import { WatchingResources } from '../../types/types-background-common';

export const microsoftSentinelWatchers: WatchingResources = {
  'accounts': [
    'UserName',
    'Account',
    'SubjectUserName',
    'TargetUserName',
  ],
  'assets': [
    'Computer',
  ],
  'services': [],
};
