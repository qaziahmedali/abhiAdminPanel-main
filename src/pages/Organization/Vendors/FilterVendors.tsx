import React, { useEffect, useState } from "react";
import {
  Button,
  Grid,
  Text,
  Spinner,
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  Stack,
  FormLabel,
  Input,
  Select,
} from "@chakra-ui/react";
import DatePicker from "react-datepicker";
import { useEasyActions, useEasyState } from "../../../store/hooks";
import { CalendarIcon } from "@chakra-ui/icons";
import "react-datepicker/dist/react-datepicker.css";

export interface ManagePageProps {
  isOpen: boolean;
  onClose: any;
  filterVendor: any;
  isLoading: boolean;
  alertMessage: boolean;
  success: boolean;
  clearMessages: any;
  filterParams: any;
}

const FilterOrganization: React.FC<ManagePageProps> = (props) => {
  const { Bank } = useEasyState((state) => state.organization);
  const { getBank } = useEasyActions((state) => state.organization);

  const [isLoading, setLoading] = useState(true);

  const [organizationName, setOrganizationName] = useState("");
  const [vendorId, setVendorId] = useState("");
  const [vendorName, setVendorName] = useState("");
  const [ntn, setNtn] = useState("");
  const [bankName, setBankName] = useState("");
  const [accountNumber, setAccountNumber] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");

  /*
  const [startDate, setStartDate] = useState<Date>(
    new Date(new Date().getFullYear(), 0, 1)
  );
  const [endDate, setEndDate] = useState<Date>(new Date());
  */

  const [requiredFields, setRequiredFields] = useState(false);

  useEffect(() => {
    clearMessages();
    setOrganizationName(props?.filterParams?.organizationName || "");
    setVendorId(props?.filterParams?.vendorId || "");
    setVendorName(props?.filterParams?.vendorName || "");
    setNtn(props?.filterParams?.ntn || "");
    setBankName(props?.filterParams?.bankName || "");
    setAccountNumber(props?.filterParams?.accountNumber || "");
    setEmail(props?.filterParams?.email || "");
    setPhone(props?.filterParams?.phone || "");

    /*
    setStartDate(
      props?.filterParams?.startDate || new Date(new Date().getFullYear(), 0, 1)
    );
    setEndDate(props?.filterParams?.endDate || new Date());
    */

    setRequiredFields(false);
    setLoading(props.isLoading);
  }, [props.isOpen, props.isLoading, props.filterParams]);

  useEffect(() => {
    getBanksData();
  }, []);

  const getBanksData = async () => {
    let params: any = {
      offset: 1,
      limit: 1000, // We want to show banks in select box, so need to get all banks.
    };
    await getBank(params);
  };

  const clearMessages = () => {
    setRequiredFields(false);
    props.clearMessages();
  };
  //   const StartDate = () => {
  //     const date = new Date();

  //     setStartDate(date);
  //   };
  //   const EndDate = () => {
  //     const date = new Date();

  /*
    const StartDate = () => {
      setStartDate(new Date());
    };

    const EndDate = () => {
      setEndDate(new Date());
  };
  */
  const filterOrganization = async () => {
    clearMessages();

    // if (startDate && endDate && startDate.getTime() > endDate.getTime()) {
    //   setEndDate(startDate);
    // }

    if (
      //   (startDate && endDate) ||
      organizationName ||
      vendorId ||
      vendorName ||
      ntn ||
      bankName ||
      accountNumber ||
      email ||
      phone
    ) {
      let paramsData = {
        // startDate: startDate,
        // endDate: endDate,

        organizationName,
        vendorId,
        vendorName,
        ntn,
        bankName,
        accountNumber,
        email,
        phone,
      };
      props.filterVendor(paramsData);
    } else {
      setRequiredFields(true);
    }
  };

  const cancelHandler = () => {
    props.onClose();
    clearMessages();
  };

  return (
    <>
      <Drawer
        isOpen={props.isOpen}
        placement="right"
        size="sm"
        onClose={props.onClose}
      >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader borderBottomWidth="1px">Filter Vendors</DrawerHeader>

          <DrawerBody>
            <Stack spacing="24px">
              {/* <Grid templateColumns="repeat(2, 2fr)" gap={0}>
                <FormLabel htmlFor="startDate">
                  Start Date
                  <CalendarIcon
                    style={{ marginLeft: 12 }}
                    onClick={() => {
                      StartDate();
                    }}
                  />
                </FormLabel>

                <DatePicker
                  isClearable
                  selected={startDate}
                  onChange={(date: any) => setStartDate(date)}
                  placeholderText="Enter Start date"
                />
              </Grid>
              <Grid templateColumns="repeat(2, 2fr)" gap={0}>
                <FormLabel ml="2" htmlFor="endDate">
                  End Date
                  <CalendarIcon
                    style={{ marginLeft: 12 }}
                    onClick={() => {
                      EndDate();
                    }}
                  />
                </FormLabel>

                <DatePicker
                  isClearable
                  selected={endDate}
                  onChange={(date: any) => setEndDate(date)}
                  placeholderText="Enter End date"
                />
              </Grid> */}

              <Grid templateColumns="repeat(2, 1fr)" gap={0}>
                <FormLabel htmlFor="VendorId">Vendor ID</FormLabel>
                <Input
                  value={vendorId}
                  placeholder=" Enter vendor ID"
                  onChange={(event) => setVendorId(event.currentTarget.value)}
                />
              </Grid>

              <Grid templateColumns="repeat(2, 1fr)" gap={0}>
                <FormLabel htmlFor="VendorName">Vendor Name</FormLabel>
                <Input
                  placeholder=" Enter vendor Name"
                  value={vendorName}
                  onChange={(event) => setVendorName(event.currentTarget.value)}
                />
              </Grid>

              <Grid templateColumns="repeat(2, 1fr)" gap={0}>
                <FormLabel htmlFor="organization-name">Organization</FormLabel>
                <Input
                  placeholder=" Enter organization"
                  value={organizationName}
                  onChange={(event) =>
                    setOrganizationName(event.currentTarget.value)
                  }
                />
              </Grid>

              <Grid templateColumns="repeat(2, 1fr)" gap={0}>
                <FormLabel htmlFor="ntn">National Taxation Number</FormLabel>
                <Input
                  placeholder=" Enter ntn"
                  value={ntn}
                  onChange={(event) => setNtn(event.currentTarget.value)}
                />
              </Grid>

              <Grid templateColumns="repeat(2, 1fr)" gap={0}>
                <FormLabel htmlFor="bankName">Bank Name</FormLabel>
                <Select
                  placeholder="Select Bank"
                  defaultValue={bankName}
                  onChange={(event) => setBankName(event.currentTarget.value)}
                >
                  {Bank?.results
                    ?.filter((val) => val.bankName != "None")
                    .map((value, index) => {
                      return (
                        <option key={index} value={value?.bankName}>
                          {value?.bankName}
                        </option>
                      );
                    })}
                </Select>
              </Grid>

              <Grid templateColumns="repeat(2, 1fr)" gap={0}>
                <FormLabel htmlFor="accountNumber">Account Number</FormLabel>
                <Input
                  placeholder=" Enter Account Number"
                  value={accountNumber}
                  onChange={(event) =>
                    setAccountNumber(event.currentTarget.value)
                  }
                />
              </Grid>

              <Grid templateColumns="repeat(2, 1fr)" gap={0}>
                <FormLabel htmlFor="email">Email</FormLabel>
                <Input
                  placeholder=" Enter email"
                  value={email}
                  onChange={(event) => setEmail(event.currentTarget.value)}
                />
              </Grid>

              <Grid templateColumns="repeat(2, 1fr)" gap={0}>
                <FormLabel htmlFor="phone">Phone</FormLabel>
                <Input
                  placeholder=" Enter Phone"
                  value={phone}
                  onChange={(event) => setPhone(event.currentTarget.value)}
                />
              </Grid>
            </Stack>
          </DrawerBody>

          <DrawerFooter borderTopWidth="1px">
            {props.alertMessage && (
              <Text color="red" mr="3">
                {" "}
                Something went wrong
              </Text>
            )}

            {props.success && (
              <Text color="green" mr="3">
                {" "}
                Success
              </Text>
            )}
            {requiredFields && (
              <Text color="red" mr="3">
                {" "}
                Required Fields are missing
              </Text>
            )}

            <Button colorScheme="green" mr={3} onClick={cancelHandler}>
              Cancel
            </Button>
            <Button
              type="submit"
              bg="#7367F0"
              colorScheme="#ffffff"
              onClick={filterOrganization}
            >
              {isLoading ? <Spinner /> : "Apply"}
            </Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default FilterOrganization;
