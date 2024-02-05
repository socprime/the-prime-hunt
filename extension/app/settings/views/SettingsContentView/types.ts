import { Page } from '../../../router/pages';

export type SettingsContentViewProps = {
  page: Extract<Page,
    'settings:integrations'
    | 'settings:mail'
  >
}
