import React from 'react';
import { PlusIcon } from '../../../atoms/icons/PlusIcon/PlusIcon';
import { CheckIcon } from '../../../atoms/icons/CheckIcon/CheckIcon';
import { Spacer } from '../../../atoms/Spacer/Spacer';
import { useAppStore, useIntegrationsStore } from '../../../../stores';
import { observer } from 'mobx-react-lite';
import { createClassName } from '../../../../../common/common-helpers';
import { uuid } from '../../../../../../common/helpers';
import { BigStaticButton } from '../../../buttons/BigStaticButton/BigStaticButton';
import './styles.scss';

export const IntegrationFooterView: React.FC = observer(() => {
  const appStore = useAppStore();
  const integrationsStore = useIntegrationsStore();

  return (
    <>
      <Spacer height={20} />
      <div className="integration-footer-view">
        <BigStaticButton
          icon={<PlusIcon />}
          onClick={() => {
            integrationsStore.integrations.push({ id: uuid(), url: '', name: '' });
            setTimeout(() => {
              appStore.rootElement
                .querySelector('.integration:last-child')!
                .scrollIntoView({
                  block: 'end',
                  behavior: 'smooth',
                });
            }, 0);
          }}
        >
          Add New Integration
        </BigStaticButton>
        <BigStaticButton
          icon={<CheckIcon />}
          className={createClassName([
            integrationsStore.emptyIntegration ? 'error' : 'success-btn',
          ])}
          onClick={() => {
            if (integrationsStore.emptyIntegration) {
              const input = appStore.rootElement
                .querySelector('.validation-input.empty') as HTMLInputElement;
              input.scrollIntoView({ behavior: 'smooth' });
              setTimeout(() => {
                input.focus();
                input.blur();
              }, 300);
              return;
            }
            integrationsStore.save();
            appStore.view = 'resources';
          }}
        >
          Save & Close
        </BigStaticButton>
      </div>
    </>
  );
});
