type IntegrationID = 'virus-total'
| 'virus-total-enterprise'
| 'anomali'
| 'open-cti'
| '$echo-trail'
| '$ultimate-windows-security';

export type Integration = {
  id: IntegrationID | string;
  name: string;
  url: string;
};
