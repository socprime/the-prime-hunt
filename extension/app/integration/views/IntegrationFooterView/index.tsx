import React from 'react';
import { observer } from 'mobx-react-lite';
import { BigStaticButton } from '../../../components/buttons/BigStaticButton/BigStaticButton';
import {
  useForm, useRouter, useIntegrationStore, useIntegrationsStore,
} from '../../../stores';
import { CheckIcon } from '../../../components/atoms/icons/CheckIcon/CheckIcon';
import { OpenCTIIntegrationData } from '../../../../integrations/openCTI/types';
import { RefreshIcon } from '../../../components/atoms/icons/RefreshIcon/RefreshIcon';
import { mappedIntegrations } from '../../../integrations/integrations';
import { AsyncResult } from '../../../../../common/types';
import './styles.scss';

export const IntegrationFooterView: React.FC = observer(() => {
  const formStore = useForm();
  const router = useRouter();
  const integrationStore = useIntegrationStore();
  const integrationsStore = useIntegrationsStore();

  const integration = integrationStore.getIntegration();
  const ifNotCustomIntegration = mappedIntegrations.has(integration?.id as any);

  return (
    <div className="integration-footer-view">
      {ifNotCustomIntegration && (<BigStaticButton
        icon={<RefreshIcon />}
        className="clear-integration-data"
        onClick={() => {
          integrationStore.setDefaults();
        }}
        disabled={formStore.validating}
      >
        Restore Defaults
      </BigStaticButton>)}
      <BigStaticButton
        className="success-btn"
        icon={<CheckIcon />}
        onClick={() => {
          Promise.all([
            formStore.validate(['finish', 'blur']),
            integrationStore.getStorage(),
          ])
            .then(([isSuccess, storage]) => {
              if (!isSuccess) {
                return { error: new Error('Validation failed') };
              }
              if (!storage || !storage.data) {
                return {} as AsyncResult;
              }
              return integrationStore.setStorage({
                ...storage.data,
                isValid: storage.data.isActive,
              } as OpenCTIIntegrationData);
            })
            .then((result) => {
              if (!result.error) {
                integrationsStore.save();
                router.goToSettingsPage('settings:integrations');
              }
            });
        }}
        disabled={formStore.validating}
      >
        Save & Close
      </BigStaticButton>
    </div>
  );
});
