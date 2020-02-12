/**
 * Only for use during development.
 *
 * This creates a separate node process from the server so that server changes
 * can be made without the client having to be recompiled
 *
 * See: README > Development > Running the server and client separately
 */
import "~/config/configServer";

import express from "express";
import next from "next";
import bodyParser from "body-parser";

const PORT = (process.env.PORT && +process.env.PORT + 1) || 8081;

const dev = process.env.NODE_ENV !== "production";
const app = next({ dev });
const handle = app.getRequestHandler();

app.prepare().then(() => {
  const server = express();
  server.use(bodyParser.json());

  server.use((req, res) => {
    handle(req, res);
  });

  (server as any).listen(PORT, (err: any) => {
    if (err) {
      throw err;
    }
    console.log(`> Client ready on http://localhost:${PORT}`);
  });
});
