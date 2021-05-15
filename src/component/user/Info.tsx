import { Button } from '@chakra-ui/button';
import { Box, Heading, Text } from '@chakra-ui/layout';
import { useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { UserContext } from '../../context/user';
import { AccessDenied } from '../invalid';

export const UserInfo = () => {
  const { user } = useContext(UserContext)!;
  useEffect(() => {
    console.log(user);
  }, [user]);
  if (!user) {
    return <AccessDenied />;
  }
  return (
    <Box>
      <Heading fontSize="2xl" marginY="2">
        Your Information
      </Heading>
      <Heading fontSize="lg" marginY="2">
        Username
      </Heading>
      <Text fontSize="lg" marginY="2" fontWeight="semibold">
        {user?.username}
      </Text>
      <Heading fontSize="lg" marginY="2">
        E-Mail
      </Heading>
      <Text fontSize="lg" marginY="2" fontWeight="semibold">
        {user?.email}
      </Text>
      <Button colorScheme="green" marginY="2" size="sm" type="button">
        <Link to="/password/change">Change Password</Link>
      </Button>
      <br />
      <Box marginTop="4">
        <Heading fontSize="md" color="red.400">
          Want to delete your account?
        </Heading>
        <Button
          bgColor="red.400"
          color="white"
          marginY="2"
          size="sm"
          type="button"
        >
          <Link to="/user/delete">Delete User</Link>
        </Button>
      </Box>
    </Box>
  );
};
