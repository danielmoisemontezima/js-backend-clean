import { loginUserController, registerUserController, getUserProfileController } from "../../application/container";
import { jsonParser } from "./middleware/JsonParser";
import { runMiddleware } from "./helpers/runMiddleware";
import { sendJson } from "./helpers/sendJson";
import { auth } from "./middleware/auth";
import { authTokenService } from "../../application/container";
import { parse } from "node:path";

const authMiddleware = auth(authTokenService);

export async function router(req: any, res: any) {
  const middlewares = [jsonParser];

  await runMiddleware(req, res, middlewares, async () => {
    if (req.method === "POST" && req.url === "/api/user") {

      const result = await registerUserController.handle(req.body);
      return sendJson(res, result.status, result.body);

    } else if (req.method === "POST" && req.url === "/api/login") {

      const result = await loginUserController.handle(req.body);
      return sendJson(res, result.status, result.body);

    } else if (req.method === "GET" && req.url === "/api/user/profile") {

      await runMiddleware(req, res, [authMiddleware], async () => {
        console.log("Authenticated user:", req.user);
        const result = await getUserProfileController.handle({ id: parseInt(req.user.id, 10) });
        return sendJson(res, result.status, result.body);
      });

    } else {
      return sendJson(res, 404, { error: "Not found" });
    }

  });
}