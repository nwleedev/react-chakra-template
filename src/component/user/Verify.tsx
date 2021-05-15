import { Button } from '@chakra-ui/button';
import { Input } from '@chakra-ui/input';
import { Box, Heading } from '@chakra-ui/layout';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useHistory, useLocation } from 'react-router';
import { useBasicInput } from '../../hook/basic-input';

export const VerifyEmail = () => {
  const history = useHistory();
  const location = useLocation();
  const [type, setType] = useState('');
  const [isSent, setIsSent] = useState(false);
  const { clear: clearEmail, ...email } = useBasicInput();
  const { clear: clearToken, ...token } = useBasicInput();

  useEffect(() => {
    const verifyUrl = location.pathname;
    if (verifyUrl.includes('signup')) {
      setType('SIGNUP');
      return;
    } else if (verifyUrl.includes('password')) {
      setType('RESET');
      return;
    } else {
      history.push('/');
    }
  }, [location, history]);

  const handleSendEmail = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const resp = await axios.post('http://localhost:5000/user/token/email', {
        email: email.value,
        type,
      });
      const data = resp.data;
      console.log(data);
      setIsSent(true);
    } catch (err) {
      console.log(err);
      return;
    }
  };
  const handleVerifyEmail = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const resp = await axios.post(
        'http://localhost:5000/user/token/verify-email',
        {
          email: email.value,
          token: token.value,
        },
      );
      const data = resp.data;
      console.log(data);
      history.replace(
        type === 'SIGNUP' ? '/signup/register' : '/password/reset',
        {
          targetEmail: email.value,
        },
      );
    } catch (err) {
      console.log(err);
      clearEmail();
      clearToken();
      history.go(0);
      return;
    }
  };
  return (
    <Box>
      <form onSubmit={handleSendEmail}>
        <Heading marginY="2">Verify E-Mail</Heading>
        <label htmlFor="email">
          <Heading fontSize="sm" marginTop="4">
            Input E-Mail
          </Heading>
        </label>
        <Input
          size="sm"
          id="email"
          type="email"
          minLength={8}
          marginTop="2"
          {...email}
        />
        <Button marginY="2" type="submit" colorScheme="blue" size="sm">
          Send Token
        </Button>
      </form>
      {isSent && (
        <>
          <form onSubmit={handleVerifyEmail}>
            <label htmlFor="token">
              <Heading fontSize="sm" marginTop="4">
                Input E-Mail
              </Heading>
            </label>
            <Input size="sm" id="token" type="text" marginTop="2" {...token} />
            <Button marginY="2" type="submit" colorScheme="red" size="sm">
              Verify Token
            </Button>
          </form>
        </>
      )}
    </Box>
  );
};
