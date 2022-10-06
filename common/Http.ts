export class Http {
  private request(
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
      .then(response => responseType === 'json'
        ? response.json()
        : response.text(),
      )
      .then(response => {
        return responseType === 'json'
          ? callbacks?.onJSONSuccess?.(response)
          : callbacks?.onTextSuccess?.(response);
      })
      .catch(e => {
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
    return this.request(params.url, {
      headers: params?.headers || {},
      method: 'GET',
    }, callbacks);
  }

  post(
    params: {
      url: string,
      body?: ArrayBuffer | string,
      headers?: Record<string, string>,
    },
    callbacks?: {
      onJSONSuccess?: (response: any) => void,
      onError?: (e: Error) => void,
    },
  ) {
    return this.request(params.url, {
      headers: params?.headers || {},
      method: 'POST',
      body: params.body || '',
    }, callbacks);
  }
}

export const http = new Http();
