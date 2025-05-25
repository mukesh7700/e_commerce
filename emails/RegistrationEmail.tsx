import { Html, Head, Preview, Body, Container, Heading, Text } from '@react-email/components';

interface RegistrationSuccessProps {
  username: string;
}

const RegistrationSuccess: React.FC<RegistrationSuccessProps> = ({ username }) => (
  <Html>
    <Head />
    <Preview>Welcome to our platform!</Preview>
    <Body style={main}>
      <Container style={container}>
        <Heading style={h1}>Welcome, {username}!</Heading>
        <Text style={text}>Your registration was successful. You can now log in and start using our services.</Text>
        <Text style={text}>If you have any questions, feel free to contact us at support@example.com.</Text>
      </Container>
    </Body>
  </Html>
);

const main = { backgroundColor: '#f6f6f6', padding: '20px' };
const container = { backgroundColor: '#ffffff', padding: '20px', borderRadius: '5px' };
const h1 = { color: '#333333', fontSize: '24px' };
const text = { color: '#666666', fontSize: '16px' };

export default RegistrationSuccess;
