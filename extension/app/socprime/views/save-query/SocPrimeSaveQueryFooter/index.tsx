import { FC } from 'react';
import { observer } from 'mobx-react-lite';
import { BigStaticButton } from '../../../../components/buttons/BigStaticButton/BigStaticButton';
import {
  useAppMessageStore, useForm, usePlatformStore, useRouter,
} from '../../../../stores';
import { Spacer } from '../../../../components/atoms/Spacer/Spacer';
import { BackgroundJob, PostRepositoryData, SaveQueryFormData } from '../../../../../models/socprime/types';
import { useQuery } from '../../../../query/stores/QueryStore';
import { mapDropdownItemsToIdsArray } from '../../../../../models/socprime/helpers';
import { AsyncResult } from '../../../../../../common/types';
import { SuccessSaveQueryMessage } from '../../../../query/messages/SuccessSaveQueryMessage';
import './styles.scss';

export const SocPrimeSaveQueryFooter: FC = observer(() => {
  const router = useRouter();
  const form = useForm();
  const queryStore = useQuery();
  const messageStore = useAppMessageStore();
  const platformStore = usePlatformStore();

  const isDisabled = form.validating || messageStore.inProgress;

  return (
    <>
      <Spacer height={12}/>
      <div className="soc-prime-save-query-footer">
        <BigStaticButton
          onClick={() => {
            router.goToResourcesPage('resources:query');
          }}
          disabled={isDisabled}
        >
          Close
        </BigStaticButton>
        <BigStaticButton
          disabled={isDisabled}
          onClick={() => {
            if (messageStore.error.id === BackgroundJob.PostQuery) {
              messageStore.cleanError();
            }
            let repositoryID = '';

            form.validate(['finish', 'blur'])
              .then((isValid) => {
                if (!isValid) {
                  return Promise.resolve({
                    error: new Error(),
                  } as AsyncResult);
                }
                const values = form.getFormData<SaveQueryFormData>();
                repositoryID = mapDropdownItemsToIdsArray(values.repository)[0] || '';

                return messageStore.sendMessageWithCallback({
                  model: 'socprime',
                  work: BackgroundJob.PostQuery,
                  data: {
                    repositoryID: mapDropdownItemsToIdsArray(values.repository)[0] || '',
                    postRepositoryData: {
                      query: queryStore.getQuery(),
                      contentName: values.content_name,
                      description: values.description,
                      siemType: platformStore.getType(),
                      tags: {
                        actor: mapDropdownItemsToIdsArray(values.actors),
                        custom: values.custom ? [values.custom] : undefined,
                        logsource: values.logsources ? [values.logsources] : undefined,
                        mitigations: mapDropdownItemsToIdsArray(values.mitigations),
                        tactics: mapDropdownItemsToIdsArray(values.tactics),
                        technique: mapDropdownItemsToIdsArray(values.techniques),
                        tool: mapDropdownItemsToIdsArray(values.tools),
                      },
                    } as PostRepositoryData,
                  },
                }, BackgroundJob.PostQuery);
              }).then(({ error }) => {
                if (!error) {
                  platformStore.setMessage(
                    () => <SuccessSaveQueryMessage repositoryID={repositoryID} />,
                  );
                  router.goToResourcesPage('resources:query');
                }
              });
          }}
        >
          Save to Repo
        </BigStaticButton>
      </div>
    </>
  );
});
