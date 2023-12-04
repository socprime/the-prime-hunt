import { FC } from 'react';
import { WithValidation } from '../../components/extends/WithValidation';
import { WithForm } from '../../components/extends/WithForm';
import { SuccessCheckbox } from '../../components/checkboxes/SucessCheckbox/SuccessCheckbox';
import { IntegrationCheckboxProps } from './types';

export const IntegrationCheckbox: FC<IntegrationCheckboxProps> = ({
  name,
  disabled,
  validators,
  content,
  ...restProps
}) => {
  return (
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
  );
};
