import { FC, HTMLAttributes, PropsWithChildren } from 'react';
import { createClassName } from '../../../../common/common-helpers';
import './styles.scss';

export type AppHeaderProps = {
  native?: HTMLAttributes<HTMLElement>;
};

export const AppGroupHeader: FC<PropsWithChildren<AppHeaderProps>> = ({
  children,
  native = {},
  ...restProps
}) => {
  return (
    <h3
      {...restProps}
      className={createClassName([
        'app-group-header',
        native.className || '',
      ])}
    >
      {children}
    </h3>
  );
};
