import nodemailer, { Transporter } from 'nodemailer';

import config from '../../config';

let transporter: Transporter = null;

const getEmailTransport = () => {
  if (!transporter) {
    transporter = nodemailer.createTransport({
      service: config.email.transportService,
      port: 587,
      secure: false,
      auth: {
        user: config.email.transportUser,
        pass: config.email.transportUserPassword,
      },
    });
  }
  return transporter;
};

export default getEmailTransport;
