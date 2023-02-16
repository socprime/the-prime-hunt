import { MicrosoftDefenderPlatform } from './MicrosoftDefenderPlatform';
import { ContentPlatform } from '../types/types-content-common';
import { NormalizedParsedResources } from '../../app/resources/resources-types';
import { getMockedResourcesData } from '../../tests/mocks';

describe('MicrosoftDefenderPlatform content test', () => {
  let platform: ContentPlatform;
  let mockedResourceData: NormalizedParsedResources;

  beforeEach(() => {
    platform = new MicrosoftDefenderPlatform();
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
      .toEqual('Accounts == "account1" or Accounts == 2 or Accounts == "test2" or Accounts == 4 or Accounts == "test\\\\domain.com" or Accounts == "\\"process.exe\\" -a -g https://some.site/some-page" or Assets == "asset1" or Assets == 2 or Assets == "test2" or Assets == 4');

    result = platform.buildQueryParts('include', mockedResourceData, true);
    expect(result)
      .toEqual('where Accounts == "account1" or Accounts == 2 or Accounts == "test2" or Accounts == 4 or Accounts == "test\\\\domain.com" or Accounts == "\\"process.exe\\" -a -g https://some.site/some-page" or Assets == "asset1" or Assets == 2 or Assets == "test2" or Assets == 4');
  });

  test('buildQueryParts exclude test', () => {
    let result = platform.buildQueryParts('exclude', mockedResourceData);
    expect(result)
      .toEqual('Accounts != "account1" and Accounts != 2 and Accounts != "test2" and Accounts != 4 and Accounts != "test\\\\domain.com" and Accounts != "\\"process.exe\\" -a -g https://some.site/some-page" and Assets != "asset1" and Assets != 2 and Assets != "test2" and Assets != 4');

    result = platform.buildQueryParts('exclude', mockedResourceData, true);
    expect(result)
      .toEqual('where Accounts != "account1" and Accounts != 2 and Accounts != "test2" and Accounts != 4 and Accounts != "test\\\\domain.com" and Accounts != "\\"process.exe\\" -a -g https://some.site/some-page" and Assets != "asset1" and Assets != 2 and Assets != "test2" and Assets != 4');
  });

  test('buildQueryParts show all test', () => {
    let result = platform.buildQueryParts('show all', mockedResourceData);
    expect(result)
      .toEqual('Accounts == "account1" or Accounts == 2 or Accounts == "test2" or Accounts == 4 or Accounts == "test\\\\domain.com" or Accounts == "\\"process.exe\\" -a -g https://some.site/some-page" or Assets == "asset1" or Assets == 2 or Assets == "test2" or Assets == 4');

    result = platform.buildQueryParts('show all', mockedResourceData, true);
    expect(result)
      .toEqual('where Accounts == "account1" or Accounts == 2 or Accounts == "test2" or Accounts == 4 or Accounts == "test\\\\domain.com" or Accounts == "\\"process.exe\\" -a -g https://some.site/some-page" or Assets == "asset1" or Assets == 2 or Assets == "test2" or Assets == 4');
  });
});
