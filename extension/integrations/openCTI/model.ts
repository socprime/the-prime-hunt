import { http } from '../../../common/Http';
import { AsyncResult } from '../../../common/types';
import { getIntegrationData, setIntegrationData } from '../../app/integrations/integrations-store';
import { OpenCTIIntegrationData } from './types';
import { ResourceName, ResourceType } from '../../app/resources/resources-types';

export class OpenCTIModel {
  private async request(
    query: string,
    input: Record<string, unknown> = {},
  ): Promise<AsyncResult> {
    const { data: storageData } = await this.getStorage();

    if (!storageData?.key || !storageData?.server) {
      return Promise.resolve({
        error: new Error('api key or server url are not set'),
      });
    }
    const serverUrl = storageData!.server;
    const apiKey = storageData!.key;

    return new Promise<AsyncResult>((resolve) => {
      http.post({
        url: serverUrl,
        body: JSON.stringify({ query, variables: { input } }),
        headers: {
          Authorization: `Bearer ${apiKey}`,
          'Content-Type': 'application/json',
        },
      }, {
        onJSONSuccess: (response) => {
          if (response.errors || response.error) {
            const messages = (response.errors || [response.error]);
            const message = messages?.[0]?.data?.reason
              || messages?.[0]?.message
              || 'Something went wrong';

            resolve({
              error: new Error(message),
            });
          }
          resolve({ data: response?.data });
        },
        onError: (e) => {
          resolve({ error: e });
        },
      });
    });
  }

  getTypeById(id: string): ResourceType {
    const normalizedID = id?.trim?.().toLowerCase?.();
    if (normalizedID === 'email-addr') {
      return 'email';
    }
    if (normalizedID === 'md5' as ResourceType) {
      return 'md5';
    }
    if (normalizedID === 'sha1' as ResourceType) {
      return 'sha1';
    }
    if (normalizedID === 'sha256' as ResourceType) {
      return 'sha256';
    }
    if (normalizedID === 'sha512' as ResourceType) {
      return 'sha512';
    }
    if (normalizedID === 'ipv4-addr') {
      return 'ipv4';
    }
    if (normalizedID === 'ipv6-addr') {
      return 'ipv6';
    }
    if (normalizedID === 'mac-addr') {
      return 'mac-address';
    }
    if (normalizedID === 'url') {
      return 'url';
    }
    if (normalizedID === 'domain-name') {
      return 'domain-name';
    }
    return 'unknown';
  }

  getPattern(
    name: ResourceName,
    type: ResourceType,
  ) {
    if (type === 'email') {
      return `[email-addr:value = '${name}']`;
    }

    if (type === 'md5') {
      return `[file:hashes.MD5 = '${name}']`;
    }

    if (type === 'sha1') {
      return `[file:hashes.'SHA-1' = '${name}']`;
    }

    if (type === 'sha256') {
      return `[file:hashes.'SHA-256' = '${name}']`;
    }

    if (type === 'sha512') {
      return `[file:hashes.'SHA-512' = '${name}']`;
    }

    if (type === 'url') {
      return `[url:value = '${name}']`;
    }

    if (type === 'ipv4') {
      return `[ipv4-addr:value = '${name}']`;
    }

    if (type === 'ipv6') {
      return `[ipv6-addr:value = '${name}']`;
    }

    if (type === 'mac-address') {
      return `[mac-addr:value = '${name}']`;
    }

    if (type === 'domain-name') {
      return `[domain-name:value = '${name}']`;
    }

    return name;
  }

  async checkConnection(): Promise<AsyncResult> {
    const response = await this.request('{me{api_token}}');
    if (typeof response.error !== 'undefined') {
      return response;
    }
    const { data } = await this.getStorage();
    if (
      response?.data?.me?.api_token !== data?.key
    ) {
      return Promise.resolve({ error: new Error('Wrong API Key') });
    }
    return response;
  }

