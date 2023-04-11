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
  {
    id: '$echo-trail',
    name: 'EchoTrail',
    url: 'https://www.echotrail.io/insights/search/$VALUE$',
  },
  {
    id: '$ultimate-windows-security',
    name: 'Ultimate Windows Security',
    url: 'https://www.ultimatewindowssecurity.com/securitylog/encyclopedia/event.aspx?eventid=$VALUE$',
  },
  {
    id: '$cyber-chef$',
    name: 'CyberChef',
    url: 'https://gchq.github.io/CyberChef/#input=$BASE64-VALUE$',
  },
  {
    id: '$cyber-chef-magic$',
    name: 'CyberChef (Magic)',
    url: 'https://gchq.github.io/CyberChef/#recipe=Magic(3,false,false,\'\')&input=$BASE64-VALUE$',
  },
];
