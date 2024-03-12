type JSONResponseFunc = (response: Record<string, any>, status: number) => void;
type TextResponseFunc = (response: string, status: number) => void;
type ErrorResponseFunc = (error: Error, status: number) => void;

type Callbacks = {
  onJSONSuccess?: JSONResponseFunc,
  onTextSuccess?: TextResponseFunc,
  onError?: ErrorResponseFunc,
};

export class Http {
  private static request(
    url: string,
    params?: RequestInit,
    callbacks?: Callbacks,
  ) {
    const responseType = callbacks?.onJSONSuccess ? 'json' : 'text';
    let status = 0;

    fetch(url, params)
      .then((response) => {
        status = response.status;
        return responseType === 'json'
          ? response.json()
          : response.text();
      })
      .then((response) => {
        return responseType === 'json'
          ? callbacks?.onJSONSuccess?.(response, status)
          : callbacks?.onTextSuccess?.(response, status);
      })
      .catch((e) => {
        callbacks?.onError?.(e, status);
      });
  }

  get(
    params: {
      url: string,
      headers?: Record<string, string>,
    },
    callbacks?: Callbacks,
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
    callbacks?: Callbacks,
  ) {
    return Http.request(params.url, {
      headers: params?.headers || {},
      method: 'POST',
      body: params.body || '',
    }, callbacks);
  }
}

export const http = new Http();
