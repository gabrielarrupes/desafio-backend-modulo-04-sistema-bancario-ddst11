const app = require("./server");
const router = require("./router");

app.use(router);

app.listen(3000);
