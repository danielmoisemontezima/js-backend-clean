import { Middleware } from "../types";
import { IAuthToken } from "../../../domain/services/IAuthToken";

export function auth(authToken: IAuthToken): Middleware {
  return (req, res, next) => {
    const header = req.headers["authorization"];

    if (!header) {
      res.writeHead(401, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ error: "Unauthorized" }));
      return;
    }

    const token = header.replace("Bearer ", "");

    try {
      const payload = authToken.verify(token);
      req.user = payload; // attach decoded user to request
      return next();
    } catch (err) {
      res.writeHead(401, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ error: "Invalid or expired token" }));
      return;
    }
  };
}