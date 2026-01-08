export type Middleware = (
  req: any,
  res: any,
  next: () => Promise<void> | void
) => Promise<void> | void;