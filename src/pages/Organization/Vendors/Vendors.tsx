import React, { useState } from "react";
import {
  Flex,
  Spacer,
  Button,
  useDisclosure,
  Tooltip,
  Icon,
} from "@chakra-ui/react";
import FilterIcon from "../../../components/common/FilterIcon";
import LoadingSpinner from "../../../components/common/Spinner";
import { useEasyActions, useEasyState } from "../../../store/hooks";
import DataTable from "react-data-table-component";

import moment from "moment";
import { customStyles } from "@/config/styles/customStyles";
import { RepeatIcon } from "@chakra-ui/icons";
import { OrganizationVendorResult } from "@/types/organizations/Vendors";
import FilterVendor from "./FilterVendors";

export interface VendorProps {}

const Vendors: React.FC<VendorProps> = (props) => {
  const { getAllVendors, filterVendors } = useEasyActions(
    (state) => state.organization
  );

  const { vendors } = useEasyState((state) => state.organization);

  const [filteredParams, setFilteredParams] = useState<any>({});

  const [isDataLoading, setIsDataLoading] = useState(false);
  const [vendorRecord, setVendorsRecord] = useState<OrganizationVendorResult[]>(
    []
  );

  const [totalVendors, setTotalVendors] = useState(0);
  const [alert, setAlert] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const [showAll, setShowAll] = useState(false);
  const [paginationProps, setPaginationProps] = useState({
    offset: 1,
    limit: 10,
  });
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [rowIndex, setRowIndex] = useState(0);

  const usePrevious = (value: any) => {
    const ref = React.useRef();
    React.useEffect(() => {
      ref.current = value;
    });
    return ref.current;
  };
  const prevCount: any = usePrevious(paginationProps.offset);

  React.useEffect(() => {
    if (Object.keys(filteredParams).length > 0) {
      getVendorData(true);
    } else {
      getVendorData();
    }
    if (paginationProps.offset > prevCount) {
      setRowIndex(rowIndex + 10);
    } else if (paginationProps.offset < prevCount && paginationProps.offset !== 0) {
      setRowIndex(rowIndex - 10);
    }
  }, [paginationProps]);

  React.useEffect(() => {
    setVendorsRecord(vendors);
  }, [vendors]);

  const getVendorData = async (usePaginationProps?: boolean) => {
    setIsDataLoading(true);

    let params: any = {
      ...paginationProps,
    };

    let data = [];
    if (Object.keys(filteredParams).length > 0) {
      params = usePaginationProps ? { ...filteredParams, ...params } : filteredParams;
      data = await filterVendors(params);
      if (data) {
        setTotalVendors(data.total);
        setSuccess(true);
        setIsLoading(false);
        setShowAll(true);
        onClose();
        setIsDataLoading(false);
      }
    } else {
      data = await getAllVendors(params);
      if (data) {
        setTotalVendors(data.total);
        setSuccess(true);
        setIsLoading(false);

        onClose();
        setIsDataLoading(false);
      }
    }
  };

  const onChangePage = (page: any, totalRows: any) => {
    setPaginationProps({
      ...paginationProps,
      offset: page,
    });
  };

  const refresh = () => {
    getVendorData();
  };

  const showAllHandler = () => {
    setShowAll(false);
    setFilteredParams({});
    setPaginationProps({
      offset: 1,
      limit: 10,
    });
  };

  const filterVendor = async (param: any) => {
    let params = {
      ...param,
    };
    setFilteredParams(params);
    setPaginationProps({
      offset: 1,
      limit: 10,
    });
  };

  const clearMessages = () => {
    setSuccess(false);
    setAlert(false);
  };

  const onChangeRowsPerPage = (limit: number, offset: number) => {
    setPaginationProps({
      offset: 1,
      limit,
    });
  }

  const columns = [
    {
      name: "#",
      selector: "id",

      sortable: true,

      width: "40px",
      cell: (row: any, index: any) => (
        <div
          style={{
            overflow: "hidden",
            textOverflow: "ellipsis",
            whiteSpace: "nowrap",
          }}
        >
          <Tooltip label={index + rowIndex + 1}>
            <p>{index + rowIndex + 1}</p>
          </Tooltip>
        </div>
      ),
    },
    {
      name: "Date ",
      selector: (row: any) => row?.createdAt,

      sortable: true,

      width: "200px",
      cell: (row: any) => (
        <div
          style={{
            overflow: "hidden",
            textOverflow: "ellipsis",
            whiteSpace: "nowrap",
          }}
        >
          <Tooltip
            label={moment(row.createdAt).format("ddd DD-MMM-YYYY, hh:mm A")}
          >
            {moment(row.createdAt).format("ddd DD-MMM-YYYY, hh:mm A")}
          </Tooltip>
        </div>
      ),
    },
    {
      name: "Organizations",
      selector: (row: any) => row?.organization?.name,

      sortable: true,

      width: "130px",
      cell: (row: any) => (
        <div
          style={{
            overflow: "hidden",
            textOverflow: "ellipsis",
            whiteSpace: "nowrap",
          }}
        >
          <Tooltip
            label={row?.organization?.name ? row?.organization?.name : "-"}
          >
            {row?.organization?.name ? row?.organization?.name : "-"}
          </Tooltip>
        </div>
      ),
    },
    {
      name: "Vendor Name",
      selector: (row: any) => row?.name,

      sortable: true,

      width: "130px",
      cell: (row: any) => (
        <div
          style={{
            overflow: "hidden",
            textOverflow: "ellipsis",
            whiteSpace: "nowrap",
          }}
        >
          <Tooltip label={row?.name ? row?.name : "-"}>
            {row?.name ? row?.name : "-"}
          </Tooltip>
        </div>
      ),
    },
    {
      name: "Vendor ID",
      selector: (row: any) => row?.vendorId,
      width: "130px",
      sortable: true,

      cell: (row: any) => (
        <div
          style={{
            overflow: "hidden",
            textOverflow: "ellipsis",
            whiteSpace: "nowrap",
          }}
        >
          <Tooltip label={row?.vendorId ? row?.vendorId : "-"}>
            {row?.vendorId ? row?.vendorId : "-"}
          </Tooltip>
        </div>
      ),
    },
    {
      name: "NTN",
      selector: (row: any) => row?.ntn,

      sortable: true,

      width: "150px",
      cell: (row: any) => (
        <div
          style={{
            overflow: "hidden",
            textOverflow: "ellipsis",
            whiteSpace: "nowrap",
          }}
        >
          <Tooltip label={row?.ntn ? row?.ntn : "-"}>
            {row?.ntn ? row?.ntn : "-"}
          </Tooltip>
        </div>
      ),
    },
    {
      name: "Bank Name",
      selector: (row: any) => row?.selectedBankAccount?.bank?.bankName,

      sortable: true,

      width: "250px",

      cell: (row: any) => (
        <div
          style={{
            overflow: "hidden",
            textOverflow: "ellipses",
            whiteSpace: "nowrap",
          }}
        >
          <Tooltip
            label={
              row?.selectedBankAccount?.bank?.bankName
                ? row?.selectedBankAccount?.bank?.bankName
                : "-"
            }
          >
            {row?.selectedBankAccount?.bank?.bankName
              ? row?.selectedBankAccount?.bank?.bankName
              : "-"}
          </Tooltip>
        </div>
      ),
    },
    {
      name: "Account No",
      selector: (row: any) => row?.selectedBankAccount?.accountNumber,

      sortable: true,

      width: "200px",

      cell: (row: any) => (
        <div
          style={{
            overflow: "hidden",
            textOverflow: "ellipses",
            whiteSpace: "nowrap",
          }}
        >
          <Tooltip
            label={
              row?.selectedBankAccount?.accountNumber
                ? row?.selectedBankAccount?.accountNumber
                : "-"
            }
          >
            {row?.selectedBankAccount?.accountNumber
              ? row?.selectedBankAccount?.accountNumber
              : "-"}
          </Tooltip>
        </div>
      ),
    },
  ];

  return (
    <>
      <Flex mb="1">
        <Spacer />
        {showAll && (
          <Button bg="#7367F0" colorScheme="#ffffff" onClick={showAllHandler}>
            Show All
          </Button>
        )}

        <Button bg="#7367F0" ml="3" colorScheme="#ffffff" onClick={refresh}>
          <RepeatIcon width="7" height="7" color="#ffffff" />
        </Button>

        <Button
          bg={showAll ? "#42ba96" : "#7367F0"}
          ml="3"
          colorScheme="#ffffff"
          onClick={onOpen}
        >
          <Icon as={FilterIcon} />
        </Button>
      </Flex>

      <FilterVendor
        isOpen={isOpen}
        onClose={onClose}
        filterVendor={filterVendor}
        isLoading={isLoading}
        alertMessage={alert}
        success={success}
        clearMessages={clearMessages}
        filterParams={filteredParams}
      />

      {isDataLoading ? (
        <LoadingSpinner />
      ) : (
        <DataTable
          paginationDefaultPage={paginationProps.offset}
          columns={columns}
          data={vendorRecord}
          pagination
          paginationServer
          fixedHeader
          paginationPerPage={paginationProps.limit || 10}
			    paginationRowsPerPageOptions={[10, 50, 100, 250]}
          onChangeRowsPerPage={onChangeRowsPerPage}
          onChangePage={onChangePage}
          paginationTotalRows={totalVendors}
          customStyles={customStyles}
        />
      )}
    </>
  );
};

export default Vendors;
