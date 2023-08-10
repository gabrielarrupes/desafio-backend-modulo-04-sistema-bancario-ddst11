let { contas, saques, depositos } = require("../bancodedados");

const deposit = async (req, res) => {
  const { numero, valor } = req.body;

  if (!numero || !valor) {
    res.status(400).json({
      message: "Informe número da conta e valor a ser depositado",
    });
    return;
  }

  const account = contas.find((account) => account.numero === numero);

  if (account === undefined) {
    res.status(404).json({ message: "A conta informada não existe" });
    return;
  }

  if (Number(valor) <= 0) {
    res
      .status(400)
      .json({ message: "Informe um valor para depósito superior à 0" });
    return;
  }

  account.saldo += Number(valor);

  depositos.push({
    data: new Date(),
    numero_conta: numero,
    valor: valor,
  });

  res.status(200).json({ message: "Depósito realizado com sucesso!" });
};

const withdraw = async (req, res) => {
  const { numero, valor, senha } = req.body;

  if (!numero || Number(valor) <= 0 || !senha) {
    res.status(400).json({
      message: "Informe número e senha da conta bancária e valor do saque",
    });
    return;
  }

  const account = contas.find((account) => account.numero === numero);

  if (account === undefined) {
    res.status(404).json({ message: "A conta informada não existe" });
    return;
  }

  if (account.usuario.senha !== senha) {
    res.status(400).json({
      message: "Senha incorreta",
    });
    return;
  }

  if (account.saldo < Number(valor)) {
    res.status(400).json({
      message: "Não há saldo suficiente para realizar o saque",
    });
    return;
  }

  account.saldo -= Number(valor);

  saques.push({
    data: new Date(),
    numero_conta: numero,
    valor: valor,
  });

  res.status(200).json({
    message: "Saque realizado com sucesso",
  });
};

module.exports = {
  deposit,
  withdraw,
};
