import { getOpenCTIModel } from './openCTI/model';
import { getSocPrimeModel } from './socprime/model';
import { AbstractModel } from './types';

export const getModel = (
  type: 'openCTI' | 'socprime',
): AbstractModel => {
  return {
    openCTI: getOpenCTIModel,
    socprime: getSocPrimeModel,
  }[type]();
};
