import React from 'react';
import { PlatformName } from '../../../../common/types/types-common';
import './styles.scss';

export const NotFoundContentView: React.FC = () => {
  return (
    <div className="not-found-content-view">
      <div>
        No supported platform detected.<br/>
        You can use this extension with<br/>
        {Object.values(PlatformName).join(', ')}
      </div>
    </div>
  );
};
