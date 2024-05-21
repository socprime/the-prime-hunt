import React, { useCallback } from 'react';
import { StaticButton } from '../../components/buttons/StaticButton/StaticButton';
import { downloadFile } from '../../../common/common-helpers';
import { formatDate } from '../../../../common/helpers';
import { ExportIcon } from '../../components/atoms/icons/ExportIcon/ExportIcon';
import { observer } from 'mobx-react-lite';
import { AppTooltip } from '../../components/tooltips/AppTooltip/AppTooltip';
import { useResourcesSelectionStore, useResourceStore } from '../../stores';
import './styles.scss';

export const ExportButton: React.FC = observer(() => {
  const {
    selectedResources,
    selectedResourcesFields,
    countAllSelected,
  } = useResourcesSelectionStore();

  const resourceStore = useResourceStore();

  const onExportClick = useCallback(() => {
    if (countAllSelected < 1) {
      return;
    }
    const rows: string[] = [
      'Type,Field,Value,First Seen,Last Seen',
    ];
    Object.keys(selectedResourcesFields).forEach((typeID) => {
      Array.from(selectedResourcesFields[typeID]).forEach((fieldName) => {
        selectedResources[typeID].get(fieldName)!.forEach((value) => {
          const {
            lastSeen = '',
            firstSeen = '',
          } = resourceStore.getMappedData(typeID, fieldName, value);
          rows.push([
            typeID,
            fieldName,
            value,
            ...(firstSeen ? [formatDate('%d %fM %Y %h:%m:%s', new Date(firstSeen))] : []),
            ...(lastSeen ? [formatDate('%d %fM %Y %h:%m:%s', new Date(lastSeen))] : []),
          ].join(','));
        });
      });
    });
    downloadFile(
      'csv',
      rows.join('\n'),
      `the-prime-hunt-results_${formatDate(
        '%Y-%M-%d_%h-%m',
        new Date(),
      )}`,
    );
  }, [countAllSelected, selectedResources, selectedResourcesFields]);

  return (
    <StaticButton
      className="export-button"
      onClick={onExportClick}
    >
      <AppTooltip
        className="small"
        content={<>
          Export selected to CSV <span className="strong">{countAllSelected}</span>
        </>}
      >
        <ExportIcon />
      </AppTooltip>
    </StaticButton>
  );
});
