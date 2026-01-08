import { Middleware } from "../types";

export const jsonParser: Middleware = async (req, _res, next) => {
  if (req.method === "POST" || req.method === "PUT") {
    const body = await new Promise<string>((resolve, reject) => {
      let data = "";
      req.on("data", (chunk: Buffer | string) => (data += chunk.toString()));
      req.on("end", () => resolve(data));
      req.on("error", reject);
    });

    req.body = body ? JSON.parse(body) : {};
  }

  return next();
};
