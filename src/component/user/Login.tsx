import { Button } from '@chakra-ui/button';
import { LockIcon } from '@chakra-ui/icons';
import { Input } from '@chakra-ui/input';
import { Box, Heading } from '@chakra-ui/layout';
import axios from 'axios';
import React, { useContext } from 'react';
import { useHistory } from 'react-router';
import { Link } from 'react-router-dom';
import { UserContext } from '../../context/user';
import { useBasicInput } from '../../hook/basic-input';
import { ILoginResponse } from '../../interface/auth';

export const SignIn = () => {
  const history = useHistory();
  const { setUser } = useContext(UserContext)!;
  const { clear: clearEmail, ...email } = useBasicInput();
  const { clear: clearPassword, ...password } = useBasicInput();
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    try {
      e.preventDefault();
      const resp = await axios.post(
        'http://localhost:5000/user/signin',
        {
          email: email.value,
          password: password.value,
        },
        {
          headers: {
            'content-type': 'application/json',
          },
        },
      );
      const {
        user,
        tokens: { accessToken, none },
      }: ILoginResponse = resp.data;
      setUser(user);
      localStorage.setItem('accessToken', accessToken);
      localStorage.setItem('none', none);
      history.replace('/');
    } catch (err) {
      console.log(err);
      return;
    }
  };
  return (
    <Box>
      <form onSubmit={handleSubmit}>
        <Heading marginY="2">Sign In</Heading>
        <label htmlFor="email">
          <Heading fontSize="sm" marginTop="4">
            E-Mail
          </Heading>
        </label>
        <Input
          size="sm"
          id="email"
          type="email"
          {...email}
          minLength={8}
          marginTop="2"
        />
        <label htmlFor="password">
          <Heading fontSize="sm" marginTop="4">
            Password
          </Heading>
        </label>
        <Input
          size="sm"
          id="password"
          type="password"
          marginTop="2"
          {...password}
          minLength={8}
        />
        <Button marginY="2" type="submit" rightIcon={<LockIcon />}>
          Sign In
        </Button>
      </form>
      <hr />
      <Heading fontSize="sm" marginTop="4" color="green.700">
        Create A New Account?
      </Heading>
      <Link to="/signup/verify">
        <Button type="button" size="sm" marginTop="2" colorScheme="green">
          Sign Up
        </Button>
      </Link>
      <Heading fontSize="sm" marginTop="4" color="red.600">
        Or Reset Your Password?
      </Heading>
      <Link to="/password/verify">
        <Button type="button" size="sm" marginTop="2" colorScheme="red">
          Reset Password
        </Button>
      </Link>
    </Box>
  );
};
