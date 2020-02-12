# Drop and Sign

## Development

Install dependencies with `npm i`.

```
npm i
```

And run the project in development mode with `npm run dev`.

```
npm run dev
```

### Running the server and client separately

Since the client is compiled prior to the server being started so you need to compile the client first if you make any changes to the server.

The client build can take a not-significant amount of time so running the client and server in two processes/terminals can speed up server side development.

```
npm run dev:server
```

```
npm run dev:client
```

With these two running separately, client-side changes will be hot reloaded in the client process and any server-side changes will be hot reloaded on the server process.

## Production

```
npm i
npm run build
npm start
```

## Instructions on how to add Announcements banner in case of incident with Taktikal, Third party software or planned mainenance +

https://docs.google.com/document/d/1pSpn2Iv983cugDSliJtNtfx8IJ2FDMye_iTkZwlJ2ZM/edit#
