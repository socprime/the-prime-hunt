import { HTMLAttributes } from 'react';

export type SettingsAreaProps = {
  id: string;
  name: string;
  onClick: HTMLAttributes<HTMLSpanElement>['onClick'];
};
