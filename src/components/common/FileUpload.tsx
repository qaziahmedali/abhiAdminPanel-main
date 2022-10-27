import {
  Input,
  FormControl,
  FormLabel,
  InputGroup,
  InputLeftElement,
  FormErrorMessage,
  Icon,
} from "@chakra-ui/react";
import { useController, UseFormRegisterReturn } from "react-hook-form";
import { useRef, ReactNode } from "react";
import React from "react";

// export interface FileUploadProps {
//   name: string;
//   placeholder: string;
//   acceptedFileTypes?: string;
//   control: string;
//   children: string;
//   isRequired?: boolean;
// }

export interface FileUploadProps {
  register: UseFormRegisterReturn;
  accept?: string;
  multiple?: boolean;
  children?: ReactNode;
}

const FileUpload = (props: FileUploadProps) => {
  const { register, accept, multiple, children } = props;
  const inputRef = useRef<HTMLInputElement | null>(null);
  const { ref, ...rest } = register as {
    ref: (instance: HTMLInputElement | null) => void;
  };

  const handleClick = () => {
    inputRef.current?.click();
    console.log("working");
  };
  return (
    <InputGroup onClick={handleClick}>
      <input
        type={"file"}
        multiple={multiple || false}
        hidden
        accept={accept}
        {...rest}
        ref={(e) => {
          ref(e);
          inputRef.current = e;
        }}
      />
      <>{children}</>
    </InputGroup>
  );

  //   return (
  //     <FormControl isInvalid={invalid} isRequired>
  //       <FormLabel htmlFor="writeUpFile">{children}</FormLabel>
  //       <InputGroup>
  //         <InputLeftElement
  //           pointerEvents="none"
  //           children={<Icon as={FiFile} />}
  //         />
  //         <input
  //           type="file"
  //           accept={acceptedFileTypes}
  //           name={name}
  //           ref={inputRef}
  //           {...inputProps}
  //           inputRef={ref}
  //           style={{ display: "none" }}
  //         ></input>
  //         <Input
  //           placeholder={placeholder || "Your file ..."}
  //           onClick={() => inputRef.current.click()}
  //           value={value}
  //         />
  //       </InputGroup>
  //       <FormErrorMessage>{invalid}</FormErrorMessage>
  //     </FormControl>
  //   );
};

export default FileUpload;
