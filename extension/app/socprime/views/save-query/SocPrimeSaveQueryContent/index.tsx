import { FC, useEffect, useMemo } from 'react';
import get from 'get-value';
import SimpleBar from 'simplebar-react';
import { observer } from 'mobx-react-lite';
import { FormValidationDropdown } from '../../../../components/dropdowns/FormValidationDropdown';
import { DropdownMenuList } from '../../../../components/dropdowns-menus/DropdownMenuList';
import { DropdownMenuListProps } from '../../../../components/dropdowns-menus/DropdownMenuList/types';
import { useAppMessageStore, useForm } from '../../../../stores';
import { FormValidationInput } from '../../../../components/inputs/FormValidationInput';
import { FormValidationTextArea } from '../../../../components/textareas/FormValidationTextArea';
import { Spacer } from '../../../../components/atoms/Spacer/Spacer';
import { useSocPrime } from '../../../stores/SocPrimeStore';
import { AppGroupHeader } from '../../../../components/headers/AppGroupHeader';
import { MitreIcon } from '../../../../components/atoms/icons/MitreIcon';
import { mapDropdownItemToContentItem } from '../../../../app-helpers';
import { BackgroundJob, SocPrimeTags } from '../../../../../models/socprime/types';
import { TagIcon } from '../../../../components/atoms/icons/TagIcon';
import { isNotEmptyArray, isNotEmptyString } from '../../../../../../common/validators';
import './styles.scss';

const validateMessage = 'This field is required';

export const SocPrimeSaveQueryContent: FC = observer(() => {
  const form = useForm();
  const messageStore = useAppMessageStore();
  const socprime = useSocPrime();

  useEffect(() => {
    messageStore.sendMessageWithCallback({
      model: 'socprime',
      work: BackgroundJob.GetFormData,
    }).then((result) => {
      socprime.repositories = get(result, result?.meta?.repositories) || [];
      socprime.tags = get(result, result?.meta?.tags) || socprime.getInitialTagsValues();
      socprime.customTags = socprime.getInitialCustomTagsValues();
    });
  }, [messageStore, socprime]);

  const repositoriesItems: DropdownMenuListProps['items'] = useMemo(() => {
    return mapDropdownItemToContentItem(socprime.repositories || []);
  }, [socprime.repositories]);

  const tagsItems = useMemo(() => {
    const tags = (socprime.tags || {}) as SocPrimeTags;
    return Object.keys(socprime.getInitialTagsValues())
      .reduce((res, tagName: keyof SocPrimeTags) => {
        if (typeof tags[tagName] !== 'undefined') {
          res[tagName] = mapDropdownItemToContentItem(tags[tagName]);
        }
        return res;
      }, {} as Record<keyof SocPrimeTags, DropdownMenuListProps['items']>);
  }, [socprime.tags]);

  const isFieldDisabled = form.validating || messageStore.inProgress;

  return (
    <SimpleBar className="soc-prime-save-query-content">
      <FormValidationDropdown
        label="Repository"
        name="repository"
        items={repositoriesItems}
        disabled={isFieldDisabled}
        validators={[
          {
            validator: (v: string[]) => {
              return Promise.resolve(isNotEmptyArray(v, validateMessage));
            },
            validateOnBlur: true,
            validateOnFinish: true,
            validateOnChange: true,
          },
        ]}
      >
        {(props) => {
          return (<DropdownMenuList {...props} />);
        }}
      </FormValidationDropdown>
      <FormValidationInput
        label="Content Name"
        name="content_name"
        value=""
        disabled={isFieldDisabled}
        validators={[
          {
            validator: (v: string) => {
              return Promise.resolve(isNotEmptyString(v, validateMessage));
            },
            validateOnBlur: true,
            validateOnFinish: true,
            validateOnChange: true,
          },
        ]}
      />
      <FormValidationTextArea
        name="description"
        label="Description"
        native={{
          value: '',
          disabled: isFieldDisabled,
        }}
        disabled={isFieldDisabled}
      />
      <Spacer height={6} />
      <AppGroupHeader>
        <MitreIcon /> MITRE ATT&CK
      </AppGroupHeader>
      <Spacer height={12} />
      <FormValidationDropdown
        label="Tactics"
        name="tactics"
        items={tagsItems?.tactics || []}
        disabled={isFieldDisabled}
        multi
      >
        {(props) => <SimpleBar className="big-list" >
          <DropdownMenuList {...props} />
        </SimpleBar>}
      </FormValidationDropdown>
      <FormValidationDropdown
        label="Techniques & Sub-Techniques"
        name="techniques"
        items={tagsItems?.techniques || []}
        disabled={isFieldDisabled}
        multi
      >
        {(props) => <SimpleBar className="big-list" >
          <DropdownMenuList
            {...props}
            customRender={(item) => `${item.id}: ${item.content}`}
          />
        </SimpleBar>}
      </FormValidationDropdown>
      {/*<FormValidationDropdown*/}
      {/*  label="Mitigations"*/}
      {/*  name="mitigations"*/}
      {/*  items={tagsItems?.mitigations || []}*/}
      {/*  disabled={isFieldDisabled}*/}
      {/*>*/}
      {/*  {(props) => <SimpleBar className="big-list" >*/}
      {/*    <DropdownMenuList {...props} />*/}
      {/*  </SimpleBar>}*/}
      {/*</FormValidationDropdown>*/}
      <FormValidationDropdown
        label="Tools/Software"
        name="tools"
        items={tagsItems?.tools || []}
        disabled={isFieldDisabled}
        multi
      >
        {(props) => <SimpleBar className="big-list" >
          <DropdownMenuList {...props} />
        </SimpleBar>}
      </FormValidationDropdown>
      <FormValidationDropdown
        label="Actors/Groups"
        name="actors"
        items={tagsItems?.actors || []}
        disabled={isFieldDisabled}
        multi
      >
        {(props) => <SimpleBar className="big-list" >
          <DropdownMenuList {...props} />
        </SimpleBar>}
      </FormValidationDropdown>
      <Spacer height={6} />
      <AppGroupHeader>
        <TagIcon /> Tags
      </AppGroupHeader>
      <Spacer height={12} />
      <FormValidationInput
        label="Log Sources"
        name="logsources"
        disabled={isFieldDisabled}
        value={socprime.customTags?.logsources?.length > 0
          ? socprime.customTags.logsources[0]
          : ''}
        onBlur={(value) => {
          socprime.customTags.logsources = [value];
        }}
      />
       <FormValidationInput
        label="Custom"
        name="custom"
        disabled={isFieldDisabled}
        value={socprime.customTags?.custom?.length > 0
          ? socprime.customTags.custom[0]
          : ''}
        onBlur={(value) => {
          socprime.customTags.custom = [value];
        }}
       />
      <Spacer height={12} />
    </SimpleBar>
  );
});
