export interface CardAcceptorNameLocation {
  ADCLiteral: string
  BankName: string
  Country: string
}

export interface SettingsJson {
  TransactionAmount: string
  MerchantType: string
  CardAcceptorTerminalId: string
  CardAcceptorIdCode: string
  CurrencyCodeTransaction: string
  PosEntMode: string
  SenderName: string
  SenderIBAN: string
  AccountNumberFrom: string
  FromBankIMD: string
  AuthorizationIdentificationResponse: string
  CardAcceptorNameLocation: CardAcceptorNameLocation
}

export interface OneLinkDefaultValuesResult {
  id: string
  createdById: string
  createdAt: Date
  deletedDate?: any
  settingsJson: SettingsJson
  updatedById: string
  updatedAt: Date
  version: number
}

export interface OneLinkDefaultValuesData {
  result: OneLinkDefaultValuesResult[]
}
