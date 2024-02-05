import { FC } from 'react';
import SimpleBar from 'simplebar-react';
import { observer } from 'mobx-react-lite';
import { useMail, useRouter } from '../../../stores';
import { sortStrings } from '../../../../../common/helpers';
import { SettingsArea } from '../../../settings/SettingsArea';
import './styles.scss';

export const MailsContentView: FC = observer(() => {
  const mail = useMail();
  const router = useRouter();

  const patternsIDs = Object.keys(mail.patterns);

  return (
    <SimpleBar className="mails-content-view">
      {
        patternsIDs
          .slice()
          .sort((a, b) => sortStrings(
            mail.patterns[b].name,
            mail.patterns[a].name,
            'descending',
          ))
          .map((key) => {
            const pattern = mail.patterns[key];
            return (
              <SettingsArea
                key={pattern.id}
                id={pattern.id}
                name={pattern.name}
                onClick={() => {
                  mail.pattern = pattern;
                  router.goToMailPage(pattern);
                }}
              />
            );
          })
      }
      {patternsIDs.length < 1 && (
        <div>
          There are no mail patterns configured yet
        </div>
      )}
    </SimpleBar>
  );
});
