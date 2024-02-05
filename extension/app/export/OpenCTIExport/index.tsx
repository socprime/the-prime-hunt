import React, { useEffect, useState } from 'react';
import SimpleBar from 'simplebar-react';
import { observer } from 'mobx-react-lite';
import { IntegrationInput } from '../../integrations/IntegrationInput/IntegrationInput';
import { List } from '../../components/atoms/List/List';
import { FormDropdown } from '../../components/dropdowns/FormDropdown';
import { FormDropdownProps } from '../../components/dropdowns/FormDropdown/types';
import { isNotEmptyArray, isNotEmptyString } from '../../../../common/validators';
import { ResourceName, ResourceType } from '../../resources/resources-types';
import { useAppMessageStore, useForm, useResourceStore } from '../../stores';
import { getIntegrationModel } from '../../../integrations';
import { IntegrationCheckbox } from '../../integrations/IntegrationCheckbox';
import { Spacer } from '../../components/atoms/Spacer/Spacer';
import './styles.scss';

export type OpenCTIExportProps = {
  resourceName: ResourceName;
  labelsItems: FormDropdownProps['items'];
  observableTypesItems: FormDropdownProps['items'];
  indicatorTypesItems: FormDropdownProps['items'];
  allowedMarkersItems: FormDropdownProps['items'];
};

const model = getIntegrationModel('openCTI')!;
const validateMessage = 'This field is required';

export const OpenCTIExport: React.FC<OpenCTIExportProps> = observer(({
  labelsItems,
  observableTypesItems,
  indicatorTypesItems,
  allowedMarkersItems,
  resourceName,
}) => {
  const resourceStore = useResourceStore();
  const [resourceType, setResourceType] = useState<ResourceType>(
    resourceStore.getType(resourceName),
  );
  const messageStore = useAppMessageStore();
  const form = useForm();

  const pattern = model.getPattern(resourceName, resourceType);

  useEffect(() => {
    // TODO clear message not here
    messageStore.error.error = null;
  }, []);

  return (
    <div className="open-cti-export">
      <Spacer height={12} />
      <IntegrationInput
        label="Name"
        name="name"
        value={resourceName}
        disabled={form.validating || messageStore.inProgress}
        validators={[
          {
            validator: (v: string) => Promise.resolve(isNotEmptyString(v, validateMessage)),
            validateOnChange: true,
            validateOnBlur: true,
            validateOnFinish: true,
          },
        ]}
      />
      <FormDropdown
        disabled={form.validating || messageStore.inProgress}
        classNameMenu="observable-type-list-menu open-cti-menu"
        items={observableTypesItems}
        onChange={(items = []) => {
          setResourceType(model.getTypeById(items[0]?.id));
        }}
        selectedItem={resourceType !== 'unknown' ? observableTypesItems.find(({ id }) => {
          return model.getTypeById(id) === resourceType;
        }) : undefined}
        label="Main Observable Type"
        name="x_opencti_main_observable_type"
        validators={[
          {
            validator: (v: string[]) => Promise.resolve(isNotEmptyArray(v, validateMessage)),
            validateOnBlur: true,
            validateOnFinish: true,
          },
        ]}
      >
        {(props) => <SimpleBar className="big-list">
          <List className="observable-type-list" {...props} />
        </SimpleBar>}
      </FormDropdown>
      <IntegrationInput
        label="Pattern"
        name="pattern"
        disabled={form.validating || messageStore.inProgress}
        value={pattern === resourceName ? '' : pattern}
        validators={[
          {
            validator: (v: string) => Promise.resolve(isNotEmptyString(v, validateMessage)),
            validateOnChange: true,
            validateOnBlur: true,
            validateOnFinish: true,
          },
        ]}
      />
      <FormDropdown
        disabled={form.validating || messageStore.inProgress}
        classNameMenu="indicator-type-list-menu open-cti-menu"
        items={indicatorTypesItems}
        label="Indicator Type"
        name="indicator_types"
        multi
      >
        {(props) => <SimpleBar className="big-list">
          <List className="indicator-type-list" {...props} />
        </SimpleBar>}
      </FormDropdown>
      <FormDropdown
        disabled={form.validating || messageStore.inProgress}
        classNameMenu="labels-list-menu open-cti-menu"
        items={labelsItems}
        label="Labels"
        name="objectLabel"
        multi
      >
        {(props) => <SimpleBar className="big-list">
          <List className="labels-list" {...props} />
        </SimpleBar>}
      </FormDropdown>
      <FormDropdown
        disabled={form.validating || messageStore.inProgress}
        classNameMenu="markers-list-menu open-cti-menu"
        items={allowedMarkersItems}
        label="Markings"
        name="objectMarking"
        multi
      >
        {(props) => <SimpleBar className="big-list">
          <List className="markers-list" {...props} />
        </SimpleBar>}
      </FormDropdown>
      <IntegrationCheckbox
        disabled={form.validating || messageStore.inProgress}
        content="Detection"
        name="x_opencti_detection"
      />
      <IntegrationCheckbox
        disabled={form.validating || messageStore.inProgress}
        content="Create observable from indicator"
        name="createObservables"
      />
      <Spacer height={6} />
    </div>
  );
});
