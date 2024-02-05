import { Validate } from '../../../../../common/types';
import { AppInputProps } from '../AppInput/types';
import { ComponentWithValidationProps } from '../../extends/WithValidation/types';

export type FormValidationInputProps = {
  name?: string;
} & AppInputProps & ComponentWithValidationProps;

export type FormValidationInputRefs = {
  validate: Validate;
};
