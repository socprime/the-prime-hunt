import { AppDropdownProps } from '../AppDropdown/AppDropdown';
import { ComponentWithValidationProps } from '../../extends/WithValidation/types';
import { ComponentWithFormProps } from '../../extends/WithForm/types';
import { AppListProps } from '../../lists/AppList/types';

export type FormValidationDropdownProps = {
  items: AppListProps['items'];
  name?: string;
  multi?: boolean;
  onChange?: (items: FormValidationDropdownProps['items']) => void;
} & Omit<AppDropdownProps, 'header' | 'opener'> & {
  selectedItem?: FormValidationDropdownProps['items'][0];
  label?: string;
} & ComponentWithValidationProps & ComponentWithFormProps;
