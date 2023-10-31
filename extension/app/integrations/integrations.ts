/* eslint-disable camelcase */
import { Integration } from './integrations-types';

export const version__1_2_5: Integration[] = [
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

export const version__1_3_1: Integration[] = [
  {
    id: 'abuse-ipdb',
    name: 'AbuseIPDB',
    url: 'https://www.abuseipdb.com/check/$VALUE$',
  },
  {
    id: 'url-haus',
    name: 'URLhaus (by Abuse.ch)',
    url: 'https://urlhaus.abuse.ch/browse.php?search=$VALUE$',
  },
  {
    id: 'malware-bazaar-md5',
    name: 'MalwareBazaar MD5 (by Abuse.ch)',
    url: 'https://bazaar.abuse.ch/browse.php?search=md5:$VALUE$',
  },
  {
    id: 'malware-bazaar-sha256',
    name: 'MalwareBazaar SHA256 (by Abuse.ch)',
    url: 'https://bazaar.abuse.ch/browse.php?search=sha256:$VALUE$',
  },
  {
    id: 'threat-fox-iocs',
    name: 'ThreatFox IOCs (by Abuse.ch)',
    url: 'https://threatfox.abuse.ch/browse.php?search=ioc:$VALUE$',
  },
  {
    id: 'feodo-tracker-c&c',
    name: 'FeodoTracker C&C (by Abuse.ch)',
    url: 'https://feodotracker.abuse.ch/browse.php?search=$VALUE$',
  },
  {
    id: 'shodan',
    name: 'Shodan',
    url: 'https://www.shodan.io/search?query=$VALUE$',
  },
];

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
  ...version__1_2_5,
  ...version__1_3_1,
];
