import { sleep } from '../../../common/helpers';
import { logRegularInfoMessage, logWarningMessage, testCase } from './helpers/utils';
import {
  addNewTestResources,
  getExcludeBulkResourceButton,
  getIncludeBulkResourceButton,
  getShowAllBulkResourceButton,
  showExtension,
  getIncludeButton,
  getExcludeButton,
  getShowAllButton,
  getAddNewResourceTabButton,
  getInputInActiveResourceTab,
  getApplyButtonInActiveResourceTab,
  getAddNewFieldButton,
  addNewFieldInput,
  getApplyAddNewFieldButton,
  getResourcesTabByTitle,
  getDeleteResourceTabButton,
  getTestData,
  getResourceCollapsibleByHeaderText,
  getResourceCollapsibleRemoveButton,
  getWatchers,
  setWatchers,
  getResourceCollapsibleHeader,
  getResourceListItem, openAccountsTab,
} from './helpers/scenarios';
import { clickOnElement, dblClickOnElement, hoverOnElement } from '../helpers';
import { FieldName, ResourceTypeID } from '../../app/resources/resources-types';

type Messages = {
  testIncludeAction: string;
  testExcludeAction: string;
  testShowAllAction: string;
  testIncludeBulkAction: string;
  test2IncludeBulkAction: string;
  testExcludeBulkAction: string;
  test2ExcludeBulkAction: string;
  testShowAllBulkAction: string;
  test2ShowAllBulkAction: string;
};

export const suiteGlobals: {
  messages: Messages;
  getValue: () => Promise<string>;
  clearValue: () => Promise<void>;
} = {
  getValue: () => Promise.resolve('not set'),
  clearValue: () => Promise.resolve(),
  messages: {
    testIncludeAction: '',
    test2ExcludeBulkAction: '',
    test2IncludeBulkAction: '',
    test2ShowAllBulkAction: '',
    testExcludeAction: '',
    testExcludeBulkAction: '',
    testIncludeBulkAction: '',
    testShowAllAction: '',
    testShowAllBulkAction: '',
  },
};

const testIncludeAction = async () => {
  logRegularInfoMessage('start test `testIncludeAction`');
  await suiteGlobals.clearValue();
  await sleep(0.1);
  const firstResourceListItem = getResourceListItem(
    getResourceCollapsibleByHeaderText('test0')!,
  )!;
  hoverOnElement(firstResourceListItem);
  await sleep(0.3);
  const includeButton = getIncludeButton(firstResourceListItem)!;
  await sleep(0.1);
  clickOnElement(includeButton);
  await sleep(0.3);

  const value = await suiteGlobals.getValue();
  testCase('Include resource action test')
    .expect(value.trim())
    .toEqual(suiteGlobals.messages.testIncludeAction);
  logRegularInfoMessage('end test `testIncludeAction`');
};

const testExcludeAction = async () => {
  logRegularInfoMessage('start test `testExcludeAction`');
  await suiteGlobals.clearValue();
  await sleep(0.1);
  const firstResourceListItem = getResourceListItem(
    getResourceCollapsibleByHeaderText('test0')!,
  )!;
  hoverOnElement(firstResourceListItem);
  await sleep(0.3);
  const excludeButton = getExcludeButton(firstResourceListItem)!;
  await sleep(0.1);
  clickOnElement(excludeButton);
  await sleep(0.3);

  const value = await suiteGlobals.getValue();
  testCase('Exclude resource action test')
    .expect(value.trim())
    .toEqual(suiteGlobals.messages.testExcludeAction);
  logRegularInfoMessage('end test `testExcludeAction`');
};

const testShowAllAction = async () => {
  logRegularInfoMessage('start test `testShowAllAction`');
  await suiteGlobals.clearValue();
  await sleep(0.1);
  const firstResourceListItem = getResourceListItem(
    getResourceCollapsibleByHeaderText('test0')!,
  )!;
  hoverOnElement(firstResourceListItem);
  await sleep(0.3);
  const showAllButton = getShowAllButton(firstResourceListItem)!;
  await sleep(0.1);
  clickOnElement(showAllButton);
  await sleep(0.3);

  const value = await suiteGlobals.getValue();
  testCase('Show all resource action test')
    .expect(value.trim())
    .toEqual(suiteGlobals.messages.testShowAllAction);
  logRegularInfoMessage('end test `testShowAllAction`');
};

