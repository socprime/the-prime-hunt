import { getData, saveData } from '../../common/extension-storage';
import { AsyncResult, DropdownItem } from '../../../common/types';
import {
  BackgroundJob,
  PostRepositoryData,
  SocPrimeData,
  SocPrimeDataWithSettings,
  SocPrimeTags,
  StorageGroupNames,
} from './types';
import { http } from '../../../common/Http';
import { loggers } from '../../common/loggers';
import { initValues, serializeDataInResult } from '../../../common/helpers';
import { AbstractModel } from '../types';
import { CallBackMessagePayload } from '../../common/types/types-common-payloads';
import { getInitialTagsValues } from './helpers';
import { ExtensionSettings } from '../../common/local-storage/types';

export class SocPrimeModel implements AbstractModel {
  private static getDetail(response: any) {
    const detail = response?.detail;
    if (!detail) {
      return '';
    }
    if (typeof detail === 'string') {
      return detail;
    }
    return JSON.stringify(detail);
  }

  private static apiUrl = 'https://api.tdm.socprime.com';

  private static apiKeyHeaderName: string = 'client_secret_id';

  private static async getData(): Promise<AsyncResult<SocPrimeDataWithSettings>> {
    const result = await getData();
    if (result.error) {
      return result;
    }

    return {
      data: {
        ...((result?.data?.[StorageGroupNames.socprime] || {}) as SocPrimeData),
        apiUrl: (result?.data?.settings as ExtensionSettings)?.[StorageGroupNames.socprime]?.apiUrl || '',
      },
    };
  }

  private async getData(): Promise<AsyncResult<SocPrimeDataWithSettings>> {
    return SocPrimeModel.getData();
  }

  async getRequestStorageData(): Promise<AsyncResult<{
    apiKey: SocPrimeData['apiKey'];
    apiUrl: ExtensionSettings['socprime']['apiUrl'];
  }>> {
    const result = await this.getData();
    if (result.error) {
      return { error: result.error };
    }

    const { apiKey, apiUrl } = result.data! || {};

    return {
      data: {
        apiKey: apiKey || '',
        apiUrl: apiUrl || SocPrimeModel.apiUrl,
      },
    };
  }

  async setExpirationDate(expirationData: SocPrimeData['expirationData']): Promise<AsyncResult> {
    const result = await this.getData();
    if (result.error) {
      return { error: result.error };
    }

    const data = result.data || {};

    return saveData({
      [StorageGroupNames.socprime]: {
        ...data,
        expirationData,
      } as SocPrimeData,
    });
  }

  async setApiKey(key: SocPrimeData['apiKey']): Promise<AsyncResult<void>> {
    const result = await this.getData();
    if (result.error) {
      return { error: result.error };
    }

    const data = result.data || {};

    return saveData({
      [StorageGroupNames.socprime]: {
        ...data,
        apiKey: key,
      } as SocPrimeData,
    });
  }

  async postCustomRepositoryContent(
    repositoryID: string,
    data: PostRepositoryData,
  ): Promise<AsyncResult> {
    const result = await this.getRequestStorageData();

    const { apiUrl, apiKey } = result.data! || {};

    if (!apiKey) {
      return { error: new Error('Wrong API Key') };
    }

    if (!repositoryID?.trim?.()) {
      return { error: new Error('Repository is not set') };
    }

    if (!data.query) {
      return { error: new Error('Query is not set') };
    }

    if (!data.siemType) {
      return { error: new Error('Platform is not set') };
    }

    if (!data.contentName) {
      return { error: new Error('Content name is not set') };
    }

    delete data.tags?.mitigations;

    return new Promise((resolve) => {
      http.post(
        {
          url: `${apiUrl}/v1/custom-content?repo_id=${repositoryID}`,
          body: JSON.stringify({
            rule_name: data.contentName || '',
            description: data.description || '',
            rule_text: data.query || '',
            siem_type: data.siemType,
            tags: Object.keys(data.tags || {})
              .reduce((r, key) => {
                const tags = data.tags as Record<string, string>;
                if (tags[key]?.length > 0) {
                  r[key] = tags[key];
                }
                return r;
              }, {} as Record<string, string>),
          }),
          headers: {
            [SocPrimeModel.apiKeyHeaderName]: apiKey,
            'Content-Type': 'application/json',
          },
        },
        {
          onJSONSuccess(response, status) {
            if (status !== 200) {
              resolve({
                error: new Error(SocPrimeModel.getDetail(response) || JSON.stringify(response)),
              });
            }
            resolve({ data: response });
          },
          onError(error, status) {
            loggers.debug().log('Failed post /custom-content', error, status);

            resolve({ error });
          },
        },
      );
    });
  }

