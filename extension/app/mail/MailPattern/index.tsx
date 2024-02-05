import { FC } from 'react';
import { observer } from 'mobx-react-lite';
import { useForm, useMail } from '../../stores';
import { FormValidationInput } from '../../components/inputs/FormValidationInput';
import {
  getValidResult,
  isEmail,
  isNotEmptyString,
} from '../../../../common/validators';
import { initValues } from '../../../../common/helpers';
import { Mail as MailType } from '../mail-types';
import { FormValidationTextArea } from '../../components/textareas/FormValidationTextArea';
import './styles.scss';

const requiredMessage = 'This field is required';
const mailMessage = 'Value is not a valid email address';

export const MailPattern: FC = observer(() => {
  const mail = useMail();
  const form = useForm();

  const pattern = initValues(
    mail.pattern || {},
    mail.getInitialPattern(),
  ) as MailType;

  const {
    name,
    to,
    message,
    subject,
  } = pattern;

  const address = [...(to || [])][0] || '';

  return (
    <div className="mail-pattern">
      <FormValidationInput
        name="name"
        label="Display Name"
        value={name}
        disabled={form.validating}
        onChange={(value) => {
          mail.pattern = { ...pattern, name: value };
        }}
        validators={[
          {
            validator: (v: string) => Promise.resolve(isNotEmptyString(v, requiredMessage)),
            validateOnChange: true,
            validateOnBlur: true,
            validateOnFinish: true,
          },
        ]}
      />
      <FormValidationInput
        name="email"
        label="Email"
        onChange={(value) => {
          mail.pattern = { ...pattern, to: [value] };
        }}
        value={address}
        disabled={form.validating}
        validators={[
          {
            validator: (v: string) => {
              if (!v || !v?.trim()) {
                return Promise.resolve(getValidResult());
              }
              return Promise.resolve(isEmail(v, mailMessage));
            },
            validateOnChange: true,
            validateOnBlur: true,
            validateOnFinish: true,
          },
        ]}
      />
      <FormValidationInput
        name="subject"
        label="Subject"
        value={subject}
        disabled={form.validating}
        onChange={(value) => {
          mail.pattern = { ...pattern, subject: value };
        }}
      />
      <FormValidationTextArea
        name="message"
        label="Message"
        native={{
          value: message,
          disabled: form.validating,
          onChange: (e) => {
            mail.pattern = { ...pattern, message: e.target.value };
          },
        }}
        disabled={form.validating}
      />
    </div>
  );
});
