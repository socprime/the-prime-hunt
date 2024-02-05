import { computed, makeObservable, observable } from 'mobx';
import { RootStore } from '../../stores/RootStore';
import { Mail } from '../mail-types';
import { buildEmailUrl, formatString, suuid } from '../../../../common/helpers';
import { mailGroupName, setMailData, setMailsData } from '../mail-store';

export class MailStore {
  private readonly rootStore: RootStore;

  @computed
  public get patterns(): {
    [patternID: string]: Mail;
    } {
    return {
      ...((this.rootStore.appStorageStore.storage as any)?.[mailGroupName] || {}),
    };
  }

  @observable
  public pattern: Mail | null = null;

  getInitialPattern(): Mail {
    return {
      id: suuid(),
      name: 'Custom',
      to: [],
      message: '',
      cc: [],
      subject: '',
    };
  }

  putPattern(mail: Mail) {
    this.pattern = mail;
    setMailData(
      mail.id,
      mail,
    );
  }

  removePatternById(id?: string) {
    if (!id) {
      return;
    }
    delete this.patterns[id];
    const newPatterns = {
      ...this.patterns,
    };
    setMailsData(newPatterns)
      .then(() => setTimeout(() => {
        if (id === this.pattern?.id) {
          this.pattern = null;
        }
      }, 0));
  }

  getPatternById(id?: string): Mail | null {
    if (!id) {
      return null;
    }
    return this.patterns?.[id] || null;
  }

  constructor(rootStore: RootStore) {
    this.rootStore = rootStore;
    makeObservable(this);
  }

  public static buildMailTo(pattern: Mail): string {
    return buildEmailUrl({
      cc: pattern.cc,
      body: pattern.message
        .replace(/(\r\n|\n|\r)/gm, '%0A')
        .replace(/&/gm, '%26'),
      to: pattern.to,
      subject: pattern.subject,
    });
  }

  public buildMailTo(pattern: Mail) {
    return MailStore.buildMailTo(pattern);
  }

  public buildMailToWithMarkers(
    pattern: Mail,
    markers?: {
      'iocs': string[];
    },
  ): string {
    const copyPattern = JSON.parse(JSON.stringify(pattern));
    return MailStore.buildMailTo({
      ...copyPattern,
      message: formatString(copyPattern.message, {
        iocs: markers?.iocs?.map((v) => `- ${v}`)?.join('%0A'),
      }),
    });
  }
}
