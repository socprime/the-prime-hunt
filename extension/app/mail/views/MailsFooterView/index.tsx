import { FC } from 'react';
import { useMail, useRouter } from '../../../stores';
import { BigStaticButton } from '../../../components/buttons/BigStaticButton/BigStaticButton';
import { PlusIcon } from '../../../components/atoms/icons/PlusIcon/PlusIcon';
import { suuid } from '../../../../../common/helpers';
import { Mail } from '../../mail-types';

export const MailsFooterView: FC = () => {
  const routerStore = useRouter();
  const mail = useMail();

  return (
    <>
      <BigStaticButton
        icon={<PlusIcon />}
        onClick={() => {
          const template = {
            id: suuid(),
            message: '',
            subject: '',
            cc: [],
            to: [],
            name: 'Custom',
          } as Mail;
          mail.pattern = template;
          routerStore.goToMailPage(template);
        }}
      >
        Add New Template
      </BigStaticButton>
    </>
  );
};
