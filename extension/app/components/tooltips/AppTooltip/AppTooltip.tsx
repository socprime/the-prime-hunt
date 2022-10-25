import React  from 'react';
import { Tooltip, TooltipProps } from '../../atoms/Tooltip/Tooltip';
import { createClassName } from '../../../../common/common-helpers';
import { useAppStore } from '../../../stores';
import './styles.scss';

export type AppTooltipProps = TooltipProps;

export const AppTooltip: React.FC<React.PropsWithChildren<AppTooltipProps>> = ({
  className = '',
  children,
  ...restProps
}) => {
  const appStore = useAppStore();

  return (
    <Tooltip
      className={createClassName([
        'app-tooltip',
        className,
      ])}
      delayShowMs={600}
      mountElem={appStore.rootElement}
      {...restProps}
    >
      {children}
    </Tooltip>
  );
};
