import { ContentPlatform, ListenerType, MessageListener } from '../types/types-content-common';
import { ModifyQueryType, PlatformID, PlatformName } from '../../common/types/types-common';
import { addListener } from '../services/content-services-listeners';
import { isMessageMatched } from '../../common/common-listeners';
import { MessageToContent } from '../types/types-content-messages';
import { sendMessageFromContent } from '../services/content-services';
import { MessageToInline } from '../../inline/types/types-inline-messages';
import {
  buildQueryParts,
  getWebAccessibleUrl,
  mountHTMLElement,
} from '../../common/common-helpers';
import { splunkInline } from '../../manifest/public-resources';
import { BoundedResourceTypeID, NormalizedParsedResources } from '../../app/resources/resources-types';
import { isNumberInString } from '../../../common/checkers';
import { deduplicateArray } from '../../../common/helpers';
import { Loggers } from '../../common/loggers';

let loggers: Loggers;

export class SplunkPlatform implements ContentPlatform {
  defaultWatchers = {
    [BoundedResourceTypeID.Accounts]: deduplicateArray([
      'src_user',
      'src_user_bunit',
      'user',
      'Account_Name',
      'User',
      'src_user_name',
      'user_name',
    ]),
    [BoundedResourceTypeID.Assets]: deduplicateArray([
      'dest_host',
      'dst',
      'dest_nt_host',
      'src_host',
      'src_nt_host',
      'src',
      'dest',
      'dest_name',
      'dest_host',
      'dvc',
      'dvc_host',
      'dest_dns',
      'src_dns',
      'ComputerName',
      'DestinationHostname',
      'SourceHostname',
    ]),
  };

  static id = PlatformID.Splunk;

  static readonly extensionDefaultPosition = {
    top: 0,
    left: 0,
    width: 480,
    height: 480,
  };

  static normalizedValue(value: string | number) {
    const nValue = isNumberInString(value)
      ? parseFloat(value as string)
      : value;
    return typeof nValue === 'number'
      ? nValue
      : `"${nValue}"`;
  }

  static buildQueryParts(
    type: ModifyQueryType,
    resources: NormalizedParsedResources,
  ) {
    return buildQueryParts(
      resources,
      type === 'exclude' ? '!=' : '==',
      type === 'exclude' ? ' and ' : ' or ',
      {
        leftOperand: (v) => v,
        rightOperand: (v) => SplunkPlatform.normalizedValue(v),
      },
    );
  }

  buildQueryParts(
    type: ModifyQueryType,
    resources: NormalizedParsedResources,
  ) {
    return SplunkPlatform.buildQueryParts(type, resources);
  }

  extensionDefaultPosition = SplunkPlatform.extensionDefaultPosition;

  getID() {
    return SplunkPlatform.id;
  }

  getName() {
    return PlatformName.Splunk;
  }

  private static setListeners() {
    (addListener as MessageListener)(
      ListenerType.OnMessage,
      (message) => {
        if (isMessageMatched(
          () => MessageToContent.CSModifyQuery === message.type,
          message,
        )) {
          sendMessageFromContent({
            ...message,
            id: `${message.id}--content-modify-query`,
            type: MessageToInline.ISModifyQuery,
          }, false);
        }
      },
    );
  }

  private static connectInlineListener() {
    mountHTMLElement('script', document.body, {
      attributes: {
        src: getWebAccessibleUrl(splunkInline),
        type: 'text/javascript',
        'data-type': 'inline-listener',
      },
    });
  }

  connect(): void {
    SplunkPlatform.setListeners();
    SplunkPlatform.connectInlineListener();
    loggers.debug().log('connected');
  }
}

loggers = require('../../common/loggers').loggers
  .addPrefix(SplunkPlatform.id);
