import { AppDropdownProps } from '../AppDropdown/AppDropdown';
import { ComponentWithValidationProps } from '../../extends/WithValidation/types';
import { ComponentWithFormProps } from '../../extends/WithForm/types';

export type FormDropdownProps = {
  items: {
    id: string;
    content: string;
    isSelected?: boolean;
    onClick?: () => void
  }[];
  name?: string;
  multi?: boolean;
  onChange?: (items: FormDropdownProps['items']) => void;
} & Omit<AppDropdownProps, 'header' | 'opener'> & {
  selectedItem?: FormDropdownProps['items'][0];
  label?: string;
} & ComponentWithValidationProps & ComponentWithFormProps;
