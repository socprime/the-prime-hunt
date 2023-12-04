export class Http {
  private static request(
    url: string,
    params?: RequestInit,
    callbacks?: {
      onJSONSuccess?: (response: any) => void,
      onError?: (e: Error) => void,
      onTextSuccess?: (response: string) => void,
    },
  ) {
    const responseType = callbacks?.onJSONSuccess ? 'json' : 'text';

    fetch(url, params)
      .then((response) => {
        return responseType === 'json'
          ? response.json()
          : response.text();
      })
      .then((response) => {
        return responseType === 'json'
          ? callbacks?.onJSONSuccess?.(response)
          : callbacks?.onTextSuccess?.(response);
      })
      .catch((e) => {
        callbacks?.onError?.(e);
      });
  }

  get(
    params: {
      url: string,
      headers?: Record<string, string>,
    },
    callbacks?: {
      onJSONSuccess?: (response: any) => void,
      onError?: (e: Error) => void,
      onTextSuccess?: (response: string) => void,
    },
  ) {
    return Http.request(params.url, {
      headers: params?.headers || {},
      method: 'GET',
    }, callbacks);
  }

  post(
    params: {
      url: string,
      body?: ArrayBuffer | string | FormData,
      headers?: Record<string, string>,
    },
    callbacks?: {
      onTextSuccess?: (response: string) => void,
      onJSONSuccess?: (response: any) => void,
      onError?: (e: Error) => void,
    },
  ) {
    return Http.request(params.url, {
      headers: params?.headers || {},
      method: 'POST',
      body: params.body || '',
    }, callbacks);
  }
}

export const http = new Http();
