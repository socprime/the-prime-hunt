import { SocPrimeCustomTags, SocPrimeTags } from './types';
import { DropdownContentItem } from '../../../common/types';

export const getInitialTagsValues = (): SocPrimeTags => {
  return {
    techniques: [],
    actors: [],
    tactics: [],
    mitigations: [],
    tools: [],
  };
};

export const getInitialCustomTagsValues = (): SocPrimeCustomTags => {
  return {
    custom: [],
    logsources: [],
  };
};

export const mapDropdownItemsToIdsArray = (items: DropdownContentItem[]): string[] => {
  return (items || []).reduce((res, { id }) => {
    res.push(id);
    return res;
  }, [] as string[]);
};
