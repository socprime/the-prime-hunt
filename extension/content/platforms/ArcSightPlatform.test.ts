import { ArcSightPlatform } from './ArcSightPlatform';
import { ContentPlatform } from '../types/types-content-common';
import { NormalizedParsedResources } from '../../app/resources/resources-types';
import { getMockedResourcesData } from '../../tests/mocks';

describe('ArcSightPlatform content test', () => {
  let platform: ContentPlatform;
  let mockedResourceData: NormalizedParsedResources;

  beforeEach(() => {
    platform = new ArcSightPlatform();
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
      .toEqual('Accounts = "account1" OR Accounts = 2 OR Accounts = "test2" OR Accounts = 4 OR Accounts = "test\\domain.com" OR Accounts = "\\"process.exe\\" -a -g https://some.site/some-page" OR Assets = "asset1" OR Assets = 2 OR Assets = "test2" OR Assets = 4');

    result = platform.buildQueryParts('include', mockedResourceData, true);
    expect(result)
      .toEqual('AND (Accounts = "account1" OR Accounts = 2 OR Accounts = "test2" OR Accounts = 4 OR Accounts = "test\\domain.com" OR Accounts = "\\"process.exe\\" -a -g https://some.site/some-page" OR Assets = "asset1" OR Assets = 2 OR Assets = "test2" OR Assets = 4)');
  });

  test('buildQueryParts exclude test', () => {
    let result = platform.buildQueryParts('exclude', mockedResourceData);
    expect(result)
      .toEqual('Accounts != "account1" AND Accounts != 2 AND Accounts != "test2" AND Accounts != 4 AND Accounts != "test\\domain.com" AND Accounts != "\\"process.exe\\" -a -g https://some.site/some-page" AND Assets != "asset1" AND Assets != 2 AND Assets != "test2" AND Assets != 4');

    result = platform.buildQueryParts('exclude', mockedResourceData, true);
    expect(result)
      .toEqual('AND Accounts != "account1" AND Accounts != 2 AND Accounts != "test2" AND Accounts != 4 AND Accounts != "test\\domain.com" AND Accounts != "\\"process.exe\\" -a -g https://some.site/some-page" AND Assets != "asset1" AND Assets != 2 AND Assets != "test2" AND Assets != 4');
  });

  test('buildQueryParts show all test', () => {
    let result = platform.buildQueryParts('show all', mockedResourceData);
    expect(result)
      .toEqual('Accounts = "account1" OR Accounts = 2 OR Accounts = "test2" OR Accounts = 4 OR Accounts = "test\\domain.com" OR Accounts = "\\"process.exe\\" -a -g https://some.site/some-page" OR Assets = "asset1" OR Assets = 2 OR Assets = "test2" OR Assets = 4');

    result = platform.buildQueryParts('show all', mockedResourceData, true);
    expect(result)
      .toEqual('AND Accounts = "account1" OR Accounts = 2 OR Accounts = "test2" OR Accounts = 4 OR Accounts = "test\\domain.com" OR Accounts = "\\"process.exe\\" -a -g https://some.site/some-page" OR Assets = "asset1" OR Assets = 2 OR Assets = "test2" OR Assets = 4');
  });
});
