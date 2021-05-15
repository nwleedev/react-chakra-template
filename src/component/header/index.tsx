import { IconButton } from '@chakra-ui/button';
import { useDisclosure } from '@chakra-ui/hooks';
import { HamburgerIcon } from '@chakra-ui/icons';
import { Box, Flex, Heading } from '@chakra-ui/layout';
import { Collapse } from '@chakra-ui/transition';
import { useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { UserContext } from '../../context/user';
import { NotSigned } from './NotSigned';
import { Signed } from './Signed';

export const Header = () => {
  const { user } = useContext(UserContext)!;
  const { isOpen, onToggle } = useDisclosure();
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflowY = 'hidden';
    } else {
      document.body.style.overflowY = 'scroll';
    }
  }, [isOpen]);
  return (
    <>
      <Flex
        width="full"
        bgColor="teal.200"
        padding="4"
        justifyContent="space-between"
        alignItems="center"
        position="fixed"
        top="0"
        zIndex={100}
        boxShadow="base"
      >
        <Link to="/">
          <Heading fontSize="2xl">Home</Heading>
        </Link>
        <Flex alignItems="center">
          {user ? <Signed /> : <NotSigned />}
          <IconButton
            marginLeft="2"
            size="sm"
            aria-label="menu-button"
            icon={<HamburgerIcon />}
            onClick={onToggle}
          />
        </Flex>
      </Flex>
      <Collapse in={isOpen} animateOpacity={false}>
        <Box
          bgColor="teal.100"
          width="100vw"
          height="100vh"
          position="fixed"
          paddingTop="80px"
          top="0"
          paddingX="4"
          zIndex="80"
        >
          <Heading>I am Menu Collapsed</Heading>
        </Box>
      </Collapse>
    </>
  );
};
