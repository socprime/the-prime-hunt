import { DropdownContentItem, DropdownItem } from '../../../common/types';
import { SiemType } from '../../common/types/types-common';

export type SocPrimeData = {
  apiKey: string | undefined;
  expirationData: string;
};

export enum StorageGroupNames {
  socprime = 'socprime'
}

export type SocPrimeTags = {
  techniques: DropdownItem[];
  tactics: DropdownItem[];
  tools: DropdownItem[];
  actors: DropdownItem[];
  mitigations: DropdownItem[];
}

export type SocPrimeCustomTags = {
  logsources: string[];
  custom: string[];
}

export type SocPrimeRepositories = {
  id: string;
  name: string;
}[]

export enum BackgroundJob {
  CheckConnection = 'CheckConnection',
  GetFormData = 'GetFormData',
  PostQuery = 'PostQuery',
}

export type PostRepositoryData = {
  contentName: string;
  query: string;
  siemType: SiemType;
  description?: string;
  tags?: {
    technique?: string[];
    tactics?: string[];
    tool?: string[];
    actor?: string[];
    mitigations?: string[];
    logsource?: string[];
    custom?: string[];
  };
}

export type SaveQueryFormData = {
  content_name: string;
  custom: string;
  description: string;
  logsources: string;
  actors: DropdownContentItem[];
  mitigations: DropdownContentItem[];
  repository: DropdownContentItem[];
  tactics: DropdownContentItem[];
  techniques: DropdownContentItem[];
  tools: DropdownContentItem[];
}
