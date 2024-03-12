import { FC } from 'react';
import { WithForm } from '../../extends/WithForm';
import { SuccessCheckbox } from '../SucessCheckbox/SuccessCheckbox';
import { WithValidation } from '../../extends/WithValidation';
import { FormValidationCheckboxProps } from './types';

export const FormValidationCheckbox: FC<FormValidationCheckboxProps> = ({
  disabled,
  name,
  validators,
  content,
  ...restProps
}) => {
  return (
    <div className="form-validation-checkbox">
      <WithValidation
        getValue={(ref) => (ref?.current as HTMLInputElement)?.checked || false}
        disabled={!!disabled}
        validators={[
          ...(validators || []),
        ]}
      >
        {(withValidationProps) => {
          return (
            <WithForm
              {...withValidationProps}
            >
              {(withFormProps) => {
                return (
                  <SuccessCheckbox
                    {...restProps}
                    {...withFormProps}
                    ref={(refs) => {
                      if (refs?.elementRef?.current) {
                        (refs.elementRef.current as any).name = name;
                        withFormProps.elementRef.current = refs.elementRef.current;
                        withValidationProps.elementRef.current = refs.elementRef.current;
                      }
                    }}
                    content={content}
                  />
                );
              }}
            </WithForm>
          );
        }}
      </WithValidation>
    </div>
  );
};
