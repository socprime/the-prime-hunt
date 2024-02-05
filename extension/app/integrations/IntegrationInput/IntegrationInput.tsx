import {
  forwardRef,
} from 'react';
import { createClassName } from '../../../common/common-helpers';
import { IntegrationInputProps, IntegrationInputRefs } from './types';
import { FormValidationInput } from '../../components/inputs/FormValidationInput';
import './styles.scss';

export const IntegrationInput = forwardRef<IntegrationInputRefs, IntegrationInputProps>(({
  ...restProps
}, refs) => {
  return <FormValidationInput
    {...restProps}
    ref={refs}
    className={createClassName([
      'integration-input',
      restProps.className || '',
    ])}
  />;
});
