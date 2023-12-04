import {
  ElementRef,
  GetValueFromElement,
  Validate,
} from '../../../../../common/types';

export type WithFormProps = {
  disabled: boolean;
  getValue: GetValueFromElement;
}

export type WithFormRefs = {
  elementRef: ElementRef;
};

export type ComponentWithFormProps = {
  name: string;
  disabled?: boolean;
};

export type FormRefs = {
  elementRef?: ElementRef;
  validate?: Validate;
  getValue?: GetValueFromElement;
}
