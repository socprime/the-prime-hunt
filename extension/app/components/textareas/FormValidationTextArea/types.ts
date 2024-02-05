import { Validate } from '../../../../../common/types';
import { AppTextAreaRefs, AppTextAreaProps } from '../AppTextArea/types';
import { ComponentWithValidationProps } from '../../extends/WithValidation/types';

export type FormValidationTextAreaProps = {
  name?: string;
} & AppTextAreaProps & ComponentWithValidationProps;

export type FormValidationTextAreaRefs = {
  validate: Validate;
} & AppTextAreaRefs;
