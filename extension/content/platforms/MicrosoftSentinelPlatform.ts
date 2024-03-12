import { ModifyQueryType, PlatformID, PlatformName, SiemType } from '../../common/types/types-common';
import { ListenerType, MessageListener } from '../types/types-content-common';
import { addListener } from '../services/content-services-listeners';
import { buildQueryParts, mountHTMLElement, waitHTMLElement, } from '../../common/common-helpers';
import { contentPlatformIDFromENV } from '../../common/envs';
import { microsoftSentinelInline } from '../../manifest/public-resources';
import { isNumberInString } from '../../../common/checkers';
import { BoundedResourceTypeID, NormalizedParsedResources } from '../../app/resources/resources-types';
import { Loggers } from '../../common/loggers';
import { getWebAccessibleUrl } from '../../common/common-extension-helpers';
import { AbstractContentPlatform } from './AbstractContentPlatform';

let loggers: Loggers;

export class MicrosoftSentinelPlatform extends AbstractContentPlatform {
  static readonly id = PlatformID.MicrosoftSentinel;

  static readonly extensionDefaultPosition = {
    top: 0,
    left: 0,
    width: 500,
    height: 400,
  };

  static normalizedValue(value: string | number) {
    const nValue = isNumberInString(value)
      ? parseFloat(value as string)
      : value;
    return typeof nValue === 'number'
      ? nValue
      : `"${
        nValue
          .replace(/\\/g, '\\\\')
          .replace(/"/g, '\\"')
      }"`;
  }

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
        rightOperand: (v) => MicrosoftSentinelPlatform.normalizedValue(v),
      },
      withPrefix ? prefix : undefined,
    );
  }

  defaultWatchers = {
    [BoundedResourceTypeID.Accounts]: [
      'UserName',
      'Account',
      'SubjectUserName',
      'TargetUserName',
      'UserDisplayName',
      'UserPrincipalName',
      'UPN',
      'Identity',
      'Name',
      'FullName',
      'NTDomain',
      'UPNSuffix',
      'Sid',
      'AadUserId',
      'DisplayName',
    ],
    [BoundedResourceTypeID.Assets]: [
      'Computer',
      'DeviceName',
      'HostName',
      'FullDisplayName',
      'ServicePrincipalName',
      'DnsDomain',
      'NetBiosName',
      'OMSAgentID',
    ],
  };

  extensionDefaultPosition = MicrosoftSentinelPlatform.extensionDefaultPosition;

  buildQueryParts(
    type: ModifyQueryType,
    resources: NormalizedParsedResources,
    withPrefix?: boolean,
  ) {
    return MicrosoftSentinelPlatform.buildQueryParts(type, resources, withPrefix);
  }

  getID() {
    return MicrosoftSentinelPlatform.id;
  }

  getName() {
    return PlatformName.MicrosoftSentinel;
  }

  getType(): SiemType {
    return SiemType.Sentinel;
  }

  private static connectInlineListener() {
    mountHTMLElement('script', document.body, {
      attributes: {
        src: getWebAccessibleUrl(microsoftSentinelInline),
        type: 'text/javascript',
        'data-type': 'inline-listener',
      },
    });
  }

  private static setListeners() {
    (addListener as MessageListener)(
      ListenerType.OnMessage,
      async (message) => {
        if (
          !contentPlatformIDFromENV
          && !document.querySelector('la-main-view')
        ) {
          return;
        }

        const query = `script[src$="${microsoftSentinelInline}"]`;

        if (!document.querySelector(query)) {
          MicrosoftSentinelPlatform.connectInlineListener();
          await waitHTMLElement(query);
        }

        AbstractContentPlatform.processInlineListeners(message);
      },
    );

    loggers.debug().log('listeners were set');
  }

  connect() {
    MicrosoftSentinelPlatform.setListeners();

    loggers.debug().log('connected');
  }
}

loggers = require('../../common/loggers').loggers
  .addPrefix(MicrosoftSentinelPlatform.id);
