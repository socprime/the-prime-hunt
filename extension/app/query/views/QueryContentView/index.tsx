import { FC } from 'react';
import { observer } from 'mobx-react-lite';
import { AppTextArea } from '../../../components/textareas/AppTextArea';
import { AnimatedCopyIcon } from '../../../components/icons/AnimatedCopyIcon/AnimatedCopyIcon';
import { StaticButton } from '../../../components/buttons/StaticButton/StaticButton';
import { useQuery } from '../../stores/QueryStore';
import { copyToClipboard } from '../../../../common/common-helpers';
import { ExportIcon } from '../../../components/atoms/icons/ExportIcon/ExportIcon';
import { Spacer } from '../../../components/atoms/Spacer/Spacer';
import { RefreshIcon } from '../../../components/atoms/icons/RefreshIcon/RefreshIcon';
import { useRouter } from '../../../stores';
import { useSocPrime } from '../../../socprime/stores/SocPrimeStore';
import './styles.scss';

export const QueryContentView: FC = observer(() => {
  const queryStore = useQuery();
  const socprime = useSocPrime();
  const router = useRouter();
  const disabled = queryStore.query.value?.trim?.().length < 1;

  return (
    <div className="query-content-view">
      <AppTextArea
        native={{
          className: 'query-textarea',
          value: queryStore.query.value,
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
          disabled={disabled}
          icon={<AnimatedCopyIcon disabled={disabled} />}
          animatedIcon
          onClick={() => {
            copyToClipboard(queryStore.query.value);
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
