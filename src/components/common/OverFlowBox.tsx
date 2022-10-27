import { Box, BoxProps } from '@chakra-ui/layout';
import React from 'react';

export interface OverFlowBoxProps extends BoxProps {}

const OverFlowBox: React.FC<OverFlowBoxProps> = (props) => {
  return (
    <Box position="relative" h="100%" width="100%" {...props}>
      <Box
        as={props.as}
        position="absolute"
        top="0"
        left="0"
        right="0"
        bottom="0"
      >
        {props.children}
      </Box>
    </Box>
  );
};

export default OverFlowBox;
