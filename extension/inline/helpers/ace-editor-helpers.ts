import { ModifyQueryType } from '../../common/types/types-common';
import { clearExtraSpaces } from '../../../common/helpers';

export const getEditor = (element: Element | null) => {
  try {
    return ace.edit(element as HTMLElement);
  } catch (e) {
    return null;
  }
};

export const buildNewQuery = (
  currentQuery: string,
  suffix: string,
  modifyType: ModifyQueryType,
) => {
  const newQuery = `${
    modifyType === 'show all'
      ? currentQuery.split('|').shift()?.trim()
      || '<unknown>'
      : currentQuery
  } ${suffix}`;

  return clearExtraSpaces(newQuery);
};
