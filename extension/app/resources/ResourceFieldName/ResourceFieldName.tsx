import React from 'react';
import { createClassName } from '../../../common/common-helpers';
import { AppTooltip } from '../../components/tooltips/AppTooltip/AppTooltip';
import './styles.scss';

type ResourceFieldNameProps = {
  icon: React.ReactNode;
  fieldName: string;
  count: number;
  disabled?: boolean;
};

export const ResourceFieldName: React.FC<ResourceFieldNameProps> = ({
  disabled, icon, fieldName, count,
}) => {
  return (
    <div
      className={createClassName([
        'resource-field-name',
        disabled ? 'disabled' : '',
      ])}
    >
      {icon}
      <span className="field-name strong">{fieldName}</span>&nbsp;
      {count > 100 ? (
        <AppTooltip
          className="error resource-count-values-tooltip"
          content={
            <>
              Maximum<span className="strong"> 100 </span>values will be displayed to avoid overloading your browser
            </>
          }
        >
          {count}
        </AppTooltip>
      ) : (
        <>
          {count}
        </>
      )}
    </div>
  );
};
