export const getMockedBrowserContext = () => ({
  runtime: {
    onMessage: {
      addListener: () => {},
    },
    sendMessage: () => {},
  },
});