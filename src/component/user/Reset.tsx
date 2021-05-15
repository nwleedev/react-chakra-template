import { Button } from '@chakra-ui/button';
import { Input } from '@chakra-ui/input';
import { Box, Heading } from '@chakra-ui/layout';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useHistory, useLocation } from 'react-router';
import { useBasicInput } from '../../hook/basic-input';

export const PasswordReset = () => {
  const [email, setEmail] = useState('');
  const { clear: clearPassword, ...password } = useBasicInput();
  const { clear: clearPasswordConfirm, ...passwordConfirm } = useBasicInput();
  const history = useHistory();
  const location = useLocation();
  useEffect(() => {
    const { targetEmail } = location.state as { targetEmail: string };
    if (!targetEmail) {
      alert('Email Verification Please');
      history.replace('/password/verify');
      return;
    }
    setEmail(targetEmail);
  }, [history, location]);
  const handleResetPassword = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const resp = await axios.post(
        'http://localhost:5000/user/password/reset',
        {
          email,
          password,
          passwordConfirm,
        },
      );
      const data = resp.data;
      console.log(data);
      alert('Password Reset Complete');
      history.replace('/');
    } catch (err) {
      console.log(err);
      history.replace('/password/verify');
    }
  };
  return (
    <Box>
      <form onSubmit={handleResetPassword}>
        <label htmlFor="email">
          <Heading fontSize="sm" marginTop="4">
            E-Mail
          </Heading>
        </label>
        <Input
          value={email}
          onChange={() => null}
          type="email"
          id="email"
          marginTop="2"
          minLength={8}
        />
        <label htmlFor="password">
          <Heading fontSize="sm" marginTop="4">
            Password
          </Heading>
        </label>
        <Input
          {...password}
          type="password"
          id="passwordConfirm"
          marginTop="2"
          minLength={8}
        />
        <label htmlFor="passwordConfirm">
          <Heading fontSize="sm" marginTop="4">
            Password Confirm
          </Heading>
        </label>
        <Input
          {...passwordConfirm}
          type="password"
          id="passwordConfirm"
          marginTop="2"
          minLength={8}
        />
        <Button type="submit" colorScheme="red" size="sm" marginTop="2">
          Reset Password
        </Button>
      </form>
    </Box>
  );
};
