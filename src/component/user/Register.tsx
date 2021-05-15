import { Button } from '@chakra-ui/button';
import { Input } from '@chakra-ui/input';
import { Box, Heading } from '@chakra-ui/layout';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useHistory, useLocation } from 'react-router';
import { useBasicInput } from '../../hook/basic-input';

export const Register = () => {
  const [email, setEmail] = useState('');
  const { clear: clearUsername, ...username } = useBasicInput();
  const { clear: clearPassword, ...password } = useBasicInput();
  const { clear: clearPasswordConfirm, ...passwordConfirm } = useBasicInput();
  const history = useHistory();
  const location = useLocation();
  useEffect(() => {
    const { targetEmail } = location.state as { targetEmail: string };
    if (!targetEmail) {
      history.replace('/signup/verify');
      return;
    }
    setEmail(targetEmail);
  }, [history, location]);
  const handleSignUp = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const resp = await axios.post('http://localhost:5000/user/signup', {
        email,
        username: username.value,
        password: password.value,
        passwordConfirm: passwordConfirm.value,
      });
      const data = resp.data;
      console.log(data);
      history.replace('/signin');
    } catch (err) {
      clearUsername();
      clearPassword();
      clearPasswordConfirm();
      console.log(err);
      return;
    }
  };
  return (
    <Box>
      <form onSubmit={handleSignUp}>
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
        <label htmlFor="username">
          <Heading fontSize="sm" marginTop="4">
            Username
          </Heading>
        </label>
        <Input
          {...username}
          type="text"
          id="username"
          marginTop="2"
          minLength={4}
          maxLength={12}
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
          Sign UP
        </Button>
      </form>
    </Box>
  );
};
