import 'reflect-metadata';
import dotenv from 'dotenv';
import path from 'path';
import _ from 'lodash';

// Do NOT change this! Server always must be in the UTC timezone
process.env.TZ = 'UTC';

type ParsedEnvType = { [key: string]: string };

const parsedEnvFile = dotenv.config({
  path: path.normalize(`${__dirname}/../.env`),
}).parsed;
const localConfig: ParsedEnvType = parsedEnvFile || {};

const defaultConfig = dotenv.config({
  path: path.normalize(`${__dirname}/../default.env`),
}).parsed as ParsedEnvType;

const joinedConfig: ParsedEnvType = _.defaultsDeep(
  { ...localConfig },
  defaultConfig,
);

export const envTypes = {
  dev: 'development',
  test: 'test',
  stage: 'staging',
  prod: 'production',
};

const envType = process.env.NODE_ENV || joinedConfig.NODE_ENV;

export const isDev = envType === envTypes.dev;
export const isTest = envType === envTypes.test;

const logWarn = (...args: unknown[]) => {
  if (isTest) {
    return;
  }

  console.warn('\x1b[33m%s\x1b[0m', '   WARN: ', ...args);
};

if (!parsedEnvFile) {
  logWarn("You don't have a .env file.");
} else if (
  Object.keys(localConfig).length < Object.keys(defaultConfig).length
) {
  const localConfigFieldsCont = Object.keys(localConfig).length;
  const defaultConfigFieldsCont = Object.keys(defaultConfig).length;
  const missedFields = defaultConfigFieldsCont - localConfigFieldsCont;

  logWarn(`You have ${missedFields} missed fields in the .env file.`);
}

const config = {
  server: {
    port: +joinedConfig.SERVER_PORT,
    endpointsPrefix: joinedConfig.SERVER_ENDPOINTS_PREFIX,
    internalErrorMessage: joinedConfig.SERVER_INTERNAL_ERROR_MESSAGE,
    publicFolderName: joinedConfig.SERVER_PUBLIC_FOLDER_NAME,
    isCronJobsActive: joinedConfig.SERVER_IS_CRON_JOBS_ACTIVE,
    redisUrl: joinedConfig.REDIS_URL,
  },
  envType,
  urls: {
    current: joinedConfig.CURRENT_URL,
    clientUrl: joinedConfig.CLIENT_URL,
  },
  db: {
    host: joinedConfig.POSTGRES_DB_HOST,
    port: +joinedConfig.POSTGRES_DB_PORT,
    user: joinedConfig.POSTGRES_DB_USER,
    password: joinedConfig.POSTGRES_DB_PASSWORD,
    database: joinedConfig.POSTGRES_DB_NAME,
  },
  password: {
    hashSalt: joinedConfig.PASSWORD_HASH_SALT,
    hashType: joinedConfig.PASSWORD_HASH_TYPE,
  },
  query: {
    defaultPerPageCount: +joinedConfig.PER_PAGE_COUNT,
    maxPerPageCount: +joinedConfig.MAX_PER_PAGE_COUNT,
  },
  token: {
    secret: joinedConfig.TOKEN_SECRET,
    authExpiration: joinedConfig.TOKEN_AUTH_EXPIRATION,
    refreshExpiration: joinedConfig.TOKEN_REFRESH_EXPIRATION,
    tokenResetPasswordExpiration: joinedConfig.TOKEN_PASSWORD_RESET_EXPIRATION,
  },
  email: {
    transportUser: joinedConfig.EMAIL_TRANSPORT_USER,
    transportUserPassword: joinedConfig.EMAIL_TRANSPORT_USER_PASSWORD,
    transportService: joinedConfig.EMAIL_TRANSPORT_SERVICE,
  },
  aws: {
    maxFileSize: +joinedConfig.AWS_MAX_FILE_SIZE,
    region: joinedConfig.AWS_REGION,
    accessKey: joinedConfig.AWS_ACCESS_KEY,
    secretKey: joinedConfig.AWS_SECRET_KEY,
    bucketName: joinedConfig.AWS_BUCKET_NAME,
  },
};

export default config;
