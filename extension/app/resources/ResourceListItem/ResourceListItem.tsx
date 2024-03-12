import { observer } from 'mobx-react-lite';
import {
  ReactNode, useCallback, useMemo, useRef, useState,
  FC, PropsWithChildren,
} from 'react';
import { PlusIcon } from '../../components/atoms/icons/PlusIcon/PlusIcon';
import { MinusIcon } from '../../components/atoms/icons/MinusIcon/MinusIcon';
import { SeeDocumentIcon } from '../../components/atoms/icons/SeeDocumentIcon/SeeDocumentIcon';
import { ModifyQueryPayload } from '../../../common/types/types-common-payloads';
import { useRouter, usePlatformStore, useMail } from '../../stores';
import { SendToIcon } from '../../components/atoms/icons/SendToIcon';
import { NoOpenCTIProfileMessage } from '../messages/NoOpenCTIProfileMessage';
import { AnimatedCopyIcon } from '../../components/icons/AnimatedCopyIcon/AnimatedCopyIcon';
import { AppDropdown, AppDropdownRefs } from '../../components/dropdowns/AppDropdown/AppDropdown';
import { DropdownMenuList } from '../../components/dropdowns-menus/DropdownMenuList';
import { ListProps } from '../../components/atoms/List/types';
import { GoOutsideIcon } from '../../components/atoms/icons/GoOutsideIcon/GoOutsideIcon';
import { IconMail } from '../../components/atoms/icons/MailIcon';
import { ListItemContentWithIcons } from '../../components/lists-items/ListItemContentWithIcons';
import { openMailTo } from '../../../common/common-helpers';
import './styles.scss';
import { getOpenCTIModel } from '../../../models/openCTI/model';

type ResourceListItemProps = {
  resourceName: string;
  fieldName: string;
};

const openCTIModel = getOpenCTIModel();

export const ResourceListItem: FC<PropsWithChildren<ResourceListItemProps>> = observer(({
  children,
  fieldName,
  resourceName,
}) => {
  const [isActionMenu, setIsActionMenu] = useState(false);
  const platformStore = usePlatformStore();
  const router = useRouter();
  const mail = useMail();

  const onActionClick = useCallback(async (actionType: 'copy' | ModifyQueryPayload['modifyType']) => {
    if (actionType === 'copy') {
      platformStore.copyToClipboard({ [fieldName]: [resourceName] });
      return;
    }
    platformStore.modifyQuery(actionType, { [fieldName]: [resourceName] });
  }, [platformStore, fieldName, resourceName]);

  const dropdownSendToRef = useRef({} as AppDropdownRefs);

  const itemsSendTo: (Pick<ListProps['items'][0], 'onClick'> & {
    name: string;
    icon: ReactNode,
  })[] = useMemo(() => {
    return [
      {
        name: 'Send to OpenCTI',
        icon: <GoOutsideIcon />,
        onClick: () => {
          openCTIModel
            ?.getStorage()
            .then(({ data }) => {
              const { isActive, isValid } = data || {};
              if (!isActive || !isValid) {
                platformStore.setMessage(NoOpenCTIProfileMessage);
                return;
              }
              router.goToExportPage(resourceName);
              dropdownSendToRef.current.setIsOpen(false);
            });
        },
      },
      ...(Object.keys(mail.patterns)?.map((id) => {
        const pattern = mail.patterns[id];
        return {
          icon: <IconMail />,
          onClick: () => {
            const url = mail.buildMailToWithMarkers(pattern, {
              iocs: [resourceName],
            });
            openMailTo(url);
            dropdownSendToRef.current.setIsOpen(false);
          },
          name: pattern.name,
        };
      }) || []),
    ];
  }, [mail, mail.patterns, platformStore, resourceName, router]);

  return (
    <div
      className="resource-list-item"
      onMouseEnter={() => {
        setIsActionMenu(true);
      }}
      onMouseLeave={() => {
        setIsActionMenu(false);
      }}
    >
      <div className="resource-list-item-wrapper">
        {children}
        {isActionMenu && (
          <div className="action-menu">
            <AnimatedCopyIcon onClick={() => onActionClick('copy')} />
            <PlusIcon onClick={() => onActionClick('include')} />
            <MinusIcon onClick={() => onActionClick('exclude')} />
            <SeeDocumentIcon onClick={() => onActionClick('show all')} />
            {itemsSendTo.length && (<AppDropdown
              ref={dropdownSendToRef}
              opener={<SendToIcon />}
              classNameMenu="dropdown-send-to"
            >
              <DropdownMenuList items={itemsSendTo.map(({ icon, name, onClick }, index) => {
                return {
                  onClick,
                  content: <ListItemContentWithIcons
                    iconsLeft={[icon]}
                    content={name}
                  />,
                  id: `${index}-${name.toLowerCase().replace(/ +/g, ' ').replace(/ +/g, '-')}`,
                };
              })} />
            </AppDropdown>)}
          </div>
        )}
      </div>
    </div>
  );
});
