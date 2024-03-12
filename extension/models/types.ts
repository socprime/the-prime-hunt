import { CallBackMessagePayload } from '../common/types/types-common-payloads';
import { AsyncResult } from '../../common/types';

export interface AbstractModel {
  doBackground(payload: CallBackMessagePayload): Promise<AsyncResult>;
}
