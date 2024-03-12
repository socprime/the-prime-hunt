import React, { useEffect, useState } from 'react';
import SimpleBar from 'simplebar-react';
import { OpenCTIExport } from '../../OpenCTIExport';
import { FormValidationDropdownProps } from '../../../components/dropdowns/FormValidationDropdown/types';
import { ResourceName } from '../../../resources/resources-types';
import { useAppMessageStore } from '../../../stores';
import './styles.scss';

export const ExportContentView: React.FC<{
  resourceName: ResourceName;
}> = ({ resourceName }) => {
  const [fieldsData, setFieldsData] = useState<{
    observableTypesItems: FormValidationDropdownProps['items'];
    labelsItems: FormValidationDropdownProps['items'];
    indicatorTypesItems: FormValidationDropdownProps['items'];
    allowedMarkersItems: FormValidationDropdownProps['items'];
  }>({
    observableTypesItems: [],
    labelsItems: [],
    indicatorTypesItems: [],
    allowedMarkersItems: [],
  });

  const messageStorage = useAppMessageStore();

  useEffect(() => {
    messageStorage
      .sendMessageWithCallback({
        work: 'import-data',
        model: 'openCTI',
      })
      .then((result) => {
        setFieldsData({
          observableTypesItems: result?.data?.observableTypesItems || [],
          labelsItems: result?.data?.labelsItems || [],
          indicatorTypesItems: result?.data?.vocabulariesItems || [],
          allowedMarkersItems: result?.data?.allowedMarkersItems || [],
        });
      });
  }, [messageStorage]);

  return (
    <SimpleBar
      className="export-content-view"
    >
      <OpenCTIExport
        indicatorTypesItems={fieldsData.indicatorTypesItems}
        allowedMarkersItems={fieldsData.allowedMarkersItems}
        observableTypesItems={fieldsData.observableTypesItems}
        labelsItems={fieldsData.labelsItems}
        resourceName={resourceName}
      />
    </SimpleBar>
  );
};
