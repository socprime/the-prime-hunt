import React, { useCallback } from 'react';
import { StaticButton } from '../../components/buttons/StaticButton/StaticButton';
import { downloadFile } from '../../../common/common-helpers';
import { formatDate } from '../../../../common/helpers';
import { ExportIcon } from '../../components/atoms/icons/ExportIcon/ExportIcon';
import { observer } from 'mobx-react-lite';
import { AppTooltip } from '../../components/tooltips/AppTooltip/AppTooltip';
import { useResourcesSelectionStore } from '../../stores';
import './styles.scss';

export const ExportButton: React.FC = observer(() => {
  const {
    selectedResources,
    selectedResourcesFields,
    countAllSelected,
  } = useResourcesSelectionStore();

  const onExportClick = useCallback(() => {
    if (countAllSelected < 1) {
      return;
    }
    const rows: string[] = [
      'Type,Field,Value',
    ];
    Object.keys(selectedResourcesFields).forEach((typeID) => {
      Array.from(selectedResourcesFields[typeID]).forEach((fieldName) => {
        // TODO array.from is useless
        Array.from(selectedResources[typeID].get(fieldName)!).forEach((value) => {
          rows.push([typeID, fieldName, value].join(','));
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
