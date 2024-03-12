import { ButtonProps } from '../../atoms/Button/types';
import { WithHotKeysProps } from '../../extends/WithHotKeys/types';

export type AppButtonProps = ButtonProps & WithHotKeysProps & {
  animatedIcon?: boolean;
};
