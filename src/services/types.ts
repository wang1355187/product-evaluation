export type Method =
  | "GET"
  | "OPTIONS"
  | "HEAD"
  | "POST"
  | "PUT"
  | "DELETE"
  | "TRACE"
  | "CONNECT";

export interface IOptions {
  url: string;
  method?: Method;
  data?: any;
  headers?: any;
  isLoading?: boolean;
  weChatDomain?: boolean;
  contentType?: string;
}
