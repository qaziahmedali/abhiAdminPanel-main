import React from 'react';
import {
  Link as ReactRouterDomLink,
  LinkProps as ReactRouterLinkProps,
} from 'react-router-dom';
import {
  Link as ChakraLink,
  LinkProps as ChakraLinkProps,
} from '@chakra-ui/layout';

export type LinkProps = ReactRouterLinkProps & ChakraLinkProps;

const Link: React.FC<LinkProps> = (props) => {
  return (
    <ChakraLink as={ReactRouterDomLink} {...props}>
      {props.children}
    </ChakraLink>
  );
};

export default Link;
