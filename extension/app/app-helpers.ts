import { DropdownContentItem, DropdownItem } from '../../common/types';

export const mapDropdownItemToContentItem = (data: DropdownItem[]): DropdownContentItem[] => {
  return (data || []).map(({ name, id }) => {
    return {
      id,
      content: name,
    };
  });
};
