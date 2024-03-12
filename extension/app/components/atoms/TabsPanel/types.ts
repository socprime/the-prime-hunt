import { ReactNode } from 'react';

export type TabsPanelProps = {
  tabs: {
    id: string;
    component: ReactNode;
    isDisabled?: boolean;
  }[];
  activeTab?: string;
  onActiveTabChanged?: (activeTabID: string) => void;
  className?: string;
};
