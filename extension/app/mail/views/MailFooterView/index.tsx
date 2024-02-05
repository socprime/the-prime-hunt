import { FC } from 'react';
import { BigStaticButton } from '../../../components/buttons/BigStaticButton/BigStaticButton';
import { RefreshIcon } from '../../../components/atoms/icons/RefreshIcon/RefreshIcon';
import { CheckIcon } from '../../../components/atoms/icons/CheckIcon/CheckIcon';
import { useForm, useMail, useRouter } from '../../../stores';

export const MailFooterView: FC = () => {
  const mail = useMail();
  const form = useForm();
  const router = useRouter();

  return (
    <div className="integration-footer-view">
      <BigStaticButton
        icon={<RefreshIcon />}
        className="refresh-mail-data"
        onClick={() => {
          mail.pattern = mail.getPatternById(mail.pattern?.id);
        }}
        disabled={form.validating}
      >
        Restore Defaults
      </BigStaticButton>
      <BigStaticButton
        className="success-btn"
        icon={<CheckIcon />}
        onClick={() => {
          form.validate(['blur', 'finish'])
            .then((isSuccess) => {
              if (!isSuccess || !mail.pattern) {
                return Promise.reject();
              }
              return mail.putPattern(mail.pattern);
            })
            .then(() => {
              router.goToSettingsPage('settings:mail');
            });
        }}
        disabled={form.validating}
      >
        Save & Close
      </BigStaticButton>
    </div>
  );
};
