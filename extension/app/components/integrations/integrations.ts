import { Integration } from './integrations-types';

export const integrations: Integration[] = [
  {
    id: 'virus-total',
    name: 'VirusTotal',
    url: 'https://www.virustotal.com/gui/search/$VALUE$',
  },
  {
    id: 'virus-total-enterprise',
    name: 'VirusTotal Enterprise',
    url: 'https://www.virustotal.com/gui/search/$VALUES$',
  },
  {
    id: 'anomali',
    name: 'Anomali',
    url: 'https://ui.threatstream.com/search?status=active&multiSearchResults=true&value__re=.*$VALUE$.*',
  },
  {
    id: 'open-cti',
    name: 'OpenCTI',
    url: 'https://HOSTNAME:PORT/dashboard/observations/indicators?sortBy=created&orderAsc=false&searchTerm=$VALUE$',
  },
];
