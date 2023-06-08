import crypto from 'crypto';

import config from '../config';

class Password {
  static hash = (password: string) => {
    const hashedPassword = crypto
      .createHmac(config.password.hashType, config.password.hashSalt)
      .update(password)
      .digest('hex');

    return hashedPassword;
  };

  static compare = (password: string, hashedPassword: string) => {
    return this.hash(password) === hashedPassword;
  };
}

export default Password;
