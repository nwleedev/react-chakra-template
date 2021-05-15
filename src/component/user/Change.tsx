import { Button } from '@chakra-ui/button';
import { Input } from '@chakra-ui/input';
import { Box, Heading } from '@chakra-ui/layout';
import axios from 'axios';
import { useContext } from 'react';
import { useHistory } from 'react-router';
import { UserContext } from '../../context/user';
import { useBasicInput } from '../../hook/basic-input';
import { AccessDenied } from '../invalid';

export const PasswordChange = () => {
  const user = useContext(UserContext);
  const { clear: clearPassword, ...password } = useBasicInput();
  const { clear: clearPasswordConfirm, ...passwordConfirm } = useBasicInput();
  const history = useHistory();
  const handleChangePassword = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const accessToken = localStorage.getItem('accessToken');
    try {
      const resp = await axios.post(
        'http://localhost:5000/user/password/change',
        {
          password: password.value,
          passwordConfirm: password.value,
        },
        {
          headers: {
            Authorization: 'Bearer ' + accessToken,
          },
        },
      );
      const data = await resp.data;
      console.log(data);
      alert('Password Changed');
      history.push('/');
    } catch (err) {
      console.log(err);
      history.replace('/');
    } finally {
      // clearPassword();
      // clearPasswordConfirm();
    }
  };
  if (!user) {
    return <AccessDenied />;
  }
  return (
    <Box>
      <form onSubmit={handleChangePassword}>
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
        <Button type="submit" colorScheme="red" size="sm" marginTop="2">
          Change Password
        </Button>
      </form>
    </Box>
  );
};
