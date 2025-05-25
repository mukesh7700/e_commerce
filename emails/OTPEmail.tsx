import { Html, Head, Preview, Body, Container, Heading, Text, Row, Column } from '@react-email/components';

interface OTPVerificationProps {
  email: string;
  otp: string;
}

const OTPEmail : React.FC<OTPVerificationProps> = ({ email, otp }) => (
  <Html>
    <Head />
    <Preview>Verify your email address</Preview>
    <Body style={main}>
      <Container style={container}>
        <Heading style={h1}>Reset your password</Heading>
        <Text style={text}>We received a request to reset your password to your account {email}</Text>
        <Text>Use the code below to set up a new password:</Text>
        <Row >
            <Column>
            <Text style={row}>{otp}</Text>
            </Column>
        </Row>
        <Text style={text}>Please make sure you never share this code with anyone.</Text>
        <Text style={text}>Note: The code will expire in 3 minutes.</Text>
        <Text style={text}>If you did not make this request, please ignore this email. Your account remains safe and your current password will not be changed.</Text>
        <Text style={text2}>Warm regards,</Text>
        <Text style={text2}>Jamsrworld Team</Text>
      </Container>
    </Body>
  </Html>
);

const main = { backgroundColor: '#f6f6f6', padding: '20px' };
const container = { backgroundColor: '#ffffff', padding: '20px', borderRadius: '5px' };
const h1 = { color: '#333333', fontSize: '24px' };
const text = { color: '#666666', fontSize: '16px' };
const text2 = { color: '#666668', fontSize: '16px', fontWeight:'bold' };
const row = {
  backgroundColor: '#f6f6f6',
  padding: '10px',
  borderRadius: '5px',
  textAlign: 'center' as React.CSSProperties['textAlign'],
  fontSize: '20px',
  color: '#333333',
  fontWeight: 'bold'
};
export default OTPEmail ;
