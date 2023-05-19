import '@testing-library/jest-dom';
import { fireEvent, render, screen } from '@testing-library/react';
import {
  getMockedResourcesData,
  getMockedBrowserContext,
  getMockedLoggers,
  getNewRootStore,
  getPlatformByID,
  getMockedResizeObserver,
} from '../../mocks';
import { setLoggers } from '../../../common/loggers';
import { ExtensionMessage, PlatformID, PlatformName } from '../../../common/types/types-common';
import { MessageToBackground } from '../../../background/types/types-background-messages';
import { ModifyQueryPayload } from '../../../common/types/types-common-payloads';
import {
  getBulkCopyButton, getBulkExcludeButton, getBulkIncludeButton, getBulkShowAllButton,
  getCollapsibleByHeaderText,
  getCopyButton, getCountSelectedEl,
  getExcludeButton,
  getIncludeButton,
  getShowAllButton,
  openCollapsible, selectAllCollapsibleResources,
} from '../helpers/scenarios';
import { sleep } from '../../../../common/helpers';

const mockedCopyToClipboard = jest.fn();

jest.mock('../../../common/common-helpers', () => {
  return {
    ...jest.requireActual('../../../common/common-helpers'),
    copyToClipboard: mockedCopyToClipboard,
  };
});

describe('Microsoft Sentinel App tests', () => {
  const messagesStack: unknown[] = [];
  setLoggers(getMockedLoggers([]));
  const g = global as any;

  g.ResizeObserver = getMockedResizeObserver();
  g.browser = getMockedBrowserContext(messagesStack);

  let rootStore = getNewRootStore();
  let platform = getPlatformByID(PlatformID.MicrosoftSentinel);
  let RootApp = require('../../../app/root').RootApp;

  beforeEach(() => {
    rootStore = getNewRootStore();
    platform = getPlatformByID(PlatformID.MicrosoftSentinel);
  });
 
  test('platform should be resolved and set', () => {
    rootStore.platformStore.setPlatform(platform);
    expect(rootStore.platformStore.platform.getID()).toEqual(PlatformID.MicrosoftSentinel);

    expect(rootStore.appStore.topPosition).toEqual(rootStore.platformStore.platform.extensionDefaultPosition.top);
    expect(rootStore.appStore.leftPosition).toEqual(rootStore.platformStore.platform.extensionDefaultPosition.left);
    expect(rootStore.appStore.widthApp).toEqual(rootStore.platformStore.platform.extensionDefaultPosition.width);
    expect(rootStore.appStore.heightApp).toEqual(rootStore.platformStore.platform.extensionDefaultPosition.height);
  });

  test('should be rendered', () => {
    rootStore.platformStore.setPlatform(platform);

    render(<RootApp rootStore={rootStore} />);

    expect(screen.getByText('The Prime Hunt')).toBeInTheDocument();
    expect(screen.getByText(`${PlatformName.MicrosoftSentinel} detected. Run a query to see results.`)).toBeInTheDocument();
  });

  test('should provide copy actions', async () => {
    rootStore.platformStore.setPlatform(platform);
    rootStore.resourceStore.addResources(getMockedResourcesData());

    const { container } = render(<RootApp rootStore={rootStore} />);

    const collapsibleEl = getCollapsibleByHeaderText('test0');

    const copyButton = await getCopyButton(collapsibleEl);
    fireEvent.click(copyButton);
    await sleep(0.3);

    expect(mockedCopyToClipboard.mock.calls[0][0]).toEqual('where test0 == "account1"');

    await selectAllCollapsibleResources(collapsibleEl);

    const bulkCopyButton = await getBulkCopyButton(container);
    fireEvent.click(bulkCopyButton);
    await sleep(0.3);

    expect(mockedCopyToClipboard.mock.calls[1][0]).toEqual('where test0 == "account1" or test0 == 2 or test0 == "test2" or test0 == 4 or test0 == "test\\\\domain.com" or test0 == "\\"process.exe\\" -a -g https://some.site/some-page"');
  });

  test('should provide correct actions results', async () => {
    rootStore.platformStore.setPlatform(platform);
    rootStore.resourceStore.addResources(getMockedResourcesData());

    render(<RootApp rootStore={rootStore} />);

    const collapsibleEl = getCollapsibleByHeaderText('test0');

    await openCollapsible(collapsibleEl);

    const goldenSnapshot = '{"test0":["account1"]}';

    // include
    const includeButton = await getIncludeButton(collapsibleEl);
    messagesStack.length = 0;
    fireEvent.click(includeButton);
    let normalizedStack = messagesStack.flat(10);
    expect(normalizedStack.length).toEqual(1);

    let modifyQueryMessage = normalizedStack[0] as ExtensionMessage;
    expect(modifyQueryMessage.type).toEqual(MessageToBackground.BGModifyQuery);
    expect(modifyQueryMessage.id!.indexOf('modify-query')).toEqual(0);

    let payload = modifyQueryMessage.payload as ModifyQueryPayload;
    expect(payload.modifyType).toEqual('include');
    expect(JSON.stringify(payload.resources)).toEqual(goldenSnapshot);

    // exclude
    const excludeButton = await getExcludeButton(collapsibleEl);
    messagesStack.length = 0;
    fireEvent.click(excludeButton);
    normalizedStack = messagesStack.flat(10);
    expect(normalizedStack.length).toEqual(1);

    modifyQueryMessage = normalizedStack[0] as ExtensionMessage;
    expect(modifyQueryMessage.type).toEqual(MessageToBackground.BGModifyQuery);
    expect(modifyQueryMessage.id!.indexOf('modify-query')).toEqual(0);

    payload = modifyQueryMessage.payload as ModifyQueryPayload;
    expect(payload.modifyType).toEqual('exclude');
    expect(JSON.stringify(payload.resources)).toEqual(goldenSnapshot);

    // show all
    const showAllButton = await getShowAllButton(collapsibleEl);
    messagesStack.length = 0;
    fireEvent.click(showAllButton);
    normalizedStack = messagesStack.flat(10);
    expect(normalizedStack.length).toEqual(1);

    modifyQueryMessage = normalizedStack[0] as ExtensionMessage;
    expect(modifyQueryMessage.type).toEqual(MessageToBackground.BGModifyQuery);
    expect(modifyQueryMessage.id!.indexOf('modify-query')).toEqual(0);

    payload = modifyQueryMessage.payload as ModifyQueryPayload;
    expect(payload.modifyType).toEqual('show all');
    expect(JSON.stringify(payload.resources)).toEqual(goldenSnapshot);
  });

  test('should provide correct bulk actions results', async () => {
    rootStore.platformStore.setPlatform(platform);
    rootStore.resourceStore.addResources(getMockedResourcesData());

    const { container } = render(<RootApp rootStore={rootStore} />);

    const firstCollapsibleEl = getCollapsibleByHeaderText('test0');
    const thirdCollapsibleEl = getCollapsibleByHeaderText('test3');

    await openCollapsible(firstCollapsibleEl);
    await openCollapsible(thirdCollapsibleEl);

    const countSelectedEl = await getCountSelectedEl(container);
    expect(countSelectedEl.textContent).toEqual('— 0 item(s)selected');

    await selectAllCollapsibleResources(thirdCollapsibleEl);

    expect(countSelectedEl.textContent).toEqual('— 3 item(s)selected');

    await selectAllCollapsibleResources(firstCollapsibleEl);

    expect(countSelectedEl.textContent).toEqual('— 9 item(s)selected');

    const goldenSnapshot = '{"test3":["account3","test2","4"],"test0":["account1","2","test2","4","test\\\\domain.com","\\"process.exe\\" -a -g https://some.site/some-page"]}';
    // bulk include
    const bulkIncludeButton = await getBulkIncludeButton(container);
    messagesStack.length = 0;
    fireEvent.click(bulkIncludeButton);
    let normalizedStack = messagesStack.flat(10);
    expect(normalizedStack.length).toEqual(1);

    let modifyQueryMessage = normalizedStack[0] as ExtensionMessage;
    expect(modifyQueryMessage.type).toEqual(MessageToBackground.BGModifyQuery);
    expect(modifyQueryMessage.id!.indexOf('modify-query')).toEqual(0);

    let payload = modifyQueryMessage.payload as ModifyQueryPayload;
    expect(payload.modifyType).toEqual('include');
    expect(JSON.stringify(payload.resources)).toEqual(goldenSnapshot);

    // bulk exclude
    const bulkExcludeButton = await getBulkExcludeButton(container);
    messagesStack.length = 0;
    fireEvent.click(bulkExcludeButton);
    normalizedStack = messagesStack.flat(10);
    expect(normalizedStack.length).toEqual(1);

    modifyQueryMessage = normalizedStack[0] as ExtensionMessage;
    expect(modifyQueryMessage.type).toEqual(MessageToBackground.BGModifyQuery);
    expect(modifyQueryMessage.id!.indexOf('modify-query')).toEqual(0);

    payload = modifyQueryMessage.payload as ModifyQueryPayload;
    expect(payload.modifyType).toEqual('exclude');
    expect(JSON.stringify(payload.resources)).toEqual(goldenSnapshot);

    // bulk exclude
    const bulkShowAllButton = await getBulkShowAllButton(container);
    messagesStack.length = 0;
    fireEvent.click(bulkShowAllButton);
    normalizedStack = messagesStack.flat(10);
    expect(normalizedStack.length).toEqual(1);

    modifyQueryMessage = normalizedStack[0] as ExtensionMessage;
    expect(modifyQueryMessage.type).toEqual(MessageToBackground.BGModifyQuery);
    expect(modifyQueryMessage.id!.indexOf('modify-query')).toEqual(0);

    payload = modifyQueryMessage.payload as ModifyQueryPayload;
    expect(payload.modifyType).toEqual('show all');
    expect(JSON.stringify(payload.resources)).toEqual(goldenSnapshot);
  });
});
