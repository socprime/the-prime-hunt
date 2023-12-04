import React, { useEffect, useState } from 'react';
import SimpleBar from 'simplebar-react';
import { OpenCTIExport } from '../../OpenCTIExport';
import { FormDropdownProps } from '../../../components/dropdowns/FormDropdown/types';
import { ResourceName } from '../../../resources/resources-types';
import { useAppMessageStore } from '../../../stores';
import { IntegrationWorkPayload } from '../../../../common/types/types-common-payloads';
import { MessageToBackground } from '../../../../background/types/types-background-messages';
import './styles.scss';

export const ExportContentView: React.FC<{
  resourceName: ResourceName;
}> = ({ resourceName }) => {
  const [fieldsData, setFieldsData] = useState<{
    observableTypesItems: FormDropdownProps['items'];
    labelsItems: FormDropdownProps['items'];
    indicatorTypesItems: FormDropdownProps['items'];
    allowedMarkersItems: FormDropdownProps['items'];
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
        type: MessageToBackground.BGIntegrationWork,
        payload: {
          work: 'import-data',
          modelType: 'openCTI',
        } as IntegrationWorkPayload,
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
