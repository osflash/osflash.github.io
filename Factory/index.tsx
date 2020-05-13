export interface Factory {
  start: Function;
  stop: Function;
}

const createMock = (): Factory => {
  return {
    start: (): void => {
      console.log('> [mock] ...');
    },
    stop: (): void => {
      console.log('> [mock] ...');
    },
  };
};

const createDatabaseConnection = (): Factory => {
  return {
    start: (): void => {
      console.log('> [database] Stating...');
      console.log('> [database] Connecting to Postgres...');
      console.log('> [database] Running migrations...');
      console.log('> [database] Starting done!');
    },
    stop: (): void => {
      console.log('> [database] Stopping...');
      console.log('> [database] Closing Postgres connection...');
      console.log('> [database] Stopping done!');
    },
  };
};

const createWebserver = (): Factory => {
  return {
    start: (): void => {
      console.log('> [webserver] Stating...');
      console.log('> [webserver] Waiting for port to be available...');
      console.log('> [webserver] Starting done!');
    },
    stop: (): void => {
      console.log('> [webserver] Stopping...');
      console.log('> [webserver] Gracefully waiting for all clients...');
      console.log('> [webserver] Closing all ports...');
      console.log('> [webserver] Stopping done!');
    },
  };
};

type configurations = {
  database?: Factory;
  webserver?: Factory;
};

const createCore = (configurations: configurations = {}): Factory => {
  const database = configurations.database || createDatabaseConnection();
  const webserver = configurations.webserver || createWebserver();

  return {
    start: (): void => {
      console.log('> [core] Stating...');
      database.start();
      webserver.start();
      console.log('> [core] Starting done! System running!');
    },
    stop: (): void => {
      console.log('> [core] Stopping...');
      webserver.stop();
      database.stop();
      console.log('> [core] Stopping done!');
    },
  };
};

const init = (): void => {
  const core = createCore();

  try {
    core.start();
    core.stop();
  } catch (error) {
    console.log('[index] Uncaught error!');
    console.log(error);
  }
};

export {
  init,
  createMock,
  createCore,
  createWebserver,
  createDatabaseConnection,
};
