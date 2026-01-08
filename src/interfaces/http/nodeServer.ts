import http from "http";
import { router } from "./router";

export const server = http.createServer((req, res) => {
  router(req, res);
});