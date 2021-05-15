import { Button } from '@chakra-ui/button';
import { Box, Heading } from '@chakra-ui/layout';
import { Link } from 'react-router-dom';

export const AccessDenied = () => {
  return (
    <Box>
      <Heading fontSize="3xl" color="red">
        ACCESS DENIED
      </Heading>
      <Button colorScheme="blackAlpha" marginTop="4">
        <Link to="/">Go Home</Link>
      </Button>
    </Box>
  );
};
