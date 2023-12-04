import {
  useCallback,
  useMemo,
  useRef,
  useState,
  forwardRef, useImperativeHandle,
} from 'react';
import { createClassName } from '../../../../common/common-helpers';
import { isNotEmpty } from '../../../../../common/checkers';
import { useForceUpdate } from '../../../app-hooks';
import {
  ElementRef,
  Validate,
  ValidationResult,
  Validator,
  WithDependedChildren,
} from '../../../../../common/types';
import { getValidResult } from '../../../../../common/validators';
import { WithValidationProps, WithValidationRefs } from './types';
import './styles.scss';

type Props = WithDependedChildren<
  WithValidationProps,
  {
    [key: string]: any;
    getValue: WithValidationProps['getValue'];
    validate: Validate;
    elementRef: ElementRef;
    disabled: boolean;
  }
>;

export const WithValidation = forwardRef<
  WithValidationRefs,
  Props
>(({
  disabled,
  getValue,
  children,
  validators,
  onValidationEnd,
  ...restProps
}, refs) => {
  const [isValidating, setIsValidating] = useState(false);
  const message = useRef<string>('');
  const elementRef: ElementRef = useRef(null);
  const disabledRef = useRef(disabled);
  disabledRef.current = disabled;

  useImperativeHandle(refs, () => {
    return { elementRef };
  });

  const [
    validatorsOnBlur,
    validatorsOnChange,
    validatorsOnFinish,
  ] = useMemo(() => {
    const validatorsOnChange = [] as Validator[];
    const validatorsOnBlur = [] as Validator[];
    const validatorsOnFinish = [] as Validator[];
    validators?.forEach(({
      validator,
      validateOnChange = false,
      validateOnBlur = false,
      validateOnFinish = false,
    }) => {
      if (validateOnChange) {
        validatorsOnChange.push(validator);
      }
      if (validateOnBlur) {
        validatorsOnBlur.push(validator);
      }
      if (validateOnFinish) {
        validatorsOnFinish.push(validator);
      }
    });
    return [validatorsOnBlur, validatorsOnChange, validatorsOnFinish];
  }, [validators]);

  const forceUpdate = useForceUpdate();

  const finishValidation = useCallback((
    validationResult: ValidationResult,
  ) => {
    setIsValidating(false);
    const reason = Array.from(validationResult.reasons).pop() || '';
    if (message.current === reason) {
      return;
    }
    message.current = reason;
    onValidationEnd?.(validationResult);
    forceUpdate();
  }, [forceUpdate, onValidationEnd]);

  const validate: Validate = useCallback(async (types) => {
    // TODO add if disabled validation
    if (disabledRef.current) {
      return getValidResult();
    }
    const validators: Validator[] = [];
    if (types.includes('change') && validatorsOnChange.length) {
      validators.push(...validatorsOnChange);
    }
    if (types.includes('blur') && validatorsOnBlur.length) {
      validators.push(...validatorsOnBlur);
    }
    if (types.includes('finish') && validatorsOnFinish.length) {
      validators.push(...validatorsOnFinish);
    }
    if (validators.length < 1) {
      return getValidResult();
    }
    setIsValidating(true);
    const results = await Promise.all(
      validators.map((validate) => validate(getValue(elementRef))),
    );
    const failed = results.filter(({ isValid }) => !isValid);
    const result = failed.length
      ? failed[0]
      : getValidResult();
    finishValidation(result);
    return result;
  }, [
    finishValidation,
    getValue,
    validatorsOnBlur,
    validatorsOnChange,
    validatorsOnFinish,
  ]);

  const isError = isNotEmpty(message.current) && !disabled;

  return (
    <div
      className={createClassName([
        'with-validation',
        isError ? 'validation-error' : '',
      ])}
    >
      <div className="validation-component">
        {children({
          ...restProps,
          validate,
          getValue,
          elementRef,
          disabled,
          className: createClassName([
            isError ? 'validation-error' : '',
          ]),
          onBlur: () => {
            validate(['blur']);
          },
          onChange: () => {
            validate(['change']);
          },
        })}
        {isValidating && (<div className="spinner-wrapper">
          <div className="spinner"></div>
        </div>)}
      </div>
      <span className="validation-message">{disabled ? '' : message.current}</span>
    </div>
  );
});
