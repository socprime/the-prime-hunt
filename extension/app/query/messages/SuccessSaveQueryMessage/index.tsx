import { SuccessMessage } from '../../../root/messages/SuccessMessage';
import { StaticButton } from '../../../components/buttons/StaticButton/StaticButton';
import { usePlatformStore } from '../../../stores';
import { AppLink } from '../../../components/links/AppLink/AppLink';
import './styles.scss';

export const SuccessSaveQueryMessage = () => {
  const platformStore = usePlatformStore();

  return (
    <SuccessMessage
      className="success-save-query-message"
    >
      <p>
        Query have been successfully save to your repository. <AppLink
        href="https://tdm.socprime.com/expert"
        target="_blank"
      >
        Open in My Repo
      </AppLink>
      </p>
      <StaticButton
        onClick={() => {
          platformStore.setMessage(null);
        }}
      >
        Close
      </StaticButton>
    </SuccessMessage>
  );
};
