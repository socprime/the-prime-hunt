import { ComponentWithValidationProps } from '../../components/extends/WithValidation/types';
import { SuccessCheckboxProps } from '../../components/checkboxes/SucessCheckbox/SuccessCheckbox';

export type IntegrationCheckboxProps = {
  disabled?: boolean;
  name?: string;
} & ComponentWithValidationProps & SuccessCheckboxProps;
