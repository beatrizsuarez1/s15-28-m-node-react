export type Request = Request<
  {},
  any,
  any,
  QueryString.ParsedQs,
  Record<string, any>
>

export type Response = Response<any, Record<string, any>, number>
