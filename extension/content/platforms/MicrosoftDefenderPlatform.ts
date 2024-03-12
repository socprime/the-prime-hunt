import { ListenerType, MessageListener } from '../types/types-content-common';
import { ModifyQueryType, PlatformID, PlatformName, SiemType } from '../../common/types/types-common';
import { addListener } from '../services/content-services-listeners';
import {
  buildQueryParts,
  mountHTMLElement,
} from '../../common/common-helpers';
import { microsoftDefenderInline } from '../../manifest/public-resources';
import { BoundedResourceTypeID, NormalizedParsedResources } from '../../app/resources/resources-types';
import { isNumberInString } from '../../../common/checkers';
import { Loggers } from '../../common/loggers';
import { getWebAccessibleUrl } from '../../common/common-extension-helpers';
import { AbstractContentPlatform } from './AbstractContentPlatform';

let loggers: Loggers;

export class MicrosoftDefenderPlatform extends AbstractContentPlatform {
  defaultWatchers = {
    [BoundedResourceTypeID.Accounts]: [
      'AccountName',
      'InitiatingProcessAccountName',
      'RequestAccountName',
      'InitiatingProcessAccountSid',
      'RequestAccountName',
    ],
    [BoundedResourceTypeID.Assets]: [
      'DeviceName',
      'AccountDomain',
      'InitiatingProcessAccountDomain',
    ],
  };

  static readonly id = PlatformID.MicrosoftDefender;

  static readonly extensionDefaultPosition = {
    top: 0,
    left: 0,
    width: 480,
    height: 480,
  };

  static buildQueryParts(
    type: ModifyQueryType,
    resources: NormalizedParsedResources,
    withPrefix = false,
  ) {
    const prefix = 'where';
    return buildQueryParts(
      resources,
      () => (type === 'exclude' ? ' != ' : ' == '),
      type === 'exclude' ? ' and ' : ' or ',
      type === 'exclude' ? ' and ' : ' or ',
      {
        leftOperand: (v) => v,
        rightOperand: (v) => MicrosoftDefenderPlatform.normalizedValue(v),
      },
      withPrefix ? prefix : undefined,
    );
  }

  static normalizedValue = (value: string | number) => {
    const nValue = isNumberInString(value)
      ? parseFloat(value as string)
      : value;
    return typeof nValue === 'number'
      ? nValue
      : `\"${
        nValue
          .replace(/\\/g, '\\\\')
          .replace(/"/g, '\\"')
      }\"`;
  };

  buildQueryParts(
    type: ModifyQueryType,
    resources: NormalizedParsedResources,
    withPrefix?: boolean,
  ) {
    return MicrosoftDefenderPlatform.buildQueryParts(type, resources, withPrefix);
  }

  extensionDefaultPosition = MicrosoftDefenderPlatform.extensionDefaultPosition;

  getID() {
    return MicrosoftDefenderPlatform.id;
  }

  getName() {
    return PlatformName.MicrosoftDefender;
  }

  getType(): SiemType {
    return SiemType.Defender;
  }

  private static setListeners() {
    (addListener as MessageListener)(
      ListenerType.OnMessage,
      (message) => {
        AbstractContentPlatform.processInlineListeners(message);
      },
    );

    loggers.debug().log('listeners were set');
  }

  private static connectInlineListener() {
    mountHTMLElement('script', document.body, {
      attributes: {
        src: getWebAccessibleUrl(microsoftDefenderInline),
        type: 'text/javascript',
        'data-type': 'inline-listener',
      },
    });
  }

  connect(): void {
    MicrosoftDefenderPlatform.setListeners();
    MicrosoftDefenderPlatform.connectInlineListener();

    loggers.debug().log('connected');
  }
}

loggers = require('../../common/loggers').loggers
  .addPrefix(MicrosoftDefenderPlatform.id);
