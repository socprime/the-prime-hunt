import React from 'react';
import SimpleBar from 'simplebar-react';
import { Integration } from '../../Integration/Integration';
import { Spacer } from '../../../components/atoms/Spacer/Spacer';
import './styles.scss';

export const IntegrationContentView: React.FC = () => {
  return (
    <SimpleBar className="integration-content-view">
      <Spacer height={24} />
      <Integration />
    </SimpleBar>
  );
};
