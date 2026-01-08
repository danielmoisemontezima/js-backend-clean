import dotenv from "dotenv";
dotenv.config();

import { server } from "../interfaces/http/nodeServer";

const PORT = process.env.PORT || 3000;

server.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
