import { WatchingResources } from '../../types/types-background-common';
import { Url } from '../../../../common/types';

export const microsoftDefenderWatchers: WatchingResources = {
  'accounts': [
    'AccountName',
  ],
  'assets': [
    'DeviceName',
  ],
  'services': [],
};

export const microsoftDefenderPostsUrls: Url[] = [
  'https://api-eu.securitycenter.windows.com/api/',
  'https://security.microsoft.com/apiproxy/mtp/huntingService/queryExecutor',
];
