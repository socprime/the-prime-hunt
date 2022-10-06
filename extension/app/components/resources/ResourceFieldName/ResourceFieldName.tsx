import React from 'react';
import './styles.scss';

type ResourceFieldNameProps = {
  icon: React.ReactNode;
  fieldName: string;
  count: number;
};

export const ResourceFieldName: React.FC<ResourceFieldNameProps> = ({ icon, fieldName, count }) => {
  return (
    <div
      className="resource-field-name"
    >
      {icon}
      <span className="field-name strong">{fieldName}</span>
      ({count})
    </div>
  );
};