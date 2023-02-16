import { getMockedLoggers } from '../../tests/mocks';
import { interceptors, removeBGInterceptor, setBGInterceptor } from './background-services-listeners';
import { describe, test, expect } from '@jest/globals';
import { setLoggers } from '../../common/loggers';
import { UniqueHash } from '../../../common/types';
import { BGListenerType } from '../types/types-background-common';

describe('BG Listeners test', () => {
  setLoggers(getMockedLoggers([]));

  test('should create and remove interceptors', () => {
    const ids: Set<UniqueHash> = new Set();
    expect(Object.keys(interceptors).length).toEqual(0);

    ids.add(setBGInterceptor(
      BGListenerType.OnBeforeRequest,
      () => {},
    ));
    expect(interceptors[BGListenerType.OnBeforeRequest]!.length).toEqual(1);

    ids.add(setBGInterceptor(
      BGListenerType.OnBeforeRequest,
      () => {},
    ));
    expect(interceptors[BGListenerType.OnBeforeRequest]!.length).toEqual(2);

    ids.add(setBGInterceptor(
      BGListenerType.OnBeforeSendHeaders,
      () => {},
    ));
    expect(interceptors[BGListenerType.OnBeforeSendHeaders]!.length).toEqual(1);

    expect(ids.size).toEqual(3);

    Array.from(ids).forEach(id => {
      removeBGInterceptor(id);
      ids.delete(id);
    });

    expect(ids.size).toEqual(0);
    expect(interceptors[BGListenerType.OnBeforeRequest]!.length).toEqual(0);
    expect(interceptors[BGListenerType.OnBeforeSendHeaders]!.length).toEqual(0);
  });
});
