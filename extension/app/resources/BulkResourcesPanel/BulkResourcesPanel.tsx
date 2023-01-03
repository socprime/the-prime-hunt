import React, { useCallback, useMemo } from 'react';
import { StaticButton } from '../../components/buttons/StaticButton/StaticButton';
import { PlusIcon } from '../../components/atoms/icons/PlusIcon/PlusIcon';
import { MinusIcon } from '../../components/atoms/icons/MinusIcon/MinusIcon';
import { SeeDocumentIcon } from '../../components/atoms/icons/SeeDocumentIcon/SeeDocumentIcon';
import { MagnifyingIcon } from '../../components/atoms/icons/MagnifyingIcon/MagnifyingIcon';
import { List, ListProps } from '../../components/atoms/List/List';
import { AppDropdown } from '../../components/dropdowns/AppDropdown/AppDropdown';
import { Spacer } from '../../components/atoms/Spacer/Spacer';
import { AnimatedCopyIcon } from '../../components/icons/AnimatedCopyIcon/AnimatedCopyIcon';
import { useIntegrationsStore, usePlatformStore, useResourcesSelectionStore } from '../../stores';
import { observer } from 'mobx-react-lite';
import { ModifyQueryPayload } from '../../../common/types/types-common-payloads';
import { copyToClipboard, createClassName } from '../../../common/common-helpers';
import { AppTooltip } from '../../components/tooltips/AppTooltip/AppTooltip';
import { NormalizedParsedResources } from '../resources-types';
import './styles.scss';

const MAX_COUNT_SELECTED = 30;

export const BulkResourcesPanel: React.FC = observer(() => {

  const selectionStore = useResourcesSelectionStore();
  const platformStore = usePlatformStore();
  const integrationsStore = useIntegrationsStore();

  const { normalisedSelected, countSelected, uniqueSelected } = selectionStore;

  const items = useMemo(() => {
    const result: ListProps['items'] = [];
    integrationsStore.integrations.forEach(({ name, id, url }) => {
      result.push({
        id,
        content: name,
        onClick: () => {
          integrationsStore.getReadyUrls(uniqueSelected.slice(0, MAX_COUNT_SELECTED), url).forEach(u => {
            window.open(u, '_blank');
          });
        },
      });
    });
    return result;
  }, [integrationsStore, uniqueSelected]);

  const onCopyIconClick = useCallback(() => {
    setTimeout(() => {
      copyToClipboard(platformStore.buildQueryParts('include', normalisedSelected, true));
    }, 300);
  }, [platformStore, normalisedSelected]);

  const onActionsClick = useCallback((type: ModifyQueryPayload['modifyType']) => {
    platformStore.modifyQuery(type, Object.keys(normalisedSelected).reduce((normalizedParsedResources, fieldName) => {
      normalizedParsedResources[fieldName] = normalisedSelected[fieldName].slice(0, MAX_COUNT_SELECTED);
      return normalizedParsedResources;
    }, {} as NormalizedParsedResources));
  }, [normalisedSelected, platformStore]);

  const disabled = countSelected < 1;

  const getCountSelected = useCallback((count: number) => {
    if (count <= MAX_COUNT_SELECTED) {
      return count;
    }
    return (
      <AppTooltip
        className="error max-selected-tooltip"
        content={
          <>
            The total number of selected items can’t be more than
            <span className="strong"> {MAX_COUNT_SELECTED} </span>
            to avoid overloading your browser
          </>
        }
      >
        {count}
      </AppTooltip>
    );
  }, []);

  return (
    <div className={createClassName([
      'bulk-resources-panel',
      disabled ? 'empty' : '',
    ])}>
      <Spacer height={12} />
      <div className="count-selected">
        <span className="strong">— {getCountSelected(countSelected)} item(s)</span>selected
      </div>
      <div className="buttons-area">
        <StaticButton disabled={disabled} animatedIcon onClick={onCopyIconClick} icon={<AnimatedCopyIcon disabled={disabled} />}>
          Copy
        </StaticButton>
        <StaticButton disabled={disabled} onClick={() => onActionsClick('include')} icon={<PlusIcon />}>
          Include
        </StaticButton>
        <StaticButton disabled={disabled} onClick={() => onActionsClick('exclude')} icon={<MinusIcon />}>
          Exclude
        </StaticButton>
        <StaticButton disabled={disabled} onClick={() => onActionsClick('show all')} icon={<SeeDocumentIcon />}>
          Show All Events
        </StaticButton>
        <AppDropdown
          disabled={disabled}
          opener={
            <StaticButton disabled={disabled} icon={<MagnifyingIcon />}>Search at</StaticButton>
          }
          classNameMenu="dropdown-search-sites-menu"
        >
          <List className="search-sites-list" items={items} />
        </AppDropdown>
      </div>
    </div>
  );
});
