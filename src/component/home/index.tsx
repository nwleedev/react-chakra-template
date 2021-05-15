import { Box, Flex, Heading } from '@chakra-ui/layout';
import { useContext } from 'react';
import { UserContext } from '../../context/user';

export const Home = () => {
  const { user } = useContext(UserContext)!;
  return (
    <Box height="1000px">
      <Flex alignItems="center">
        <Heading fontSize="2xl">Hello World!</Heading>
        {user && (
          <Heading fontSize="sm" marginX="2">
            {user.username}
          </Heading>
        )}
      </Flex>
    </Box>
  );
};
