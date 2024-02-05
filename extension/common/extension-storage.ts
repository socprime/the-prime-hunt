import { getBrowserContext } from './common-extension-helpers';
import { AsyncResult } from '../../common/types';

export const saveData = async (
  data: Record<string, unknown>,
): Promise<AsyncResult> => {
  const context = getBrowserContext();
  try {
    const result = await new Promise<Record<string, unknown>>((resolve, reject) => {
      context.storage.local.set(JSON.parse(JSON.stringify(data)), () => {
        if (context?.runtime?.lastError) {
          reject(context.runtime.lastError);
        }
        resolve({});
      });
    });
    return { data: result };
  } catch (e) {
    return { error: e };
  }
};

export const getData = async (): Promise<AsyncResult> => {
  const context = getBrowserContext();
  try {
    const result = await new Promise((resolve, reject) => {
      context.storage?.local.get().then((r: Record<string, unknown>) => {
        if (context?.runtime?.lastError) {
          reject(context.runtime.lastError);
        }
        resolve(r);
      });
    });
    return { data: result };
  } catch (e) {
    return { error: e };
  }
};

export const getDataByKey = async (
  key: string,
): Promise<AsyncResult> => {
  const context = getBrowserContext();
  try {
    const result = await new Promise<Record<string, unknown>>((resolve, reject) => {
      context.storage.local.get([key], (r: any) => {
        if (context?.runtime?.lastError) {
          reject(context.runtime.lastError);
        }
        resolve(r);
      });
    });
    return { data: result };
  } catch (e) {
    return { error: e };
  }
};
