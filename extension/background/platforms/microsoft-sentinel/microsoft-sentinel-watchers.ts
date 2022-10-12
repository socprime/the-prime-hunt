import { WatchingResources } from '../../types/types-background-common';
import { Url } from '../../../../common/types';

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

export const microsoftSentinelPostsUrls: Url[] = [
  'https://api.loganalytics.io',
];
