import { FC } from 'react';
import { observer } from 'mobx-react-lite';
import { RefreshIcon } from '../../../../components/atoms/icons/RefreshIcon/RefreshIcon';
import { BigStaticButton } from '../../../../components/buttons/BigStaticButton/BigStaticButton';
import { useSocPrime } from '../../../stores/SocPrimeStore';
import { useForm } from '../../../../stores';

export const SocPrimeApiFooterView: FC = observer(() => {
  const socprime = useSocPrime();
  const form = useForm();

  return (
    <div>
      <BigStaticButton
        icon={<RefreshIcon />}
        className="clear-socprime-api-data"
        onClick={() => {
          socprime.setApiKey(undefined);
        }}
        disabled={form.validating}
      >
        Restore Defaults
      </BigStaticButton>
    </div>
  );
});
