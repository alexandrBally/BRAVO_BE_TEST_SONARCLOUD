const addUnhandledRejectionHandler = () => {
  const handler = (
    err: Error & { isHandled?: boolean },
    origin: NodeJS.UncaughtExceptionOrigin,
  ) => {
    if (err.isHandled) {
      return;
    }

    console.error(
      '🚧 UnhandledPromiseRejectionWarning: Unhandled promise rejection 🚧',
      err,
      origin,
    );
  };

  process.on('uncaughtException', handler);
  process.on('unhandledRejection', handler);
};

export default addUnhandledRejectionHandler;
