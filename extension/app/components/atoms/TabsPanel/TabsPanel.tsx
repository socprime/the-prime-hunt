import React, { useEffect, useState } from 'react';
import { createClassName } from '../../../../common/common-helpers';
import './tabs-panel.scss';

export type TabsPanelProps = {
  tabs: {
    id: string;
    component: React.ReactNode;
    isDisabled?: boolean;
  }[];
  defaultActiveTab?: string;
  onActiveTabChanged?: (activeTabID: string) => void;
  className?: string;
};

export const TabsPanel: React.FC<React.PropsWithChildren<TabsPanelProps>> = ({
  defaultActiveTab,
  tabs,
  children,
  onActiveTabChanged,
  className = '',
}) => {
  const [activeTab, setActiveTab] = useState<string>(defaultActiveTab || '');

  useEffect(() => {
    onActiveTabChanged?.(activeTab);
  }, [activeTab, onActiveTabChanged]);

  return (
    <div
      className={createClassName(['tabs-panel', className])}
    >
      <div className="tabs-wrapper">
        {tabs.map(({ component, id, isDisabled  }) => (
          <div
            className={createClassName([
              'tab',
              activeTab === id ? 'active' : '',
              isDisabled ? 'disabled' : '',
            ])}
            key={id}
            onClick={() => {
              if (!isDisabled) {
                setActiveTab(id);
              }
            }}
          >
            {component}
          </div>
        ))}
      </div>
      {children}
    </div>
  );
};