// npx ts-mocha -p tsconfig.json extension/background/background-listeners_test.ts

import { describe } from 'mocha';
import { getMockedBrowserContext } from '../tests/mocks';
import { interceptors, removeBGInterceptor, setBGInterceptor } from './background-listeners';
import { getBrowserContext } from '../common/common-helpers';
import assert from 'assert';
import { BGListenerType } from './types/types-background-common';
import { startLogging, stopLogging } from '../common/loggers';
import { UniqueHash } from '../../common/types';

const unMock: Function[] = [];

describe('BG Listeners test', () => {
  before(() => {
    stopLogging();
    require.cache[__filename]!.children.forEach(ch => {
      if (ch.exports.getBrowserContext) {
        ch.exports.getBrowserContext = getMockedBrowserContext;
        unMock.push(() => {
          ch.exports.getBrowserContext = getBrowserContext;
        });
      }
    });
  });

  after(() => {
    unMock.forEach(c => c());
    startLogging();
  });

  it('should create and remove interceptors', () => {
    const ids: Set<UniqueHash> = new Set();
    assert.equal(Object.keys(interceptors).length, 0);

    ids.add(setBGInterceptor(
      BGListenerType.OnBeforeRequest,
      () => {},
    ));
    assert.equal(interceptors[BGListenerType.OnBeforeRequest]!.length, 1);

    ids.add(setBGInterceptor(
      BGListenerType.OnBeforeRequest,
      () => {},
    ));
    assert.equal(interceptors[BGListenerType.OnBeforeRequest]!.length, 2);

    ids.add(setBGInterceptor(
      BGListenerType.OnBeforeSendHeaders,
      () => {},
    ));
    assert.equal(interceptors[BGListenerType.OnBeforeSendHeaders]!.length, 1);

    assert.equal(ids.size, 3);

    Array.from(ids).forEach(id => {
      removeBGInterceptor(id);
      ids.delete(id);
    });

    assert.equal(ids.size, 0);
    assert.equal(interceptors[BGListenerType.OnBeforeRequest]!.length, 0);
    assert.equal(interceptors[BGListenerType.OnBeforeSendHeaders]!.length, 0);
  });
});

// npx ts-mocha -p tsconfig.json extension/background/background-listeners_test.ts
