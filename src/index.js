const app = require("./servidor");
const router = require("./rotas");

app.use(router);

app.listen(3000);
