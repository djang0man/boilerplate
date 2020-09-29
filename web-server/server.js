// libs
const Koa = require('koa');
const Router = require('koa-router');
const cors = require('@koa/cors');
const http = require('http');
const fs = require('fs');

const app = new Koa();
app.use(cors());
const router = new Router();

const CONFIG = {};

const PORT = process.env.PORT || 3016;
const APP_NAME = process.env.APP_NAME || 'example-app';
const TARGET_ID = APP_NAME;
const DIST_ROOT = `/dist/dev`;
const SCRIPT_SOURCE = `${DIST_ROOT}/${APP_NAME}.bundle.js`;

router.get(`${DIST_ROOT}/:filename`, async (ctx, next) => {
  console.log('router.get filename')
  ctx.response.lastModified = new Date();
  ctx.body = fs.createReadStream(__dirname + `${DIST_ROOT}/${ctx.params.filename}`);
});

router.get(`${DIST_ROOT}/images/:filename`, async (ctx, next) => {
  console.log('router.get images')
  ctx.response.lastModified = new Date();
  ctx.body = fs.createReadStream(__dirname + `${DIST_ROOT}/images/${ctx.params.filename}`);
});

router.get('/(.*)', async (ctx, next) => {
  const appConfig = process.env;

  ctx.response.lastModified = new Date();

  if (ctx.request.url.endsWith('bundle.js')) {
    const filename = ctx.request.url.split('/')[1];
    ctx.body = fs.readFileSync(`./web-server/dist/dev/${filename}`).toString();
    return;
  }

  ctx.body = `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0" />
        <link rel="icon" id="favicon" type="image/png" href="#" />

        <title>${APP_NAME}</title>
        <style>
          html, body {
            margin: 0;
          }
        </style>
        <script>
          window._config_ = ${JSON.stringify(CONFIG)}
       </script>
        <script language="javascript" type="application/json" id="applicationConfiguration">
            ${JSON.stringify(appConfig)}
        </script>
      </head>
      <body>
        <div id="${TARGET_ID}"></div>
        <script id="versionURL" src="${SCRIPT_SOURCE}"></script>
      </body>
    </html>
  `;
});

// x-response-time
app.use(async (ctx, next) => {
  const start = Date.now();
  await next();
  const ms = Date.now() - start;
  ctx.set('X-Response-Time', `${ms}ms`);
});

// logger
app.use(async (ctx, next) => {
  const start = Date.now();
  await next();
  const ms = Date.now() - start;
  console.log(`${ctx.protocol} ${ctx.method} ${ctx.url} (${ms}ms)`);
});

// start server
http.createServer(app.use(router.routes()).use(router.allowedMethods()).callback()).listen(PORT);
