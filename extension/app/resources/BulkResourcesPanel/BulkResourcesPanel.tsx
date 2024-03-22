import React, { useCallback, useMemo, useRef } from 'react';
import { StaticButton } from '../../components/buttons/StaticButton/StaticButton';
import { PlusIcon } from '../../components/atoms/icons/PlusIcon/PlusIcon';
import { MinusIcon } from '../../components/atoms/icons/MinusIcon/MinusIcon';
import { SeeDocumentIcon } from '../../components/atoms/icons/SeeDocumentIcon/SeeDocumentIcon';
import { MagnifyingIcon } from '../../components/atoms/icons/MagnifyingIcon/MagnifyingIcon';
import { AppDropdown, AppDropdownRefs } from '../../components/dropdowns/AppDropdown/AppDropdown';
import { Spacer } from '../../components/atoms/Spacer/Spacer';
import { AnimatedCopyIcon } from '../../components/icons/AnimatedCopyIcon/AnimatedCopyIcon';
import {
  useIntegrationsStore, useMail, usePlatformStore, useResourcesSelectionStore,
} from '../../stores';
import { observer } from 'mobx-react-lite';
import { ModifyQueryPayload } from '../../../common/types/types-common-payloads';
import { createClassName, openMailTo } from '../../../common/common-helpers';
import { AppTooltip } from '../../components/tooltips/AppTooltip/AppTooltip';
import { NormalizedParsedResources } from '../resources-types';
import { GoOutsideIcon } from '../../components/atoms/icons/GoOutsideIcon/GoOutsideIcon';
import { sortStrings } from '../../../../common/helpers';
import { ListProps } from '../../components/atoms/List/types';
import { DropdownMenuList } from '../../components/dropdowns-menus/DropdownMenuList';
import { IconMail } from '../../components/atoms/icons/MailIcon';
import { ListItemContentWithIcons } from '../../components/lists-items/ListItemContentWithIcons';
import { SendToIcon } from '../../components/atoms/icons/SendToIcon';
import './styles.scss';

const MAX_COUNT_SELECTED = 30;

export const BulkResourcesPanel: React.FC = observer(() => {
  const selectionStore = useResourcesSelectionStore();
  const platformStore = usePlatformStore();
  const integrationsStore = useIntegrationsStore();
  const mail = useMail();

  const { normalisedSelected, countSelected, uniqueSelected } = selectionStore;

  const items = useMemo(() => {
    const result: ListProps['items'] = [];
    integrationsStore.integrations
      .slice()
      .sort((a, b) => sortStrings(b.name, a.name, 'descending'))
      .forEach(({ name, id, url }) => {
        result.push({
          id,
          content: <span><GoOutsideIcon />{name}</span>,
          onClick: () => {
            integrationsStore
              .getReadyUrls(uniqueSelected.slice(0, MAX_COUNT_SELECTED), url)
              .forEach((u) => {
                window.open(u, '_blank');
              });
          },
        });
      });
    return result;
  }, [integrationsStore, uniqueSelected]);

  const onCopyIconClick = useCallback(() => {
    platformStore.copyToClipboard(normalisedSelected);
  }, [platformStore, normalisedSelected]);

  const onActionsClick = useCallback((type: ModifyQueryPayload['modifyType']) => {
    platformStore.modifyQuery(
      type,
      Object.keys(normalisedSelected).reduce((normalizedParsedResources, fieldName) => {
        normalizedParsedResources[fieldName] = normalisedSelected[fieldName]
          .slice(0, MAX_COUNT_SELECTED);
        return normalizedParsedResources;
      }, {} as NormalizedParsedResources),
    );
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

  const dropdownSendToRef = useRef({} as AppDropdownRefs);

  const itemsSendTo: ListProps['items'] = useMemo(() => {
    return (Object.keys(mail.patterns)?.map((id) => {
      const pattern = mail.patterns[id];
      return {
        id: pattern.id,
        content: <ListItemContentWithIcons
          content={pattern.name}
          iconsLeft={[<IconMail />]}
        />,
        onClick: () => {
          const url = mail.buildMailToWithMarkers(pattern, {
            iocs: uniqueSelected,
          });
          openMailTo(url);
          dropdownSendToRef.current.setIsOpen(false);
        },
        name: pattern.name,
      };
    }) || []);
  }, [mail, mail.patterns, uniqueSelected, uniqueSelected.length]);

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
        <StaticButton
          disabled={disabled}
          animatedIcon
          onClick={onCopyIconClick}
        >
          <AnimatedCopyIcon disabled={disabled} />
        </StaticButton>
        <StaticButton
          disabled={disabled}
          onClick={() => onActionsClick('include')}
        >
          <PlusIcon />
        </StaticButton>
        <StaticButton
          disabled={disabled}
          onClick={() => onActionsClick('exclude')}
        >
          <MinusIcon />
        </StaticButton>
        <StaticButton disabled={disabled} onClick={() => onActionsClick('show all')} icon={<SeeDocumentIcon />}>
          Show All Events
        </StaticButton>
        {itemsSendTo.length > 0 && (<AppDropdown
          ref={dropdownSendToRef}
          disabled={disabled}
          opener={
            <StaticButton disabled={disabled} icon={<SendToIcon />}>Send to</StaticButton>
          }
        >
          <DropdownMenuList items={itemsSendTo} />
        </AppDropdown>)}
        <AppDropdown
          disabled={disabled}
          classNameMenu="search-at-dropdown-menu"
          opener={
            <StaticButton disabled={disabled} icon={<MagnifyingIcon />}>Search at</StaticButton>
          }
        >
          <DropdownMenuList className="search-sites-list" items={items} />
        </AppDropdown>
      </div>
    </div>
  );
});
