import { Button } from '@chakra-ui/button';
import { Input } from '@chakra-ui/input';
import { Box, Heading } from '@chakra-ui/layout';
import axios from 'axios';
import React, { useContext } from 'react';
import { useHistory } from 'react-router';
import { UserContext } from '../../context/user';
import { useBasicInput } from '../../hook/basic-input';
import { AccessDenied } from '../invalid';

export const DeleteUser = () => {
  const user = useContext(UserContext);
  const history = useHistory();
  const { clear: clearPassword, ...password } = useBasicInput();
  const { clear: clearPasswordConfirm, ...passwordConfirm } = useBasicInput();
  const handleDeleteUser = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const accessToken = localStorage.getItem('accessToken');
    try {
      const resp = await axios.post(
        'http://localhost:5000/user/delete',
        {
          password: password.value,
          passwordConfirm: passwordConfirm.value,
        },
        {
          headers: {
            Authorization: 'Bearer ' + accessToken,
          },
        },
      );
      const data = resp.data;
      console.log(data);
      localStorage.removeItem('accessToken');
      localStorage.removeItem('none');
      alert('User Deleted');
      history.replace('/');
    } catch (err) {
      console.log(err);
      clearPassword();
      clearPasswordConfirm();
      return;
    }
  };
  if (!user) {
    return <AccessDenied />;
  }
  return (
    <Box>
      <Heading fontSize="2xl" marginY="2">
        Delete User
      </Heading>
      <Heading fontSize="sm" marginY="2" fontWeight="semibold" color="red.700">
        You can't sign up with same E-Mail again.
      </Heading>
      <Box
        border="2px"
        marginY="2"
        padding="4"
        borderColor="red.400"
        borderRadius="2xl"
      >
        <Heading marginY="2" fontSize="md">
          Fill in this form and press the button below.
        </Heading>
        <form onSubmit={handleDeleteUser}>
          <label htmlFor="password">
            <Heading fontSize="sm" marginTop="4">
              Password
            </Heading>
          </label>
          <Input
            {...password}
            type="password"
            id="password"
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
          <Button marginY="2" type="submit" colorScheme="red">
            Delete User
          </Button>
        </form>
      </Box>
    </Box>
  );
};
