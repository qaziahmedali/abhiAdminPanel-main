export interface ResponseJson {
  ResponseCode: string
  PAN: string
  Amount: string
  TransmissionDateAndTime: string
  STAN: string
  Time: string
  Date: string
  DateSettlement: string
  RRN: string
  AuthorizationIdentificationResponse: string
  AccountNumberTo: string
  ToBankIMD: string
  AccountTitleTo: string
  BranchNameTo: string
  BankName: string
  IBAN_MobileAccountNumber: string
  Reserved1: string
  Reserved2: string
  Reserved3: string
  ResponseDetail: string
}

export interface FinancialTransactionsRespons {
  id: string
  createdById: string
  createdAt: Date
  deletedDate?: any
  responseJson: ResponseJson
  responseCodeId: string
  financialTransactionId: string
  updatedById: string
  updatedAt: Date
  version: number
}

export interface CardAcceptorNameLocation {
  ADCLiteral: string
  BankName: string
  Country: string
}

export interface RequestJson {
  TransactionAmount: string
  TransmissionDateAndTime: string
  STAN: string
  Time: string
  Date: string
  RRN: string
  MerchantType: string
  CardAcceptorTerminalId: string
  CardAcceptorIdCode: string
  CurrencyCodeTransaction: string
  CardAcceptorNameLocation: CardAcceptorNameLocation
  AccountNumberTo: string
  ToBankIMD: string
  AccountNumberFrom: string
  FromBankIMD: string
  PAN: string
  PosEntMode: string
}

export interface FinancialTransactionsRequest {
  id: string
  createdById: string
  createdAt: Date
  deletedDate?: any
  transmissionDateTime: string
  stan: string
  paymentPurposeId: string
  fromOneLinkBankId: string
  toOneLinkBankId: string
  financialTransactionId: string
  requestJson: RequestJson
  updatedById: string
  updatedAt: Date
  version: number
}

export interface OneLinkReqResData {
  id: string
  createdById: string
  createdAt: Date
  deletedDate?: any
  amount: string
  transactionDate: Date
  transactionType: string
  employeeTransactionRequestsId: string
  updatedById: string
  updatedAt: Date
  version: number
  financialTransactionsResponses: FinancialTransactionsRespons[]
  financialTransactionsRequests: FinancialTransactionsRequest[]
}

export interface OneLinkReqRes {
  data: OneLinkReqResData
  message: string
  status: string
}
