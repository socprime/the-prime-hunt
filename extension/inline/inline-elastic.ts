import { ExtensionMessage } from '../common/types/types-common';
import { isMessageMatched } from '../common/common-listeners';
import { MessageToInline } from './types/types-inline-messages';
import { ElasticPlatform } from '../content/platforms/ElasticPlatform';
import { ModifyQueryPayload } from '../common/types/types-common-payloads';

const platform = new ElasticPlatform();

const loggers = require('../common/loggers').loggers
  .addPrefix(platform.getID());

const getInput = (): HTMLTextAreaElement | null => {
  return document.querySelector('.euiTextArea[data-test-subj="queryInput"]');
};

window.addEventListener('message', (event) => {
  const message = event.data as ExtensionMessage;
  if (isMessageMatched(
    () => MessageToInline.ISModifyQuery === message.type,
    message,
    event,
  )) {
    const input = getInput();
    if (!input) {
      return loggers.warn().log('query input not found');
    }
    const currentValue = input.value;
    const { resources, modifyType } = message.payload as ModifyQueryPayload;

    if (modifyType === 'show all') {
      input.value = platform.buildQueryParts(modifyType, resources);
      input.click();
      return;
    }

    let suffix = '';

    // if (modifyType === 'include') {
    //   const parsedResources: ParsedResources = {};
    //   [...currentValue.matchAll(new RegExp(/\b[^\b\s:]+(\s)*?:(\s)*?[^\b\s]+\b/, 'gi'))].forEach(r => {
    //     const index = r[0].indexOf(':');
    //     const fieldName = r[0].substring(0, index);
    //     const resourceName = r[0].substring(index + 1);
    //
    //     if (!resourceName || !fieldName) {
    //       return;
    //     }
    //
    //     const normalizedFieldName = String(fieldName).trim();
    //     if (!parsedResources[normalizedFieldName]) {
    //       parsedResources[normalizedFieldName] = new Set();
    //     }
    //
    //     const normalizedResourceName = removeQuotesAround(removeBracketsAround(String(resourceName).trim()));
    //     parsedResources[normalizedFieldName].add(
    //       isNumberInString(normalizedResourceName)
    //         ? normalizedResourceName
    //         : `"${normalizedResourceName}"`,
    //     );
    //   });
    //
    //   Object.keys(resources).forEach(fieldName => {
    //     if (!parsedResources[fieldName]) {
    //       parsedResources[fieldName] = new Set();
    //     }
    //     resources[fieldName].forEach(resourceName => {
    //       const normalizedResourceName = removeQuotesAround(removeBracketsAround(String(resourceName).trim()));
    //       parsedResources[fieldName].add(
    //         isNumberInString(normalizedResourceName)
    //           ? normalizedResourceName
    //           : `"${normalizedResourceName}"`,
    //       );
    //     });
    //   });
    //
    //   const result: NormalizedParsedResources = {};
    //   Object.keys(parsedResources).forEach(fieldName => {
    //     result[fieldName] = Array.from(parsedResources[fieldName]);
    //   });
    //
    //   input.value = platform.buildQueryParts(modifyType, result, true).trim();
    //   input.click();
    //   return;
    // }

    suffix = platform.buildQueryParts(modifyType, resources, true);

    input.value = `${currentValue} ${suffix}`;
    input.click();
  }
});

loggers.debug().log('mounted');
