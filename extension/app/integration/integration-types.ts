export type IntegrationID = 'virus-total'
  | 'virus-total-enterprise'
  | 'anomali'
  | 'open-cti'
  | '$echo-trail'
  | '$ultimate-windows-security'
  | '$cyber-chef$'
  | '$open-cti$'
  | '$cyber-chef-magic$'
  | 'abuse-ipdb'
  | 'url-haus'
  | 'malware-bazaar-md5'
  | 'malware-bazaar-sha256'
  | 'threat-fox-iocs'
  | 'feodo-tracker-c&c'
  | 'shodan';

export type Integration = {
  id: IntegrationID;
  name: string;
  url: string;
};
