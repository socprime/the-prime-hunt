import React, { useMemo } from 'react';
import { Spacer } from '../../../components/atoms/Spacer/Spacer';
import { AppCollapsible } from '../../../components/collapsibles/AppCollapsible/AppCollapsible';
import { List } from '../../../components/atoms/List/List';
import SimpleBar from 'simplebar-react';
import { AppLink } from '../../../components/links/AppLink/AppLink';
import './styles.scss';

export const FaqContentView: React.FC = () => {
  const items: {
    title: string;
    content: React.ReactNode;
  }[] = useMemo(() => {
    return [
      {
        title: 'What security platforms are supported?',
        content: [
          'We are hard at work adding support for other platforms. Current list of supporting platforms you can see on our Readme page at requirements section: ',
          <AppLink key="readme" target="_blank" href="https://github.com/socprime/the-prime-hunt/blob/master/README.md">github/readme</AppLink>,
        ],
      },
      {
        title: 'How can I give feedback or get help?',
        content: [
          'If you have any questions, would like to give feedback, or need help, contact us at ',
          <AppLink key="email" href="mailto:support@socprime.com">support@socprime.com</AppLink>,
        ],
      },
      {
        title: 'How do you handle my data?',
        content: 'The Prime Hunt browser extension does not send any data outside your laptop/browser. It works only with the data that is on the page of your browser.',
      },
      {
        title: 'Can I add custom fields to the results?',
        content: [
          'Yes, you can add any fields to the results in the extension. To add a field, click the plus icon next to the Fields label, enter the field name exactly as it appears in your SIEM/EDR/XDR, and click the checkmark icon. To remove a field from the extension, click on the remove icon next to the field. You can also get more information about it from our Readme page: ',
          <AppLink key="readme" target="_blank" href="https://github.com/socprime/the-prime-hunt/blob/master/README.md">github/readme</AppLink>,
        ],
      },
      {
        title: 'Can I customize Search At models?',
        content: (
          <div>
            Yes, you can, just click on Integration settings button placed on header of the extension. On the following page you can:
            <List items={[
              {
                id: '1',
                content: 'Customize the name and URL for any existing integration',
              },
              {
                id: '2',
                content: (
                  <div>
                    Define behavior for opening multiple results:
                    <List items={[
                      {
                        id: '1',
                        content: '$VALUE$: each result is opened in a separate new tab',
                      },
                      {
                        id: '2',
                        content: '$VALUES$: all results are opened in a single new tab',
                      },
                    ]} />
                  </div>
                ),
              },
              {
                id: '3',
                content: 'Replace the HOSTNAME:PORT placeholder in the OpenCTI integration URL with the hostname and port of your account to use the OpenCTI integration',
              },
              {
                id: '4',
                content: 'Add a new integration or remove an existing one',
              },
            ]} />
          </div>
        ),
      },
      {
        title: 'Can I reset the extension position to default?',
        content: 'Yes, you should remove "the-prime-hunt--extension--position" key in your browser\'s local storage and restart the browser page',
      },
      {
        title: 'Can I reset the watchers fields list to default?',
        content: 'Yes, you should remove "the-prime-hunt--extension--watchers" key in your browser\'s local storage and restart the browser page',
      },
    ];
  }, []);

  return (
    <SimpleBar className="faq-content-view">
      {items.map(({ content, title }, index) => {
        return (
          <AppCollapsible header={title} key={title} open={index === 0}>
            <div>
              <Spacer height={4} />
              {content}
              <Spacer height={14} />
            </div>
          </AppCollapsible>
        );
      })}
    </SimpleBar>
  );
};
