import {
  Body,
  Button,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Img,
  Link,
  Preview,
  pixelBasedPreset,
  Section,
  Tailwind,
  Text,
} from '@react-email/components'

export interface ByteEventsInviteEmailProps {
  username?: string
  invitedByUsername?: string
  invitedByEmail?: string
  eventName?: string
  inviteLink?: string
}

export const ByteEventsInviteEmail = ({
  username,
  invitedByUsername,
  invitedByEmail,
  eventName,
  inviteLink,
}: ByteEventsInviteEmailProps) => {
  const previewText = `Você foi convidado para o evento ${eventName} da ByteEvents!`

  return (
    <Html>
      <Head />
      <Tailwind
        config={{
          presets: [pixelBasedPreset],
        }}
      >
        <Body className="mx-auto my-auto bg-white px-2 font-sans">
          <Preview>{previewText}</Preview>
          <Container className="mx-auto my-[40px] max-w-[465px] rounded border border-[#eaeaea] p-[20px]">
            <Section className="mt-[32px] text-center">
              <Img
                src={
                  'https://react-email-demo-gdrzm5pdu-resend.vercel.app/static/vercel-logo.png'
                }
                width="60"
                height="60"
                alt="ByteEvents Logo"
                className="mx-auto my-0"
              />
            </Section>
            <Heading className="mx-0 my-[30px] text-center font-normal text-[24px] text-black">
              Olá <strong>{username}</strong>, você foi convidado para o evento{' '}
              <strong>{eventName}</strong>
            </Heading>
            <Text className="text-[14px] text-black leading-[24px]">
              <strong>{invitedByUsername}</strong> (
              <Link
                href={`mailto:${invitedByEmail}`}
                className="text-blue-600 no-underline"
              >
                {invitedByEmail}
              </Link>
              ) convidou você para participar do evento de tecnologia{' '}
              <strong>{eventName}</strong> da comunidade ByteEvents.
            </Text>

            <Section className="mt-[32px] mb-[32px] text-center">
              <Button
                className="rounded bg-[#000000] px-5 py-3 text-center font-semibold text-[14px] text-white no-underline"
                href={inviteLink}
              >
                Confirmar Presença
              </Button>
            </Section>
            <Text className="text-[14px] text-black leading-[24px] text-center">
              ou copie e cole este link no navegador:{' '}
              <Link href={inviteLink} className="text-blue-600 no-underline">
                {inviteLink}
              </Link>
            </Text>
            <Hr className="mx-0 my-[26px] w-full border border-[#eaeaea]" />
          </Container>
        </Body>
      </Tailwind>
    </Html>
  )
}

export default ByteEventsInviteEmail
