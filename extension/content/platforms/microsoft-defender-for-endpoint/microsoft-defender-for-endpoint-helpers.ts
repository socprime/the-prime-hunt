import { ModifyQueryType, NormalizedParsedResources } from '../../../common/types/types-common';
import { buildQueryParts } from '../../../common/common-helpers';
import { isNumberInString } from '../../../../common/checkers';

export const normalizedValue = (value: string | number) => {
  const nValue = isNumberInString(value)
    ? parseFloat(value as string)
    : value;
  return typeof nValue === 'number'
    ? nValue
    : `\"${nValue.replace(/\\/g, '\\\\')}\"`;
};

export const buildMicrosoftDefenderForEndpointQueryParts = (
  type: ModifyQueryType,
  resources: NormalizedParsedResources,
) => {
  return buildQueryParts(
    resources,
    type === 'exclude' ? '!=' : '==',
    type === 'exclude' ? ' and ' : ' or ',
    {
      leftOperand: (v) => v,
      rightOperand: (v) => normalizedValue(v),
    },
  );
};
