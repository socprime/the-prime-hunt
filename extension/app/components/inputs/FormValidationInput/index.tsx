import {
  forwardRef,
  MutableRefObject,
  useEffect,
  useImperativeHandle,
  useRef,
} from 'react';
import {
  FormValidationInputProps,
  FormValidationInputRefs,
} from './types';
import { usePrevious } from '../../../app-hooks';
import { WithForm } from '../../extends/WithForm';
import { AppInput } from '../AppInput/AppInput';
import { createClassName } from '../../../../common/common-helpers';
import { WithValidation } from '../../extends/WithValidation';

export const FormValidationInput = forwardRef<FormValidationInputRefs, FormValidationInputProps>(({
  value,
  validators,
  name,
  ...restProps
}, refs) => {
  const formValidationInputRef: MutableRefObject<FormValidationInputRefs> = useRef(
    {} as FormValidationInputRefs,
  );

  const prevValue = usePrevious(value);

  useImperativeHandle(refs, () => {
    return formValidationInputRef.current;
  });

  useEffect(() => {
    if (value !== prevValue) {
      setTimeout(() => {
        formValidationInputRef?.current?.validate?.(['change']);
      }, 0);
    }
  }, [value, prevValue]);

  return (
    <div className="form-validation-input">
      <WithValidation
        getValue={(ref) => (ref?.current as HTMLInputElement)?.value || null}
        disabled={!!restProps.disabled}
        validators={[
          ...(validators || []),
        ]}
      >
        {(withValidationProps) => {
          formValidationInputRef.current.validate = withValidationProps.validate;
          return (
            <WithForm
              {...withValidationProps}
            >
              {(withFormProps) => {
                return (
                  <AppInput
                    {...restProps}
                    {...withFormProps}
                    ref={(ref) => {
                      if (ref) {
                        (ref as any).name = name;
                        withValidationProps.elementRef.current = ref;
                        withFormProps.elementRef.current = ref;
                      }
                    }}
                    value={value}
                    className={createClassName([
                      'form-validation-input',
                      restProps.className || '',
                      withFormProps.className || '',
                    ])}
                    onChange={(e) => {
                      withFormProps?.onChange?.(e);
                      restProps?.onChange?.(e);
                    }}
                    onBlur={(e) => {
                      withFormProps?.onBlur?.(e);
                      restProps?.onBlur?.(e);
                    }}
                  />
                );
              }}
            </WithForm>
          );
        }}
      </WithValidation>
    </div>
  );
});
