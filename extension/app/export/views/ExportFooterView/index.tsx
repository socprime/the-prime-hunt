import React from 'react';
import { BigStaticButton } from '../../../components/buttons/BigStaticButton/BigStaticButton';
import { CheckIcon } from '../../../components/atoms/icons/CheckIcon/CheckIcon';
import {
  useAppMessageStore, useRouter, useForm, usePlatformStore,
} from '../../../stores';
import { observer } from 'mobx-react-lite';
import { SuccessOpenCTIExportMessage } from '../../../resources/messages/SuccessOpenCTIExportMessage';
import './styles.scss';

export const ExportFooterView: React.FC = observer(() => {
  const routerStore = useRouter();
  const messageStore = useAppMessageStore();
  const formStore = useForm();
  const platformStore = usePlatformStore();

  return (
    <div
      className="export-footer-view"
    >
      <BigStaticButton
        disabled={formStore.validating || messageStore.inProgress}
        onClick={() => {
          routerStore.goToResourcesPage();
        }}
      >
        Cancel
      </BigStaticButton>
      <BigStaticButton
        className="success-btn"
        icon={<CheckIcon />}
        disabled={formStore.validating || messageStore.inProgress}
        onClick={() => {
          messageStore.error.error = null;
          formStore.validate(['blur', 'finish'])
            .then((isSuccess) => {
              if (!isSuccess) {
                return null;
              }
              const formData = formStore.getFormData();
              return messageStore.sendMessageWithCallback({
                model: 'openCTI',
                work: 'export-data',
                data: formData,
              });
            })
            .then((result) => {
              if (!result || result.error) {
                return;
              }
              platformStore.setMessage(SuccessOpenCTIExportMessage);
              routerStore.goToResourcesPage();
            });
        }}
      >
        Send
      </BigStaticButton>
    </div>
  );
});
