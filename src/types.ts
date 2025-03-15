export interface IResponse<T> {
  _metadata: Metadata;
  _data: T;
  status: number;
  message: string;
}
export interface Metadata {
  timeStamp: string;
  status: number;
  path: string;
}
