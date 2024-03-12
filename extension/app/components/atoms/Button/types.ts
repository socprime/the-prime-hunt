import { ButtonHTMLAttributes, ReactNode } from 'react';

export type ButtonProps = {
  className?: string;
  icon?: ReactNode;
  disabled?: boolean;
  onClick?: ButtonHTMLAttributes<HTMLButtonElement>['onClick'];
};
