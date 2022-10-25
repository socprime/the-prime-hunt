import { FieldName } from '../../../../common/types';

export type SplunkJobID = string;

export type SummaryFields = {
  [fieldName: string]: {
    modes: {
      value: string;
    }[];
  };
};

export type StatisticFields = {
  name: FieldName;
}[];

export type StatisticRows = (string | string[])[][];

export type SummaryResponse = {
  fields: SummaryFields;
};

export type StatisticResponse = {
  fields: StatisticFields;
  rows: StatisticRows;
};