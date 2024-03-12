import {
  forwardRef,
  MutableRefObject,
  useEffect,
  useImperativeHandle,
  useRef,
} from 'react';
import { FormValidationTextAreaRefs, FormValidationTextAreaProps } from './types';
import { usePrevious } from '../../../app-hooks';
import { WithValidation } from '../../extends/WithValidation';
import { WithForm } from '../../extends/WithForm';
import { createClassName } from '../../../../common/common-helpers';
import { AppTextArea } from '../AppTextArea';

export const FormValidationTextArea = forwardRef<
  FormValidationTextAreaRefs,
  FormValidationTextAreaProps
>(({
  native = {},
  validators,
  name,
  ...restProps
}, refs) => {
  const { value } = native;

  const formValidationTextAreaRef: MutableRefObject<FormValidationTextAreaRefs> = useRef(
    {} as FormValidationTextAreaRefs,
  );

  const prevValue = usePrevious(value);

  useImperativeHandle(refs, () => {
    return formValidationTextAreaRef as any;
  });

  useEffect(() => {
    if (value !== prevValue) {
      setTimeout(() => {
        formValidationTextAreaRef?.current?.validate?.(['change']);
      }, 0);
    }
  }, [value, prevValue]);

  return (
    <div className="form-validation-textarea">
      <WithValidation
        getValue={(ref) => (ref?.current as HTMLTextAreaElement)?.value || null}
        disabled={!!restProps.disabled}
        validators={[
          ...(validators || []),
        ]}
      >
        {(withValidationProps) => {
          formValidationTextAreaRef.current.validate = withValidationProps.validate;
          return (
            <WithForm
              {...withValidationProps}
            >
              {(withFormProps) => {
                return (
                  <AppTextArea
                    {...restProps}
                    {...withFormProps}
                    ref={(ref) => {
                      if (ref?.textAreaRef.current) {
                        const el = ref.textAreaRef.current;
                        (el as any).name = name;
                        withValidationProps.elementRef.current = el;
                        withFormProps.elementRef.current = el;
                      }
                    }}
                    native={{
                      ...native,
                      value,
                      className: createClassName([
                        'form-validation-textarea',
                        native.className || '',
                        withFormProps.className || '',
                      ]),
                      onChange: (e) => {
                        withFormProps?.onChange?.(e);
                        native?.onChange?.(e);
                      },
                      onBlur: (e) => {
                        withFormProps?.onBlur?.(e);
                        native?.onBlur?.(e);
                      },
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
