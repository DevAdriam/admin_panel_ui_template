import { HttpStatusCode } from "axios";

export type Metadata = {
  path?: string;
  version?: string;
  feature?: string;
  timeStamp?: string;
  message?: string;
  statusCode: HttpStatusCode;
};

export interface IResponse<T> {
  success?: boolean;
  _metaData: Metadata;
  _data: {
    data: T;
  };
}