const testIncludeBulkAction = async () => {
  logRegularInfoMessage('start test `testIncludeBulkAction`');
  await suiteGlobals.clearValue();
  const includeBulkButton = getIncludeBulkResourceButton()!;
  await sleep(0.1);
  includeBulkButton.click();
  await sleep(0.3);

  const value = await suiteGlobals.getValue();
  testCase('Bulk include resource action test')
    .expect(value.trim())
    .toEqual(suiteGlobals.messages.testIncludeBulkAction);
  logRegularInfoMessage('end test `testIncludeBulkAction`');
};

const test2IncludeBulkAction = async () => {
  logRegularInfoMessage('start test `test2IncludeBulkAction`');
  await suiteGlobals.clearValue();
  const includeBulkButton = getIncludeBulkResourceButton()!;
  await sleep(0.1);
  includeBulkButton.click();
  await sleep(0.3);

  const value = await suiteGlobals.getValue();
  testCase('Bulk include resource action test2')
    .expect(value.trim())
    .toEqual(suiteGlobals.messages.test2IncludeBulkAction);
  logRegularInfoMessage('end test `test2IncludeBulkAction`');
};

const testExcludeBulkAction = async () => {
  logRegularInfoMessage('start test `testExcludeBulkAction`');
  await suiteGlobals.clearValue();
  const excludeBulkResourceButton = getExcludeBulkResourceButton()!;
  await sleep(0.1);
  excludeBulkResourceButton.click();
  await sleep(0.3);

  const value = await suiteGlobals.getValue();
  testCase('Bulk exclude resource action test')
    .expect(value.trim())
    .toEqual(suiteGlobals.messages.testExcludeBulkAction);
  logRegularInfoMessage('end test `testExcludeBulkAction`');
};

const test2ExcludeBulkAction = async () => {
  logRegularInfoMessage('start test `test2ExcludeBulkAction`');
  await suiteGlobals.clearValue();
  const excludeBulkResourceButton = getExcludeBulkResourceButton()!;
  await sleep(0.1);
  excludeBulkResourceButton.click();
  await sleep(0.3);

  const value = await suiteGlobals.getValue();
  testCase('Bulk exclude resource action test2')
    .expect(value.trim())
    .toEqual(suiteGlobals.messages.test2ExcludeBulkAction);
  logRegularInfoMessage('end test `test2ExcludeBulkAction`');
};

const testShowAllBulkAction = async () => {
  logRegularInfoMessage('start test `testShowAllBulkAction`');
  await suiteGlobals.clearValue();
  const showAllBulkButton = getShowAllBulkResourceButton()!;
  await sleep(0.1);
  showAllBulkButton.click();
  await sleep(0.3);

  const value = await suiteGlobals.getValue();
  testCase('Bulk show all resource action test')
    .expect(value.trim())
    .toEqual(suiteGlobals.messages.testShowAllBulkAction);
  logRegularInfoMessage('end test `testShowAllBulkAction`');
};

const test2ShowAllBulkAction = async () => {
  logRegularInfoMessage('start test `test2ShowAllBulkAction`');
  await suiteGlobals.clearValue();
  const showAllBulkButton = getShowAllBulkResourceButton()!;
  await sleep(0.1);
  showAllBulkButton.click();
  await sleep(0.3);

  const value = await suiteGlobals.getValue();
  testCase('Bulk show all resource action test2')
    .expect(value.trim())
    .toEqual(suiteGlobals.messages.test2ShowAllBulkAction);
  logRegularInfoMessage('end test `test2ShowAllBulkAction`');
};

