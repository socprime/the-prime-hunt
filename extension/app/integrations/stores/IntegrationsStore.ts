import { computed, makeObservable, observable } from 'mobx';
import { Integration } from '../integrations-types';
import { formatString } from '../../../../common/helpers';
import { getIntegrations, restoreIntegrations, setIntegrations } from '../../../common/local-storage';

export class IntegrationsStore {
  @observable
  public integrations: Integration[] = [];

  @computed
  public get emptyIntegration() {
    return this.integrations.some(i => !i.name || !i.url);
  }

  private set() {
    this.integrations = getIntegrations();
  }

  constructor() {
    this.set();
    makeObservable(this);
  }

  save() {
    setIntegrations(this.integrations);
  }

  restoreIntegrations() {
    this.integrations = restoreIntegrations();
  }

  getReadyUrls(
    values: string[],
    url: string,
  ): string[] {
    const formatValue = (v: string) => `\\$${v}\\$`;

    if (url.indexOf('$BASE64-VALUE$') > -1) {
      return values.map(value => {
        const hash = btoa(value)
          .replace(/=+/g, '');

        return encodeURI(
          formatString(url, { 'BASE64-VALUE': hash }, formatValue),
        );
      });
    }

    if (url.indexOf('$BASE64-VALUES$') > -1) {
      const hash = btoa(values.join(','))
        .replace(/=+/g, '');

      return [
        encodeURI(formatString(url, { 'BASE64-VALUES': hash }, formatValue)),
      ];
    }

    if (url.indexOf('$VALUES$') > -1) {
      return [
        encodeURI(formatString(url, { VALUES: values.join(',') }, formatValue)),
      ];
    }

    return values.map(value => {
      return encodeURI(formatString(url, { VALUE: value }, formatValue));
    });
  }
}
