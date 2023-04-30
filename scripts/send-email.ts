import Mail from 'nodemailer/lib/mailer'

import { EmailService } from '../services/email/EmailService'
import { logger } from '../utils/logger'

export function sendEmail(args: Mail.Options) {
  const emailService = new EmailService()

  const { subject, ...rest } = args

  emailService
    .send({
      subject: subject ?? ' Test Email',
      text: 'Heyyy',
      html: '<b> Heyyyy, this is the test email </b> ',
      ...rest,
    })
    .then(() => {
      logger.info('Successfully sent')
    })
    .catch((err) => {
      logger.error('Error in sending email', err)
    })
}
