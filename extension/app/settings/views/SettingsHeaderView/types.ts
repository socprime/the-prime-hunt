import { Page } from '../../../router/pages';

export type SettingsHeaderViewProps = {
  page: Extract<Page,
    'settings:integrations'
    | 'settings:mail'
  >
}
