let {
  contas,
  banco,
  saques,
  depositos,
  transferencias,
} = require("../bancodedados");


const showAccount = async (req, res) => {
  try {
    const { senha_banco } = req.query;

    banco.senha === senha_banco
      ? res.status(200).json(contas)
      : res.status(404).json({ message: "Senha inválida" });
  } catch (error) {
    console.log(error);
  }
};

const newAccount = async (req, res) => {
  try {
    const { nome, cpf, data_nascimento, telefone, email, senha } = req.body;

    if (!nome || !cpf || !data_nascimento || !telefone || !email || !senha) {
      res.status(400).json({ message: "Preencha todos os campos" });
      return;
    }

    if (contas.find((account) => Number(account.usuario.cpf) === Number(cpf))) {
      res.status(400).json({ message: "CPF já cadastrado" });
      return;
    }

    if (contas.find((account) => account.usuario.email === email)) {
      res.status(400).json({ message: "Endereço de e-mail já cadastrado" });
      return;
    }

    const createNewAccount = {
      numero: (contas.length + 1).toString(),
      saldo: 0,
      usuario: {
        nome,
        cpf,
        data_nascimento,
        telefone,
        email,
        senha,
      },
    };

    contas.push(createNewAccount);

    res.status(201).json(createNewAccount);
  } catch (error) {
    console.log(error.message);
  }
};

const updateAccount = async (req, res) => {
  const { numeroConta } = req.params;

  const { nome, cpf, data_nascimento, telefone, email, senha } = req.body;

  if (!nome && !cpf && !data_nascimento && !telefone && !email && !senha) {
    res
      .status(400)
      .json({ message: "Informe ao menos um campo à ser alterado" });
    return;
  }

  let update = contas.find((account) => account.numero === numeroConta);

  if (update === undefined) {
    res.status(404).json({ message: "A conta informada não existe" });
    return;
  }

  if (contas.find((account) => Number(account.usuario.cpf) === Number(cpf))) {
    res
      .status(400)
      .json({ message: "O CPF informado já está cadastrado em outra conta" });
    return;
  }

  if (contas.find((account) => account.usuario.email === email)) {
    res.status(400).json({
      message:
        "O endereço de e-mail informado já está cadastrado em outra conta",
    });
    return;
  }

  if (nome) {
    update.usuario.nome = nome;
  }

  if (cpf) {
    update.usuario.cpf = cpf;
  }

  if (data_nascimento) {
    update.usuario.data_nascimento = data_nascimento;
  }

  if (telefone) {
    update.usuario.telefone = telefone;
  }

  if (email) {
    update.usuario.email = email;
  }

  if (senha) {
    update.usuario.senha = senha;
  }

  const newData = {
    nome,
    cpf,
    data_nascimento,
    telefone,
    email,
    senha,
  };

  update = { ...newData };

  res.status(200).json({ message: "Conta alterada com sucesso" });
};

const deleteAccount = async (req, res) => {
  const { numeroConta } = req.params;

  const account = contas.find((account) => account.numero === numeroConta);

  if (!account) {
    res.status(404).json({ message: "A conta informada não existe" });
    return;
  }

  contas = contas.filter((acc) => {
    return acc.numero !== numeroConta;
  });

  res.status(200).json({ message: "Conta excluída com sucesso" });
};

const showBalance = async (req, res) => {
  const { numero_conta, senha } = req.query;

  const account = contas.find((account) => account.numero === numero_conta);

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

  res
    .status(200)
    .json({ message: `Saldo: R$${(account.saldo / 1000).toFixed(2)}` });
};

const showAccountStatement = async (req, res) => {
  const { numero_conta, senha } = req.query;

  const account = contas.find((account) => account.numero === numero_conta);

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

  res.status(200).json({
    depositos,
    saques,
    transferencias, // -> alterar quando criar a fn de transferências
  });
};

module.exports = {
  showAccount,
  newAccount,
  updateAccount,
  deleteAccount,
  showBalance,
  showAccountStatement,
};
