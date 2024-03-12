export const getMessagePrefix = () => '#';

export const logRegularInfoMessage = (message: string) => {
  logInfoMessage(message, '>>');
};

export const isByPass = () => (window as any).byPassTests;

export const logInfoMessage = (message: string, prefix = '') => {
  console.log(
    `[INFO]: ${prefix || getMessagePrefix()}${message}`,
  );
  return message;
};

export const logWarningMessage = (message: string, prefix = '') => {
  console.warn(
    `[SUCCESS]: ${prefix || getMessagePrefix()}${message}`,
  );
  return message;
};

export const logErrorMessage = (message: string, prefix = '') => {
  console.error(
    `[ERROR]: ${prefix || getMessagePrefix()}${message}`,
  );
  return message;
};

export const testCase = (caseName: string, showSuccessMessage = true) => {
  return {
    expect: (value: unknown) => {
      return {
        toEqual: (v: unknown) => {
          if (isByPass()) {
            console.log(`[ByPass]: #${caseName}: >${value}<`);
            return;
          }
          console.log(`[toEqual]: ${caseName}\r\npassed value:\r\n>${String(value)}<`);
          if (v !== value) {
            logErrorMessage(caseName);
            throw new Error(
              logErrorMessage(`\r\n>${String(value)}<\r\n<NOT EQUAL>\r\n>${String(v)}<`),
            );
          }
          if (showSuccessMessage) {
            logWarningMessage(caseName);
          }
        },
      };
    },
  };
};
