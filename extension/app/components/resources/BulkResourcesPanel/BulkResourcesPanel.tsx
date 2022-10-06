import React, { useCallback, useMemo } from 'react';
import { StaticButton } from '../../buttons/StaticButton/StaticButton';
import { PlusIcon } from '../../atoms/icons/PlusIcon/PlusIcon';
import { MinusIcon } from '../../atoms/icons/MinusIcon/MinusIcon';
import { SeeDocumentIcon } from '../../atoms/icons/SeeDocumentIcon/SeeDocumentIcon';
import { MagnifyingIcon } from '../../atoms/icons/MagnifyingIcon/MagnifyingIcon';
import { List, ListProps } from '../../atoms/List/List';
import { AppDropdown } from '../../dropdowns/AppDropdown/AppDropdown';
import { Spacer } from '../../atoms/Spacer/Spacer';
import { IResourceSelectionStore } from '../resources-types';
import { AnimatedCopyIcon } from '../../icons/AnimatedCopyIcon/AnimatedCopyIcon';
import { useAppStore, useIntegrationsStore, usePlatformStore } from '../../../stores';
import { observer } from 'mobx-react-lite';
import { ModifyQueryPayload } from '../../../../common/types/types-common-payloads';
import { copyToClipboard } from '../../../../common/common-helpers';
import { GearIcon } from '../../atoms/icons/GearIcon/GearIcon';
import './styles.scss';

type BulkResourcesPanelProps = {
  selectionStore: IResourceSelectionStore;
};

export const BulkResourcesPanel: React.FC<BulkResourcesPanelProps> = observer(({
  selectionStore,
}) => {

  const platformStore = usePlatformStore();
  const appStore = useAppStore();
  const integrationsStore = useIntegrationsStore();

  const { normalisedSelected, countSelected, uniqueSelected } = selectionStore;

  const items = useMemo(() => {
    const result: ListProps['items'] = [];
    integrationsStore.integrations.forEach(({ name, id, url }) => {
      result.push({
        id,
        content: name,
        onClick: () => {
          integrationsStore.getReadyUrls(uniqueSelected, url).forEach(u => {
            window.open(u, '_blank');
          });
        },
      });
    });
    result.push({
      id: 'search-settings',
      content: [
        <GearIcon key={1} />,
        'Search Settings',
      ],
      onClick: () => {
        appStore.view = 'integrations';
      },
    });
    return result;
  }, [appStore, integrationsStore, uniqueSelected]);

  const onCopyIconClick = useCallback(() => {
    setTimeout(() => {
      copyToClipboard(`where ${platformStore.buildQueryParts('include', normalisedSelected)}`);
    }, 300);
  }, [platformStore, normalisedSelected]);

  const onActionsClick = useCallback((type: ModifyQueryPayload['modifyType']) => {
    platformStore.modifyQuery(type, normalisedSelected);
  }, [normalisedSelected, platformStore]);

  return (
    <div className="bulk-resources-panel">
      <Spacer height={12} />
      <div className="count-selected">
        <span className="strong">— {countSelected} item(s)</span>selected
      </div>
      <div className="buttons-area">
        <StaticButton animatedIcon onClick={onCopyIconClick} icon={<AnimatedCopyIcon />}>
          Copy
        </StaticButton>
        <StaticButton onClick={() => onActionsClick('include')} icon={<PlusIcon />}>
          Include
        </StaticButton>
        <StaticButton onClick={() => onActionsClick('exclude')} icon={<MinusIcon />}>
          Exclude
        </StaticButton>
        <StaticButton onClick={() => onActionsClick('show all')} icon={<SeeDocumentIcon />}>
          Show All Events
        </StaticButton>
        <AppDropdown
          opener={
            <StaticButton icon={<MagnifyingIcon />}>Search at</StaticButton>
          }
          classNameMenu="dropdown-search-sites-menu"
          getMenuStyles={() => ({
            width: 150,
          })}
        >
          <List className="search-sites-list" items={items} />
        </AppDropdown>
      </div>
    </div>
  );
});
