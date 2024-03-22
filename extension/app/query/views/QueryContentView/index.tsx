import { FC } from 'react';
import lzString from 'lz-string';
import { observer } from 'mobx-react-lite';
import { AppTextArea } from '../../../components/textareas/AppTextArea';
import { AnimatedCopyIcon } from '../../../components/icons/AnimatedCopyIcon/AnimatedCopyIcon';
import { StaticButton } from '../../../components/buttons/StaticButton/StaticButton';
import { useQuery } from '../../stores/QueryStore';
import { copyToClipboard } from '../../../../common/common-helpers';
import { ExportIcon } from '../../../components/atoms/icons/ExportIcon/ExportIcon';
import { Spacer } from '../../../components/atoms/Spacer/Spacer';
import { RefreshIcon } from '../../../components/atoms/icons/RefreshIcon/RefreshIcon';
import { usePlatformStore, useRouter } from '../../../stores';
import { useSocPrime } from '../../../socprime/stores/SocPrimeStore';
import { getData } from '../../../../common/extension-storage';
import { ExtensionSettings } from '../../../../common/local-storage/types';
import { UncoderIcon } from '../../../components/atoms/icons/UncoderIcon';
import './styles.scss';
import { SiemType } from '../../../../common/types/types-common';

export const QueryContentView: FC = observer(() => {
  const queryStore = useQuery();
  const socprime = useSocPrime();
  const router = useRouter();
  const platformStore = usePlatformStore();
  const disabled = queryStore.getQuery()?.trim?.().length < 1;

  return (
    <div className="query-content-view">
      <AppTextArea
        native={{
          className: 'query-textarea',
          value: queryStore.getQuery(),
          disabled: true,
          placeholder: 'Open your SIEM and run a query to see results.',
        }}
      />
      <Spacer height={8} />
      <div className="bt-line-1">
        <StaticButton
          icon={<RefreshIcon />}
          animatedIcon
          onClick={() => {
            queryStore.getQueryFromPlatform();
          }}
        >
          Refresh
        </StaticButton>
        <StaticButton
          className="open-in-uncoder-ai"
          disabled={disabled}
          onClick={() => {
            getData()
              .then((result) => {
                const {
                  uncoderAiUrl = 'https://tdm.socprime.com',
                } = ((result.data?.settings || {}) as ExtensionSettings)?.socprime || {};
                const query = lzString.compressToEncodedURIComponent(queryStore.getQuery());
                const siemType = platformStore.getType();
                const destinationSiemType = (
                  platformStore.platform?.getType() === SiemType.Sentinel
                  && document.location.href.indexOf('SiemMigration') > -1
                )
                  ? `&destinationSiemType=${SiemType.Sentinel}`
                  : '';
                window.open(`${uncoderAiUrl}/uncoder-ai?query=${query}&siemType=${siemType}${destinationSiemType}`, '_blank');
              });
          }}
          icon={<UncoderIcon />}
        >
          Open in Uncoder AI
        </StaticButton>
        <StaticButton
          disabled={disabled}
          icon={<AnimatedCopyIcon disabled={disabled} />}
          animatedIcon
          onClick={() => {
            copyToClipboard(queryStore.getQuery());
          }}
        >
          Copy
        </StaticButton>
        <StaticButton
          className="save-to-repo-btn"
          disabled={disabled || !socprime.apiKey}
          onClick={() => {
            router.goToSocPrimePage('socprime:save-query');
          }}
          icon={<ExportIcon />}
        >
          Save to My Repo
        </StaticButton>
      </div>
      <Spacer height={32} />
    </div>
  );
});
