import { Button, IconButton } from '@chakra-ui/button';
import { InfoIcon, UnlockIcon } from '@chakra-ui/icons';
import { Flex } from '@chakra-ui/layout';
import axios from 'axios';
import React, { useContext } from 'react';
import { useHistory } from 'react-router';
import { Link } from 'react-router-dom';
import { UserContext } from '../../context/user';

export const Signed = () => {
  const history = useHistory();
  const { setUser } = useContext(UserContext)!;
  const handleSignOut = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const none = localStorage.getItem('none');
    try {
      const resp = await axios.post(
        'http://localhost:5000/user/signout',
        null,
        {
          headers: {
            none,
          },
        },
      );
      const data = resp.data;
      console.log(data);
      localStorage.removeItem('accessToken');
      localStorage.removeItem('none');
      setUser(null);
      history.replace('/');
    } catch (err) {
      console.log(err);
      return;
    }
  };
  return (
    <Flex alignItems="center">
      <form onSubmit={handleSignOut}>
        <Button type="submit" size="sm" rightIcon={<UnlockIcon />}>
          Sign Out
        </Button>
      </form>
      <Link to="/user/info">
        <IconButton
          aria-label="user-info-button"
          size="sm"
          marginLeft="2"
          icon={<InfoIcon />}
        />
      </Link>
    </Flex>
  );
};
