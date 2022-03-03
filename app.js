const BASE = "https://xx.xx/api";

const Koa = require("koa");
const cors = require("@koa/cors");
const bodyParser = require("koa-bodyparser");
const axios = require("axios");

const app = new Koa();

app.use(bodyParser());
app.use(cors());
app.use(async (ctx) => {
  const res = await axios({
    url: BASE + ctx.request.url,
    headers: { authorization: ctx.request.header.authorization },
    method: ctx.request.method,
    data: ctx.request.body,
  }).catch((e) => e);
  console.log(res.response);

  ctx.status = res.status || res.response.status;
  ctx.body = res.data || res.response.data;
});

console.log("lisitening");
app.listen(8888);
