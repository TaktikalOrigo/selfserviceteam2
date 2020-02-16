// Must run before anything else
import "~/config/configServer";

import express from "express";
import nextjs from "next";
import path from "path";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import compression from "compression";
import { createProxyToDevClientServer } from "~/server/clientProxy/createProxyToDevClientServer";
import { setApiRoutes } from "~/server/routes/router";
import { connectRepository } from "~/server/repository/connectRepository";

const dev = process.env.NODE_ENV !== "production";
const port = (process.env.PORT && +process.env.PORT) || 8080;
const compileClient = dev ? process.env.SERVER_ONLY !== "true" : true;

const app = compileClient ? nextjs({ dev }) : null;
const handle = (app && app.getRequestHandler())!;

(compileClient ? app!.prepare() : Promise.resolve()).then(async () => {
  const server = express();
  await connectRepository();

  server.use(bodyParser.json({ limit: "10mb" }));
  server.use(cookieParser());
  server.use(compression());

  server.use("/public", express.static("public"));
  server.get("/favicon.ico", (_, res) => {
    res.sendFile(path.resolve(__dirname, "./public/static/meta/favicon.ico"));
  });

  // Dev only client proxy
  if (!compileClient) {
    // Runs if the request does NOT match '/api'.
    //
    // If the regex matches, the request will stop here.
    server.use(/^(?!\/api).*/, createProxyToDevClientServer());
  }

  // Add '/api' routes
  setApiRoutes(server);

  if (compileClient) {
    server.use((req, res) => {
      handle(req, res);
    });
  }

  server.listen(port, (err: any) => {
    if (err) throw err;
    console.log(`> Server ready on http://localhost:${port}`);
  });
});
