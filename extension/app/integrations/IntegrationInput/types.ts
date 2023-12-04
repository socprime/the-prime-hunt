import { AppInputProps } from '../../components/inputs/AppInput/types';
import { Validate } from '../../../../common/types';
import { ComponentWithValidationProps } from '../../components/extends/WithValidation/types';

export type IntegrationInputProps = {
  name?: string;
} & AppInputProps & ComponentWithValidationProps;

export type IntegrationInputRefs = {
  validate: Validate;
};