const testSetWatchers = async () => {
  logRegularInfoMessage('start test `testSetWatchers`');
  let watchers = getWatchers();
  if (typeof watchers['custom-test'] !== 'undefined') {
    delete watchers['custom-test'];
  }

  setWatchers(watchers);

  getAddNewResourceTabButton().click();
  await sleep(0.3);

  const tabInput = getInputInActiveResourceTab();
  tabInput.value = 'custom-test';
  tabInput.dispatchEvent(new Event('change', { bubbles: true }));

  clickOnElement(getApplyButtonInActiveResourceTab());

  getAddNewFieldButton().click();
  await sleep(0.3);

  const newFieldInput = addNewFieldInput();
  newFieldInput.value = 'test-resource-name';
  newFieldInput.dispatchEvent(new Event('change', { bubbles: true }));

  const applyAddNewFieldButton = getApplyAddNewFieldButton();
  clickOnElement(applyAddNewFieldButton);

  testCase('no custom watcher', false)
    .expect(typeof watchers['custom-test'] === 'undefined')
    .toEqual(true);

  watchers = getWatchers();

  testCase('Set watchers')
    .expect(
      typeof watchers['custom-test'] !== 'undefined'
      && JSON.stringify(watchers['custom-test']) === '["test-resource-name"]',
    )
    .toEqual(true);

  getResourcesTabByTitle('custom-test').click();

  await sleep(0.3);
  dblClickOnElement(getInputInActiveResourceTab());
  await sleep(0.3);

  watchers = getWatchers();

  testCase('exist custom watcher', false)
    .expect(typeof watchers['custom-test'] !== 'undefined')
    .toEqual(true);

  clickOnElement(getDeleteResourceTabButton());

  watchers = getWatchers();

  testCase('no custom watcher 2', false)
    .expect(typeof watchers['custom-test'] === 'undefined')
    .toEqual(true);

  setWatchers(watchers);
  logRegularInfoMessage('end test `testSetWatchers`');

  await sleep(0.3);
};

const testRemoveResourcesFields = async () => {
  logRegularInfoMessage('start test `testRemoveResourcesFields`');
  const testData = getTestData();
  const mapTypeToFields = new Map<ResourceTypeID, Set<FieldName>>();
  Object.keys(testData).forEach((typeID) => {
    Object.keys(testData[typeID]).forEach((fieldName) => {
      const set = mapTypeToFields.get(typeID) || new Set();
      set.add(fieldName);
      mapTypeToFields.set(typeID, set);
    });
  });
  for (const store of Array.from(mapTypeToFields)) {
    const [typeID, set] = store;
    for (const fieldName of Array.from(set)) {
      const removeButton = getResourceCollapsibleRemoveButton(
        getResourceCollapsibleByHeaderText(fieldName),
      );
      let watchers = getWatchers();
      testCase(`exists fieldName >${fieldName}< in type >${typeID}<`, false)
        .expect(watchers[typeID]?.includes(fieldName))
        .toEqual(true);

      clickOnElement(removeButton);
      await sleep(0.3);

      watchers = getWatchers();
      testCase(`not exists fieldName >${fieldName}< in type >${typeID}<`, false)
        .expect(watchers[typeID]?.includes(fieldName))
        .toEqual(false);
    }
  }

  logWarningMessage('Remove resources fields');
  logRegularInfoMessage('end test `testRemoveResourcesFields`');
};

export const startTests = async () => {
  await showExtension();
  await openAccountsTab();
  await addNewTestResources();

  const firstCollapsibleHeader = getResourceCollapsibleHeader(
    getResourceCollapsibleByHeaderText('test0')!,
  );
  firstCollapsibleHeader.click();
  await sleep(0.3);

  await testIncludeAction();
  await testExcludeAction();
  await testShowAllAction();

  let headerCheckbox = firstCollapsibleHeader.querySelector('.checker-wrapper') as HTMLElement;
  testCase('headerCheckbox availability test', false)
    .expect(!!headerCheckbox)
    .toEqual(true);

  headerCheckbox.click();
  await sleep(0.1);

  await testIncludeBulkAction();
  await testExcludeBulkAction();
  await testShowAllBulkAction();

  const secondCollapsibleHeader = getResourceCollapsibleHeader(
    getResourceCollapsibleByHeaderText('test2')!,
  );
  secondCollapsibleHeader.click();
  await sleep(0.1);

  headerCheckbox = secondCollapsibleHeader.querySelector('.checker-wrapper') as HTMLElement;
  testCase('headerCheckbox2 availability test', false)
    .expect(!!headerCheckbox)
    .toEqual(true);

  headerCheckbox.click();
  await sleep(0.1);

  await test2IncludeBulkAction();
  await test2ExcludeBulkAction();
  await test2ShowAllBulkAction();

  await testSetWatchers();
  await testRemoveResourcesFields();
};
