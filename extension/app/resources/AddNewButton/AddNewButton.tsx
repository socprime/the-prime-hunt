import React from 'react';
import { StaticButton, StaticButtonProps } from '../../components/buttons/StaticButton/StaticButton';
import { createClassName } from '../../../common/common-helpers';
import { PlusIcon } from '../../components/atoms/icons/PlusIcon/PlusIcon';
import './styles.scss';

export type AddNewButtonProps = StaticButtonProps;

export const AddNewButton: React.FC<AddNewButtonProps> = ({
  className = '',
  ...restProps
}) => {
  return (
    <StaticButton
      className={createClassName([
        'add-new-button',
        className,
      ])}
      {...restProps}
    >
      <PlusIcon />
    </StaticButton>
  );
};