  async exportData(data: Record<string, any>): Promise<AsyncResult> {
    if (
      !data.name
      || !data.pattern
    ) {
      return Promise.resolve({
        error: new Error('Mandatory fields are empty'),
      });
    }

    let type = ((data?.x_opencti_main_observable_type || [])
      ?.map((type: any) => {
        return type?.id || undefined;
      }).filter(Boolean) || [])?.[0];

    if (
      type === 'md5' as ResourceType
      || type === 'sha1' as ResourceType
      || type === 'sha256' as ResourceType
      || type === 'sha512' as ResourceType
    ) {
      type = 'StixFile';
    }
    return this.request(
      `
        mutation IndicatorCreationMutation($input: IndicatorAddInput!) {
          indicatorAdd(input: $input) {
            id
            name
            description
            entity_type
            parent_types
            ...IndicatorLine_node
          }
        }
        fragment IndicatorLine_node on Indicator {
          id
          entity_type
          name
          pattern_type
          valid_from
          valid_until
          x_opencti_score
          x_opencti_main_observable_type
          created
          confidence
          createdBy {
            __typename
            __isIdentity: __typename
            id
            name
            entity_type
          }
          objectMarking {
            edges {
              node {
                id
                definition_type
                definition
                x_opencti_order
                x_opencti_color
              }
            }
          }
          objectLabel {
            edges {
              node {
                id
                value
                color
              }
            }
          }
          creators {
            id
            name
          }
        }
      `,
      {
        name: data.name,
        confidence: 70,
        indicator_types: (data?.indicator_types || [])?.map((indicator: any) => {
          return indicator?.id || undefined;
        }).filter(Boolean) || [],
        pattern: data.pattern,
        pattern_type: 'stix',
        x_opencti_main_observable_type: type,
        x_mitre_platforms: [],
        valid_from: null,
        valid_until: null,
        description: '',
        objectMarking: (data?.objectMarking || [])?.map((markings: any) => {
          return markings?.id || undefined;
        }).filter(Boolean) || [],
        killChainPhases: [],
        objectLabel: (data?.objectLabel || [])?.map((labels: any) => {
          return labels?.id || undefined;
        }).filter(Boolean) || [],
        externalReferences: [],
        x_opencti_detection: !!data?.x_opencti_detection,
        x_opencti_score: 50,
        createObservables: !!data?.createObservables,
      },
    );
  }

  async importData() {
    const data: {
      observableTypesItems: ListLikeItem[];
      vocabulariesItems: ListLikeItem[];
      allowedMarkersItems: ListLikeItem[];
      labelsItems: ListLikeItem[];
    } = {
      labelsItems: [],
      observableTypesItems: [],
      vocabulariesItems: [],
      allowedMarkersItems: [],
    };
    const result = await this.request(`
      {
        subTypes(type: "Stix-Cyber-Observable") {
          edges {
            node {
              id
              label
              workflowEnabled
            }
          }
        }
        labels {
          edges {
            node {
              id
              value
            }
          }
        }
        vocabularies(category: indicator_type_ov) {
          edges {
            node {
              id,
              name
            }
          }
        }
        me {
          allowed_marking {
            id,
            definition
          }
        }
      }
    `);
    if (result.data && result.data?.me?.allowed_marking) {
      data.allowedMarkersItems = (result.data?.me?.allowed_marking || [])
        .reduce((r: typeof data.allowedMarkersItems, item: any) => {
          const { id, definition } = item || {};
          r.push({
            id, content: definition,
          });
          return r;
        }, []);
    }
    if (result.data && result.data?.labels?.edges) {
      data.labelsItems = (result.data?.labels?.edges || [])
        .reduce((r: typeof data.labelsItems, item: any) => {
          const { id, value } = item?.node || {};
          r.push({
            id, content: value,
          });
          return r;
        }, []);
    }
    if (result.data && result.data?.vocabularies?.edges) {
      data.vocabulariesItems = (result.data?.vocabularies?.edges || [])
        .reduce((r: typeof data.vocabulariesItems, item: any) => {
          const { id, name } = item?.node || {};
          r.push({
            id, content: name,
          });
          return r;
        }, []);
    }
    if (result.data && result.data?.subTypes?.edges) {
      data.observableTypesItems = (result.data?.subTypes?.edges || [])
        .reduce((r: typeof data.observableTypesItems, item: any) => {
          const { id, label } = item?.node || {};
          const normalizedID = id?.trim?.().toLowerCase?.();
          if (
            normalizedID
            && (normalizedID === 'email-addr'
            || normalizedID === 'ipv4-addr'
            || normalizedID === 'ipv6-addr'
            || normalizedID === 'mac-addr'
            || normalizedID === 'url'
            || normalizedID === 'domain-name')
          ) {
            r.push({
              id, content: label,
            });
          }
          if (normalizedID && normalizedID === 'stixfile') {
            return [
              ...r,
              {
                id: 'md5' as ResourceType,
                content: 'File-MD5',
              },
              {
                id: 'sha1' as ResourceType,
                content: 'File-SHA1',
              },
              {
                id: 'sha256' as ResourceType,
                content: 'File-SHA256',
              },
              {
                id: 'sha512' as ResourceType,
                content: 'File-SHA512',
              },
            ];
          }
          return r;
        }, []);
    }
    return Promise.resolve({ data } as AsyncResult);
  }

  async clearStorage() {
    return setIntegrationData('openCTI', {
      key: '',
      server: '',
      isActive: false,
      isValid: false,
    } as OpenCTIIntegrationData);
  }

  async getStorage() {
    return getIntegrationData('openCTI') as Promise<AsyncResult<OpenCTIIntegrationData>>;
  }

  async setStorage(data: OpenCTIIntegrationData): Promise<AsyncResult> {
    return setIntegrationData('openCTI', data);
  }
}

export const getOpenCTIModel = () => {
  return new OpenCTIModel();
};

type ListLikeItem = {
  id: string;
  content: string;
};
