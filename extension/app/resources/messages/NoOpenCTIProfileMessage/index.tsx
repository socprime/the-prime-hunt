import React from 'react';
import { observer } from 'mobx-react-lite';
import { StaticButton } from '../../../components/buttons/StaticButton/StaticButton';
import { WarningMessage } from '../../../root/messages/WarningMessage';
import {
  useRouter,
  useIntegrationsStore,
  usePlatformStore,
} from '../../../stores';
import { Integration } from '../../../integration/integration-types';
import './styles.scss';

export const NoOpenCTIProfileMessage: React.FC = observer(() => {
  const platformStore = usePlatformStore();
  const integrationsStore = useIntegrationsStore();
  const router = useRouter();

  return (
    <WarningMessage
      className="no-open-cti-profile-message"
    >
      <p>
        No profile found for submission to OpenCTI. Please create a new profile to proceed
      </p>
      <StaticButton
        onClick={() => {
          platformStore.setMessage(null);
        }}
      >
        Cancel
      </StaticButton>
      <StaticButton
        onClick={() => {
          router.goToIntegrationPage(
            integrationsStore.integrations
              .find((i) => i.id === '$open-cti$') as Integration,
          );
          platformStore.setMessage(null);
        }}
      >
        Create Profile
      </StaticButton>
    </WarningMessage>
  );
});
