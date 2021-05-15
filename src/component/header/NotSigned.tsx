import { Button } from '@chakra-ui/button';
import { LockIcon } from '@chakra-ui/icons';
import { Flex } from '@chakra-ui/layout';
import { Link } from 'react-router-dom';

export const NotSigned = () => {
  return (
    <Flex alignItems="center">
      <Link to="/signin">
        <Button type="button" size="sm" rightIcon={<LockIcon />} marginLeft="2">
          Sign In
        </Button>
      </Link>
    </Flex>
  );
};
