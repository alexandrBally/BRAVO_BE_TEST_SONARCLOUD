import dataSource from '../typeormconfig';
import generateAsciiString from '../../utils/generateAsciiString';

const connectToDb = async () => {
  try {
    const connection = await dataSource.initialize();

    await generateAsciiString('DB connected', {
      color: 'blue',
      font: 'small',
      immediateLog: true,
      topGap: true,
    });

    process.on('SIGINT', async () => {
      if (!connection.isInitialized) {
        return;
      }
      await connection.destroy();
      console.info(
        'DB connection is disconnected due to application termination',
      );
      process.exit(0);
    });

    return connection;
  } catch (err) {
    console.error('DB connection error: ', err.message);
    process.exit(1);
  }
};

export default connectToDb;
