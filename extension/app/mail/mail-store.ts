import { getDataByKey, saveData } from '../../common/extension-storage';
import { Mail } from './mail-types';

export const mailGroupName = 'mails';

// TODO move to model
export const setMailsData = async (
  data: {
    [mailID: string]: Mail,
  },
) => {
  const result = await getDataByKey(mailGroupName);
  if (result.error) {
    return result;
  }

  return saveData({
    ...result.data,
    [mailGroupName]: data,
  });
};

export const setMailData = async (
  key: string,
  value: Record<string, unknown>,
) => {
  const result = await getDataByKey(mailGroupName);
  if (result.error) {
    return result;
  }

  const data = result.data as {
    [mailGroupName]: Record<string, unknown>;
  };

  return saveData({
    ...data,
    [mailGroupName]: {
      ...(data[mailGroupName] || {}),
      [key]: value,
    },
  });
};

export const getMailData = async (
  key: string,
) => {
  const result = await getDataByKey(mailGroupName);
  if (result.error) {
    return result;
  }

  return {
    data: (result?.data?.[mailGroupName] as any)?.[key] || {},
  };
};
