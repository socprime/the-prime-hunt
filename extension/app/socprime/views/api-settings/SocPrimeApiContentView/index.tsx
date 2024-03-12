import { FC } from 'react';
import { observer } from 'mobx-react-lite';
import { FormValidationInput } from '../../../../components/inputs/FormValidationInput';
import { useAppMessageStore, useForm } from '../../../../stores';
import { useSocPrime } from '../../../stores/SocPrimeStore';
import { getValidResult } from '../../../../../../common/validators';
import { AppLink } from '../../../../components/links/AppLink/AppLink';
import { Spacer } from '../../../../components/atoms/Spacer/Spacer';
import './styles.scss';
import { BackgroundJob } from '../../../../../models/socprime/types';
import { AppInput } from '../../../../components/inputs/AppInput/AppInput';

export const SocPrimeApiContentView: FC = observer(() => {
  const form = useForm();
  const socprime = useSocPrime();
  const messageStore = useAppMessageStore();

  const setApiKey = async (apiKey: string) => {
    const nValue = apiKey?.trim?.();
    if (nValue !== socprime.apiKey) {
      return socprime.setApiKey(nValue?.length > 0 ? nValue : undefined);
    }
    return Promise.resolve();
  };

  return (
    <div className="socprime-api-content-view">
      <FormValidationInput
        label="API Key"
        name="apikey"
        placeholder="put your API Key here"
        disabled={form.validating}
        value={socprime.apiKey}
        onBlur={(value) => {
          setApiKey(value);
        }}
        validators={[
          {
            validator: async (value: string) => {
              if (!value) {
                return Promise.resolve(getValidResult());
              }
              await setApiKey(value);
              const { error, data } = await messageStore.sendMessageWithCallback({
                model: 'socprime',
                work: BackgroundJob.CheckConnection,
              }, 'socprime-api-tab');
              if (error) {
                await socprime.setKeyExpirationDate('');
                return Promise.resolve({
                  isValid: false,
                  reasons: new Set([
                    (typeof error === 'string'
                      ? error
                      : error.message) || 'Wrong API Key',
                  ]),
                });
              }
              await socprime.setKeyExpirationDate(data || 'unknown');
              return Promise.resolve(getValidResult());
            },
            validateOnBlur: true,
            validateOnFinish: true,
          },
        ]}
      />
      <AppInput
        placeholder="Expiration Date"
        label="Expiration Date"
        name="expiration-date"
        value={socprime.keyExpirationData || 'unknown'}
        disabled
      />
      <Spacer height={16} />
      <div className="socprime-get-api-message">To get the API key, please register at <AppLink
        href="https://tdm.socprime.com"
        target="_blank"
      >
        tdm.socprime.com
      </AppLink></div>
    </div>
  );
});