  async checkConnection(): Promise<AsyncResult> {
    const result = await this.getRequestStorageData();

    const { apiUrl, apiKey } = result.data! || {};

    if (!apiKey) {
      return { error: new Error('API Key is not set') };
    }

    return new Promise((resolve) => {
      http.get({
        url: `${apiUrl}/v1/check-connection`,
        headers: {
          [SocPrimeModel.apiKeyHeaderName]: apiKey,
        },
      }, {
        onJSONSuccess(response: CheckConnectionResponse, status) {
          if (status !== 200) {
            resolve({
              error: new Error(SocPrimeModel.getDetail(response) || JSON.stringify(response)),
            });
          }
          resolve({ data: response?.api_key_expiration_date || 'unknown' });
        },
        onError(error, status) {
          loggers.debug().log('Failed get /custom-repositories', error, status);

          resolve({ error });
        },
      });
    });
  }

  async getRepositories(): Promise<AsyncResult<RepositoriesResponse>> {
    const result = await this.getRequestStorageData();

    const { apiUrl, apiKey } = result.data! || {};

    const initialData = [] as RepositoriesResponse;

    if (!apiKey) {
      return { data: initialData };
    }

    return new Promise((resolve) => {
      http.get({
        url: `${apiUrl}/v1/custom-repositories`,
        headers: {
          [SocPrimeModel.apiKeyHeaderName]: apiKey,
        },
      }, {
        onJSONSuccess(response: RepositoriesResponse, status) {
          if (status !== 200) {
            resolve({
              data: initialData,
              error: new Error(SocPrimeModel.getDetail(response) || JSON.stringify(response)),
            });
          }
          resolve({
            data: response || initialData,
          });
        },
        onError(error, status) {
          loggers.debug().log('Failed get /custom-repositories', error, status);

          resolve({ error });
        },
      });
    });
  }

  async getTags(): Promise<AsyncResult<TagsResponse>> {
    const result = await this.getRequestStorageData();

    const initialValues = getInitialTagsValues() as TagsResponse;

    const { apiUrl, apiKey } = result.data! || {};

    if (!apiKey) {
      return { data: initialValues };
    }

    return new Promise((resolve) => {
      http.get({
        url: `${apiUrl}/v1/mitre-attack-tags-values`,
        headers: {
          [SocPrimeModel.apiKeyHeaderName]: apiKey,
        },
      }, {
        onJSONSuccess(response: TagsResponse, status) {
          if (status !== 200) {
            resolve({
              data: initialValues,
              error: new Error((response as any)?.detail || JSON.stringify(response)),
            });
          }
          resolve({
            data: initValues<TagsResponse>(response, initialValues),
          });
        },
        onError(error, status) {
          loggers.debug().log('Failed get /mitre-attack-tags-values', error, status);

          resolve({ error });
        },
      });
    });
  }

  async doBackground({ work, data }: CallBackMessagePayload): Promise<AsyncResult> {
    let result = {} as AsyncResult;

    if (work === BackgroundJob.CheckConnection) {
      result = await this.checkConnection();
    }

    if (work === BackgroundJob.GetFormData) {
      result.batch = await Promise.all([
        this.getTags.bind(this),
        this.getRepositories.bind(this),
      ].map((job) => {
        return job().catch((error: Error) => {
          return { error } as AsyncResult;
        });
      }));
      result.meta = {
        tags: 'batch.0.data',
        repositories: 'batch.1.data',
      };
    }

    if (work === BackgroundJob.PostQuery) {
      const { repositoryID, postRepositoryData } = data as {
        repositoryID: string,
        postRepositoryData: PostRepositoryData,
      };
      result = await this.postCustomRepositoryContent(
        repositoryID,
        postRepositoryData,
      );
    }

    return serializeDataInResult(result).result;
  }
}

export const getSocPrimeModel = () => {
  return new SocPrimeModel();
};

type CheckConnectionResponse = {
  api_key_expiration_date: string;
};

type RepositoriesResponse = DropdownItem[];

type TagsResponse = SocPrimeTags;
