import { Middleware } from "../types";

export async function runMiddleware(
  req: any,
  res: any,
  middlewares: Middleware[],
  finalHandler: () => Promise<void>
) {
  let index = -1;

  async function next() {
    index++;
    const middleware = middlewares[index];

    if (!middleware) {
      return finalHandler();
    }

    await middleware(req, res, next);
  }

  await next();
}