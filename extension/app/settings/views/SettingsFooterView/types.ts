import { Page } from '../../../router/pages';

export type SettingsFooterViewProps = {
  page: Extract<Page,
    'settings:integrations'
    | 'settings:mail'
  >
}
