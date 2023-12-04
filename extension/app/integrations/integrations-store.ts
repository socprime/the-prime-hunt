import { getData, saveData } from '../../common/extension-storage';

export type integrationKey = 'openCTI';
export const integrationGroupName = 'integrations';

export const setIntegrationData = async (
  key: integrationKey,
  value: Record<string, unknown>,
) => {
  const result = await getData(integrationGroupName);
  if (result.error) {
    return result;
  }

  const data = result.data as {
    integrations: Record<string, unknown>;
  };

  return saveData({
    ...data,
    [integrationGroupName]: {
      ...(data[integrationGroupName] || {}),
      [key]: value,
    },
  });
};

export const getIntegrationData = async (
  key: integrationKey,
) => {
  const result = await getData(integrationGroupName);
  if (result.error) {
    return result;
  }

  return {
    data: (result?.data?.[integrationGroupName] as any)?.[key] || {},
  };
};
