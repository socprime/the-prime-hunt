import { WatchingResources } from '../../types/types-background-common';
import { deduplicateArray } from '../../../../common/helpers';
import { Url } from '../../../../common/types';
import { isAllowedProtocol } from '../../../../common/checkers';
import { mode } from '../../../common/envs';
import { SplunkJobID } from './splunk-types';

export const splunkWatchers: WatchingResources = {
  accounts: deduplicateArray([
    'src_user',
    'src_user_bunit',
    'user',
    'Account_Name',
    'User',
    'src_user_name',
    'user_name',
  ]),
  assets: deduplicateArray([
    'dest_host',
    'dst',
    'dest_nt_host',
    'src_host',
    'src_nt_host',
    'src',
    'dest',
    'dest_name',
    'dest_host',
    'dvc',
    'dvc_host',
    'dest_dns',
    'src_dns',
    'ComputerName',
    'DestinationHostname',
    'SourceHostname',
  ]),
  services: [],
};

export const matchSplunkSummaryUrl = (url: Url): SplunkJobID | undefined => {
  const { protocol, href } = new URL(url);
  if (!isAllowedProtocol(protocol, mode)) {
    return undefined;
  }
  return href.match(/\/search\/jobs\/([.0-9]+)\/summary/)?.[1];
};

export const matchSplunkResultsUrl = (url: Url): SplunkJobID | undefined => {
  const { protocol, href } = new URL(url);
  if (!isAllowedProtocol(protocol, mode)) {
    return undefined;
  }
  return href.match(/\/search\/jobs\/([.0-9]+)\/results/)?.[1];
};
