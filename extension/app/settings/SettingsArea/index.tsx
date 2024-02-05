import { FC } from 'react';
import { SmallArrowIcon } from '../../components/atoms/icons/SmallArrowIcon/SmallArrowIcon';
import { AppArea } from '../../components/areas/AppArea';
import { SettingsAreaProps } from './types';
import './styles.scss';

export const SettingsArea: FC<SettingsAreaProps> = ({
  id,
  name = '',
  onClick,
}) => {
  return (
    <AppArea
      key={id}
      native={{
        className: 'settings-area',
      }}
    >
      <>
        <span>{name}</span>
        <span
          className="icon-wrapper"
          onClick={onClick}
        >
          <SmallArrowIcon/>
        </span>
      </>
    </AppArea>
  );
};
