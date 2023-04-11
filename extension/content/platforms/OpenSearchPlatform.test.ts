import { OpenSearchPlatform } from './OpenSearchPlatform';
import { ContentPlatform } from '../types/types-content-common';
import { NormalizedParsedResources } from '../../app/resources/resources-types';
import { getMockedResourcesData } from '../../tests/mocks';

describe('OpenSearchPlatform content test', () => {
  let platform: ContentPlatform;
  let mockedResourceData: NormalizedParsedResources;

  beforeEach(() => {
    platform = new OpenSearchPlatform();
    mockedResourceData = (() => {
      const mockedData = getMockedResourcesData();
      return {
        Accounts: mockedData.Accounts.test0,
        Assets: mockedData.Assets.test5,
      } as NormalizedParsedResources;
    })();
  });

  test('buildQueryParts include test', () => {
    let result = platform.buildQueryParts('include', mockedResourceData);
    expect(result)
      .toEqual('Accounts:("account1" OR 2 OR "test2" OR 4 OR "test\\domain.com" OR "\\"process.exe\\" -a -g https://some.site/some-page") AND Assets:("asset1" OR 2 OR "test2" OR 4)');

    result = platform.buildQueryParts('include', mockedResourceData, true);
    expect(result)
      .toEqual('AND Accounts:("account1" OR 2 OR "test2" OR 4 OR "test\\domain.com" OR "\\"process.exe\\" -a -g https://some.site/some-page") AND Assets:("asset1" OR 2 OR "test2" OR 4)');
  });

  test('buildQueryParts exclude test', () => {
    let result = platform.buildQueryParts('exclude', mockedResourceData);
    expect(result)
      .toEqual('Accounts:("account1" OR 2 OR "test2" OR 4 OR "test\\domain.com" OR "\\"process.exe\\" -a -g https://some.site/some-page") AND NOT Assets:("asset1" OR 2 OR "test2" OR 4)');

    result = platform.buildQueryParts('exclude', mockedResourceData, true);
    expect(result)
      .toEqual('AND NOT Accounts:("account1" OR 2 OR "test2" OR 4 OR "test\\domain.com" OR "\\"process.exe\\" -a -g https://some.site/some-page") AND NOT Assets:("asset1" OR 2 OR "test2" OR 4)');
  });

  test('buildQueryParts show all test', () => {
    let result = platform.buildQueryParts('show all', mockedResourceData);
    expect(result)
      .toEqual('Accounts:("account1" OR 2 OR "test2" OR 4 OR "test\\domain.com" OR "\\"process.exe\\" -a -g https://some.site/some-page") AND Assets:("asset1" OR 2 OR "test2" OR 4)');

    result = platform.buildQueryParts('show all', mockedResourceData);
    expect(result)
      .toEqual('Accounts:("account1" OR 2 OR "test2" OR 4 OR "test\\domain.com" OR "\\"process.exe\\" -a -g https://some.site/some-page") AND Assets:("asset1" OR 2 OR "test2" OR 4)');
  });
});
