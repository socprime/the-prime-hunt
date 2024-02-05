import { FC } from 'react';
import { observer } from 'mobx-react-lite';
import { AppHeader } from '../../../components/headers/AppHeader/AppHeader';
import { Spacer } from '../../../components/atoms/Spacer/Spacer';
import { useForm, useMail, useRouter } from '../../../stores';
import { BigStaticButton } from '../../../components/buttons/BigStaticButton/BigStaticButton';
import './styles.scss';

export const MailHeaderView: FC = observer(() => {
  const mail = useMail();
  const router = useRouter();
  const form = useForm();

  return (
    <div className="mail-header-view">
      <Spacer height={24} />
      <div className="group">
        <AppHeader>
          {mail.pattern?.name || mail.getInitialPattern().name}
        </AppHeader>
        <BigStaticButton
          className="remove-mail-pattern"
          onClick={() => {
            mail.removePatternById(mail.pattern?.id);
            router.goToSettingsPage('settings:mail');
          }}
          disabled={form.validating}
        >
          Delete Template
        </BigStaticButton>
      </div>
      <Spacer height={18} />
    </div>
  );
});
