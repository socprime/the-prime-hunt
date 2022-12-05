import React from 'react';
import { Collapsible, CollapsibleProps } from '../../atoms/Collapsible/Collapsible';
import { SmallArrowIcon } from '../../atoms/icons/SmallArrowIcon/SmallArrowIcon';
import { createClassName } from '../../../../common/common-helpers';
import './styles.scss';

export type AppCollapsibleProps = CollapsibleProps & {
  group?: React.ReactNode;
};

export const AppCollapsible: React.FC<React.PropsWithChildren<AppCollapsibleProps>> = ({
  className = '',
  header,
  children,
  group,
  ...restProps
}) => {
  return (
    <Collapsible
      className={createClassName([
        'app-collapsible',
        className,
      ])}
      header={
        <>
          {header}
          <div className="app-collapsible-header-group">
            {group}
            <span className="icon-wrapper">
              <SmallArrowIcon/>
            </span>
          </div>
        </>
      }
      {...restProps}
    >
      {children}
    </Collapsible>
  );
};
