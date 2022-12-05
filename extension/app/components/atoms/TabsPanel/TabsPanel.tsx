import React, { useEffect, useState } from 'react';
import { createClassName } from '../../../../common/common-helpers';
import { usePrevious } from '../../../app-hooks';
import './tabs-panel.scss';

export type TabsPanelProps = {
  tabs: {
    id: string;
    component: React.ReactNode;
    isDisabled?: boolean;
  }[];
  activeTab?: string;
  onActiveTabChanged?: (activeTabID: string) => void;
  className?: string;
};

export const TabsPanel: React.FC<React.PropsWithChildren<TabsPanelProps>> = ({
  activeTab,
  tabs,
  children,
  onActiveTabChanged,
  className = '',
}) => {
  const [currentActiveTab, setCurrentActiveTab] = useState<string>(activeTab || '');
  const previousActiveTab = usePrevious(currentActiveTab);

  useEffect(() => {
    if (typeof onActiveTabChanged === 'function' && previousActiveTab !== currentActiveTab) {
      onActiveTabChanged(currentActiveTab);
    }
  }, [currentActiveTab, onActiveTabChanged, previousActiveTab]);

  useEffect(() => {
    if (activeTab && activeTab !== currentActiveTab) {
      setCurrentActiveTab(activeTab);
    }
  }, [activeTab]);

  return (
    <div
      className={createClassName(['tabs-panel', className])}
    >
      <div className="tabs-wrapper">
        {tabs.map(({ component, id, isDisabled  }) => (
          <div
            className={createClassName([
              'tab',
              currentActiveTab === id ? 'active' : '',
              isDisabled ? 'disabled' : '',
            ])}
            key={id}
            onClick={() => {
              if (!isDisabled) {
                setCurrentActiveTab(id);
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