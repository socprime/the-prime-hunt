import {
  ElementRef, GetValueFromElement, ValidationResult, Validator,
} from '../../../../../common/types';

export type WithValidationProps = {
  getValue: GetValueFromElement;
  disabled: boolean;
  validators: {
    validator: Validator;
    validateOnChange?: boolean;
    validateOnBlur?: boolean;
    validateOnFinish?: boolean;
  }[];
  onValidationEnd?: (result: ValidationResult) => void;
};

export type ComponentWithValidationProps = Omit<WithValidationProps, 'getValue' | 'validators' | 'disabled'> & {
  disabled?: WithValidationProps['disabled'];
  validators?: WithValidationProps['validators'];
};

export type WithValidationRefs = {
  elementRef: ElementRef;
};
