import React from 'react';
import { RootStore } from '../stores/RootStore';
import { RootStoreContext } from '../stores';
import { App } from './App/App';

type RootAppProps = {
  rootStore: RootStore;
};

export const RootApp: React.FC<RootAppProps> = ({ rootStore }) => {
  return (
    <RootStoreContext.Provider value={rootStore}>
      <App />
    </RootStoreContext.Provider>
  );
};
