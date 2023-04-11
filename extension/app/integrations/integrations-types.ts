type IntegrationID = 'virus-total'
| 'virus-total-enterprise'
| 'anomali'
| 'open-cti'
| '$echo-trail'
| '$ultimate-windows-security'
| '$cyber-chef$'
| '$cyber-chef-magic$';

export type Integration = {
  id: IntegrationID;
  name: string;
  url: string;
};
