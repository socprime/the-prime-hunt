import React, { useCallback, useEffect } from 'react';
import { PlusIcon } from '../../../components/atoms/icons/PlusIcon/PlusIcon';
import { CheckIcon } from '../../../components/atoms/icons/CheckIcon/CheckIcon';
import { Spacer } from '../../../components/atoms/Spacer/Spacer';
import { useAppStore, useIntegrationsStore } from '../../../stores';
import { observer } from 'mobx-react-lite';
import { createClassName } from '../../../../common/common-helpers';
import { uuid } from '../../../../../common/helpers';
import { BigStaticButton } from '../../../components/buttons/BigStaticButton/BigStaticButton';
import { AppTooltip } from '../../../components/tooltips/AppTooltip/AppTooltip';
import './styles.scss';
import { Integration } from '../../integrations-types';

export const IntegrationFooterView: React.FC = observer(() => {
  const appStore = useAppStore();
  const integrationsStore = useIntegrationsStore();

  const onSaveAndCloseClick = useCallback(() => {
    if (integrationsStore.emptyIntegration) {
      const input = appStore.rootElement
        ?.querySelector('.validation-input.empty') as HTMLInputElement;
      input.scrollIntoView({ behavior: 'smooth' });
      setTimeout(() => {
        input.focus();
        input.blur();
      }, 300);
      return;
    }
    integrationsStore.save();
    appStore.view = 'resources';
  }, [appStore, integrationsStore]);

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      const code = e.code?.toLowerCase?.() || '';
      if (code === 'escape') {
        onSaveAndCloseClick();
      }
    };
    document.addEventListener('keydown', onKeyDown);
    return () => document.removeEventListener('keydown', onKeyDown);
  }, [onSaveAndCloseClick]);

  return (
    <>
      <Spacer height={20} />
      <div className="integration-footer-view">
        <BigStaticButton
          icon={<PlusIcon />}
          onClick={() => {

            integrationsStore.integrations.push({ id: uuid() as Integration['id'], url: '', name: '' });

            setTimeout(() => {
              appStore.rootElement
                ?.querySelector('.integration:last-child')!
                .scrollIntoView({
                  block: 'end',
                  behavior: 'smooth',
                });
            }, 0);
          }}
        >
          Add New Integration
        </BigStaticButton>
        <AppTooltip
          className="small"
          content="Save and close (Esc)"
        >
          <BigStaticButton
            icon={<CheckIcon />}
            className={createClassName([
              integrationsStore.emptyIntegration ? 'error' : 'success-btn',
            ])}
            onClick={onSaveAndCloseClick}
          >
            Save & Close
          </BigStaticButton>
        </AppTooltip>
      </div>
    </>
  );
});
