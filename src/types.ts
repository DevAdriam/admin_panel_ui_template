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

export type Brand = {
  id: string;
  name: string;
  isDeleted: boolean;
  createdAt: string;
  updatedAt: string;
};

export type IPaginatedResponse<T> = {
  success: boolean;
  _metaData: {
    message: string;
    statusCode: number;
  };
  _pagination: {
    pageSize: number;
    totalCount: number;
    totalPages: number;
  };
  _data: {
    data: T;
  };
};
