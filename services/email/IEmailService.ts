type SendArgs = {
  subject: string
  to: string
  body: string
}

export interface IEmailService {
  send(args: SendArgs): void
}
