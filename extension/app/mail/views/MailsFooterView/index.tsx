import { FC } from 'react';
import { useRouter } from '../../../stores';
import { BigStaticButton } from '../../../components/buttons/BigStaticButton/BigStaticButton';
import { PlusIcon } from '../../../components/atoms/icons/PlusIcon/PlusIcon';
import { suuid } from '../../../../../common/helpers';
import { Mail } from '../../mail-types';

export const MailsFooterView: FC = () => {
  const router = useRouter();

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
          router.goToMailPage(template);
        }}
      >
        Add New Template
      </BigStaticButton>
    </>
  );
};
