import {
  forwardRef, MutableRefObject, useEffect, useImperativeHandle, useRef,
} from 'react';
import { createClassName } from '../../../common/common-helpers';
import { IntegrationInputProps, IntegrationInputRefs } from './types';
import { AppInput } from '../../components/inputs/AppInput/AppInput';
import { WithValidation } from '../../components/extends/WithValidation';
import { WithForm } from '../../components/extends/WithForm';
import { usePrevious } from '../../app-hooks';
import './styles.scss';

export const IntegrationInput = forwardRef<IntegrationInputRefs, IntegrationInputProps>(({
  value,
  validators,
  name,
  ...restProps
}, refs) => {
  const integrationInputRefs: MutableRefObject<IntegrationInputRefs> = useRef(
    {} as IntegrationInputRefs,
  );

  const prevValue = usePrevious(value);

  useImperativeHandle(refs, () => {
    return integrationInputRefs.current;
  });

  useEffect(() => {
    if (value !== prevValue) {
      setTimeout(() => {
        integrationInputRefs?.current?.validate?.(['change']);
      }, 0);
    }
  }, [value, prevValue]);

  return (
    <WithValidation
      getValue={(ref) => (ref?.current as HTMLInputElement)?.value || null}
      disabled={!!restProps.disabled}
      validators={[
        ...(validators || []),
      ]}
    >
      {(withValidationProps) => {
        integrationInputRefs.current.validate = withValidationProps.validate;
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
                    'integration-input',
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
  );
});
