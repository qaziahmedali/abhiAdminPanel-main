import React from "react";
import { Spinner } from "@chakra-ui/react";

export interface SpinnerProps {}

const LoadingSpinner: React.FC<SpinnerProps> = (props) => {
  return (
    <div
      style={{
        position: "fixed",
        overflow: "show",
        margin: "auto",
        top: 0,
        left: 0,
        bottom: 0,
        right: 0,
        width: "50px",
        height: "50px",
      }}
    >
      <Spinner
        thickness="4px"
        speed="0.65s"
        emptyColor="gray.200"
        color="blue.500"
        size="xl"
      />
    </div>
  );
};

export default LoadingSpinner;
