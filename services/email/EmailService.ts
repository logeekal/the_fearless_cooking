import NodeMailer from 'nodemailer'
import Mail from 'nodemailer/lib/mailer'

export class EmailService {
  SMTP_HOST: string
  SMTP_PORT: string
  SMTP_USERNAME: string
  SMTP_PASSWORD: string
  transporter: NodeMailer.Transporter

  constructor() {
    this.SMTP_HOST = process.env.SMTP_HOST ?? ''
    this.SMTP_PORT = process.env.SMTP_PORT ?? ''
    this.SMTP_USERNAME = process.env.SMTP_USERNAME ?? ''
    this.SMTP_PASSWORD = process.env.SMTP_PASSWORD ?? ''

    if (
      !this.SMTP_HOST ||
      !this.SMTP_PORT ||
      !this.SMTP_USERNAME ||
      !this.SMTP_PASSWORD
    ) {
      throw new Error('One of the SMTP Params is missing or invalid')
    }

    this.transporter = NodeMailer.createTransport({
      // @ts-expect-error wrong typings
      host: this.SMTP_HOST,
      port: this.SMTP_PORT,
      secure: false,
      requireTLS: true,
      auth: {
        user: this.SMTP_USERNAME,
        pass: this.SMTP_PASSWORD,
      },
      logger: true,
      debug: process.env.NODE_ENV === 'development',
    })
  }

  async send(mailArgs: Mail.Options) {
    await this.transporter.sendMail({
      to: process.env.EMAIL_RECIPIENTS as string,
      from: {
        name: process.env.FROM_NAME as string,
        address: process.env.EMAIL_SENDER as string,
      },
      ...mailArgs,
    })
  }
}
