import { useEffect, useState, FC } from 'react';
import SimpleBar from 'simplebar-react';
import { observer } from 'mobx-react-lite';
import { FormValidationDropdown } from '../../components/dropdowns/FormValidationDropdown';
import { FormValidationDropdownProps } from '../../components/dropdowns/FormValidationDropdown/types';
import { isNotEmptyArray, isNotEmptyString } from '../../../../common/validators';
import { ResourceName, ResourceType } from '../../resources/resources-types';
import { useAppMessageStore, useForm, useResourceStore } from '../../stores';
import { Spacer } from '../../components/atoms/Spacer/Spacer';
import { getOpenCTIModel } from '../../../models/openCTI/model';
import { DropdownMenuList } from '../../components/dropdowns-menus/DropdownMenuList';
import { FormValidationInput } from '../../components/inputs/FormValidationInput';
import { FormValidationCheckbox } from '../../components/checkboxes/FormValidationCheckbox';
import './styles.scss';

export type OpenCTIExportProps = {
  resourceName: ResourceName;
  labelsItems: FormValidationDropdownProps['items'];
  observableTypesItems: FormValidationDropdownProps['items'];
  indicatorTypesItems: FormValidationDropdownProps['items'];
  allowedMarkersItems: FormValidationDropdownProps['items'];
};

const model = getOpenCTIModel();
const validateMessage = 'This field is required';

export const OpenCTIExport: FC<OpenCTIExportProps> = observer(({
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
      <FormValidationInput
        label="Name"
        name="name"
        className="integration-input"
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
      <FormValidationDropdown
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
          <DropdownMenuList {...props} />
        </SimpleBar>}
      </FormValidationDropdown>
      <FormValidationInput
        className="integration-input"
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
      <FormValidationDropdown
        disabled={form.validating || messageStore.inProgress}
        classNameMenu="indicator-type-list-menu open-cti-menu"
        items={indicatorTypesItems}
        label="Indicator Type"
        name="indicator_types"
        multi
      >
        {(props) => <SimpleBar className="big-list">
          <DropdownMenuList {...props} />
        </SimpleBar>}
      </FormValidationDropdown>
      <FormValidationDropdown
        disabled={form.validating || messageStore.inProgress}
        classNameMenu="labels-list-menu open-cti-menu"
        items={labelsItems}
        label="Labels"
        name="objectLabel"
        multi
      >
        {(props) => <SimpleBar className="big-list">
          <DropdownMenuList {...props} />
        </SimpleBar>}
      </FormValidationDropdown>
      <FormValidationDropdown
        disabled={form.validating || messageStore.inProgress}
        classNameMenu="markers-list-menu open-cti-menu"
        items={allowedMarkersItems}
        label="Markings"
        name="objectMarking"
        multi
      >
        {(props) => <SimpleBar className="big-list">
          <DropdownMenuList {...props} />
        </SimpleBar>}
      </FormValidationDropdown>
      <FormValidationCheckbox
        disabled={form.validating || messageStore.inProgress}
        content="Detection"
        name="x_opencti_detection"
      />
      <FormValidationCheckbox
        disabled={form.validating || messageStore.inProgress}
        content="Create observable from indicator"
        name="createObservables"
      />
      <Spacer height={6} />
    </div>
  );
});
