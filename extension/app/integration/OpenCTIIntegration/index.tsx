import React, {
  MutableRefObject,
  useEffect,
  useRef,
} from 'react';
import { observer } from 'mobx-react-lite';
import { IntegrationInput } from '../../integrations/IntegrationInput/IntegrationInput';
import { IntegrationInputRefs } from '../../integrations/IntegrationInput/types';
import { Spacer } from '../../components/atoms/Spacer/Spacer';
import { SuccessCheckbox } from '../../components/checkboxes/SucessCheckbox/SuccessCheckbox';
import { getValidResult, isNotEmptyString, isUrl } from '../../../../common/validators';
import { useAppMessageStore, useIntegrationStore } from '../../stores';
import { MessageToBackground } from '../../../background/types/types-background-messages';
import { IntegrationWorkPayload } from '../../../common/types/types-common-payloads';
import { OpenCTIIntegrationData } from '../../../integrations/openCTI/types';
import { AppGroupHeader } from '../../components/headers/AppGroupHeader';
import './styles.scss';

const validateMessage = 'This field is required';
const validateUrlMessage = 'Passed string is not an Url';

export const OpenCTIIntegration: React.FC = observer(() => {
  const messageStore = useAppMessageStore();
  const integrationStore = useIntegrationStore();

  const validateServerUrlRef: MutableRefObject<IntegrationInputRefs> = useRef(
    {} as IntegrationInputRefs,
  );
  const validateApiKeyRef: MutableRefObject<IntegrationInputRefs> = useRef(
    {} as IntegrationInputRefs,
  );

  useEffect(() => {
    integrationStore.setStorage({
      ...integrationStore.storage,
      isValid: false,
    } as OpenCTIIntegrationData);
  }, [integrationStore]);

  useEffect(() => {
    if (!integrationStore.storage?.isActive) {
      integrationStore.setStorage(integrationStore.storage);
      return;
    }
    setTimeout(() => {
      validateServerUrlRef.current?.validate?.(['blur']);
      validateApiKeyRef.current?.validate?.(['blur']);
    }, 0);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [integrationStore.storage?.isActive]);

  return (
    <div className="open-cti-integration">
      <Spacer height={28} />
      <AppGroupHeader>
        INTEGRATION SEND TO OPENCTI
      </AppGroupHeader>
      <Spacer height={18} />
      <SuccessCheckbox
        content={<>
          Send the IOCs to OpenCTI
        </>}
        checked={integrationStore.storage?.isActive}
        onStateChanged={(isChecked) => {
          integrationStore.setStorage({
            ...integrationStore.storage,
            isActive: isChecked,
          } as OpenCTIIntegrationData);
        }}
      />
      <Spacer height={16} />
      <IntegrationInput
        ref={(refs) => {
          if (refs?.validate) {
            validateServerUrlRef.current.validate = refs.validate;
          }
        }}
        label="GraphQL Server URL"
        value={integrationStore.storage?.server || ''}
        placeholder="ex https://my-site.com/opencti/graphql"
        disabled={!integrationStore.storage?.isActive}
        validators={[
          {
            validator: (v: string) => {
              return Promise.resolve(isNotEmptyString(v, validateMessage));
            },
            validateOnChange: true,
            validateOnBlur: true,
            validateOnFinish: true,
          },
          {
            validator: (value: string) => Promise.resolve(isUrl(value, validateUrlMessage)),
            validateOnChange: true,
            validateOnBlur: true,
            validateOnFinish: true,
          },
        ]}
        onChange={(value) => {
          integrationStore.setStorage({
            ...integrationStore.storage,
            server: value,
          } as OpenCTIIntegrationData);
        }}
      />
      <Spacer height={12} />
      <IntegrationInput
        ref={(refs) => {
          if (refs?.validate) {
            validateApiKeyRef.current.validate = refs.validate;
          }
        }}
        label="API Key"
        value={integrationStore.storage?.key || ''}
        disabled={!integrationStore.storage?.isActive}
        placeholder="ex 12334412-12331233-123-a123123"
        validators={[
          {
            validator: (v: string) => Promise.resolve(isNotEmptyString(v, validateMessage)),
            validateOnChange: true,
            validateOnBlur: true,
            validateOnFinish: true,
          },
          {
            validator: async (value: string) => {
              await integrationStore.setStorage({
                ...integrationStore.storage,
                key: value?.trim(),
                isValid: false,
              } as OpenCTIIntegrationData);
              const { error } = await messageStore.sendMessageWithCallback({
                type: MessageToBackground.BGIntegrationWork,
                payload: {
                  modelType: 'openCTI',
                  work: 'check-connection',
                } as IntegrationWorkPayload,
              });
              if (typeof error !== 'undefined') {
                return Promise.resolve({
                  isValid: false,
                  reasons: new Set([
                    'Wrong OpenCTI Server URL or API Key',
                  ]),
                });
              }
              return Promise.resolve(getValidResult());
            },
            validateOnFinish: true,
          },
        ]}
        onChange={(value) => {
          integrationStore.setStorage({
            ...integrationStore.storage,
            key: value,
          } as OpenCTIIntegrationData);
        }}
      />
    </div>
  );
});
