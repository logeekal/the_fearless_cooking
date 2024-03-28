export type RouteController<RequestBody = unknown, ResponseBody = unknown> = (
  body: RequestBody
) => Promise<ResponseBody>
