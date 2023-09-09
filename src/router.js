const express = require("express");

const router = express();

const transactions = require("./controllers/transactions");
const users = require("./controllers/users");

const validateBody = require('./middlewares/users');
const schemaUsers = require('./schemas/users')


router.get("/contas", users.showAccount);
router.post("/contas", validateBody(schemaUsers), users.newAccount);
router.put("/contas/:numeroConta/usuario", validateBody(schemaUsers), users.updateAccount);
router.delete("/contas/:numeroConta", users.deleteAccount);
router.get("/contas/saldo", users.showBalance);
router.get("/contas/extrato", users.showAccountStatement);

router.post("/transacoes/depositar", transactions.deposit);
router.post("/transacoes/sacar", transactions.withdraw);

module.exports = router;
