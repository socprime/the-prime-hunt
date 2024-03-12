import { ComponentWithValidationProps } from '../../extends/WithValidation/types';
import { SuccessCheckboxProps } from '../SucessCheckbox/SuccessCheckbox';

export type FormValidationCheckboxProps = {
  disabled?: boolean;
  name?: string;
} & ComponentWithValidationProps & SuccessCheckboxProps;
