export const getMessagePrefix = () => '#';

export const logSuccessMessage = (message: string) => {
  console.warn(
    `[SUCCESS]: ${getMessagePrefix()}${message}`,
  );
  return message;
};

export const logErrorMessage = (message: string) => {
  console.error(
    `[ERROR]: ${getMessagePrefix()}${message}`,
  );
  return message;
};

export const testCase = (caseName: string, showSuccessMessage = true) => {
  return {
    expect: (value: unknown) => {
      return {
        toEqual: (v: unknown) => {
          console.log(`[toEqual]: ${caseName}\r\npassed value:\r\n>${String(value)}<`);
          if (v !== value) {
            logErrorMessage(caseName);
            throw new Error(
              logErrorMessage(`\r\n>${String(value)}<\r\n<NOT EQUAL>\r\n>${String(v)}<`),
            );
          }
          if (showSuccessMessage) {
            logSuccessMessage(caseName);
          }
        },
      };
    },
  };
};

