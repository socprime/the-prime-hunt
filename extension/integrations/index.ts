import { getOpenCTIModel } from './openCTI/model';

export const getIntegrationModel = (
  type: 'openCTI',
) => {
  if (type === 'openCTI') {
    return getOpenCTIModel();
  }

  return null;
};
