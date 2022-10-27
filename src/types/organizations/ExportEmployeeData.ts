export interface ResponseMetadata {
  RequestId: string;
}

export interface Data2 {
  ResponseMetadata: ResponseMetadata;
  MD5OfMessageBody: string;
  MessageId: string;
  SequenceNumber: string;
}

export interface Body {
  data: Data2;
  message: string;
  status: string;
}

export interface ExportEmployeeData {
  body: Body;
  code: number;
}
