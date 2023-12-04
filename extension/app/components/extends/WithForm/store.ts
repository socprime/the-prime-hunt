import { makeObservable, observable } from 'mobx';
import { FormRefs } from './types';
import { getValidResult } from '../../../../../common/validators';

type ElementID = string;

export class WithFormStore {
  private refs: Map<ElementID, FormRefs> = new Map();

  @observable
  public validating = false;

  @observable
  public error: string | null = null;

  constructor() {
    makeObservable(this);
  }

  add(id: string, refs: FormRefs) {
    this.refs.set(id, refs);
  }

  remove(id: string) {
    this.refs.delete(id);
  }

  async validate(types: Parameters<Required<FormRefs>['validate']>[0]) {
    this.validating = true;
    const validators: Required<FormRefs>['validate'][] = [];
    this.refs.forEach((refs) => {
      validators.push(refs.validate || (() => {
        return Promise.resolve(getValidResult());
      }));
    });
    const results = await Promise.all(validators.map((validate) => validate(types)));
    const failed = results.filter((r) => !r.isValid);
    this.validating = false;
    this.error = failed.length
      ? Array.from(failed[0].reasons)[0]
      : null;
    return !failed.length;
  }

  getFormData() {
    const data: Record<string, unknown> = {};
    this.refs.forEach((refs) => {
      const name = (refs.elementRef?.current as any)?.name;
      const value = refs.getValue?.(refs?.elementRef);
      if (name) {
        data[name] = value;
      }
    });
    return data;
  }
}
