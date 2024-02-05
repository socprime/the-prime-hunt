import { Mail } from './mail-types';

export const defaultPatterns: Mail[] = [
  {
    id: '$default$',
    message: `To whom it may concern,

I'm reaching out to inform you that the following Indicators of Compromise have been found in my organization's environment.
Rule Name: 
MITRE ATT&CK Techniques:
MITRE ATT&CK Groups:

List of IOCs:
%iocs

Best regards
{Your full name here}
{Your job title here}
{Your organization here}`.trim(),
    name: 'Send IOCs',
    subject: 'Informing about potential IOCs',
    cc: [],
    to: [],
  },
];
