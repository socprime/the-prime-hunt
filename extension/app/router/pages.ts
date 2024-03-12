export type SettingsPage =
  | 'settings:integrations'
  | 'settings:mail'
  | 'settings:socprime';

export type SocPrimePage =
  | 'socprime:save-query';

export type ResourcesPage =
  | 'resources'
  | 'resources:query'

export type Page =
  | SettingsPage
  | SocPrimePage
  | ResourcesPage
  | 'not-found'
  | 'export'
  | 'integration'
  | 'mail'
  | 'faq';
