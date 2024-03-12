import { FC } from 'react';
import { observer } from 'mobx-react-lite';
import { AppHeader } from '../../../../components/headers/AppHeader/AppHeader';
import { Spacer } from '../../../../components/atoms/Spacer/Spacer';
import { ErrorMessage } from '../../../../root/messages/ErrorMessage';
import { StaticButton } from '../../../../components/buttons/StaticButton/StaticButton';
import { useAppMessageStore } from '../../../../stores';

export const SocPrimeSaveQueryHeader: FC = observer(() => {
  const messageStore = useAppMessageStore();

  return (
    <div>
      <Spacer height={24} />
      <AppHeader>Save To My Repository</AppHeader>
      {messageStore.error.error && (<>
        <Spacer height={12} />
        <ErrorMessage>
          <p>{messageStore.error.error.message}</p>
          <StaticButton
            onClick={() => {
              messageStore.cleanError();
            }}
          >
            Close
          </StaticButton>
        </ErrorMessage>
        <Spacer height={3} />
      </>)}
      <Spacer height={16} />
    </div>
  );
});
