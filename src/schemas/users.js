const joi = require("joi");

const schemaUsers = joi.object({
  nome: joi.string().required().messages({
    "string.empty": "O campo nome é obrigatório ",
    "any.required": "O campo nome é obrigatório ",
    "string.base": "O campo nome deve conter um formato válido",
  }),
  cpf: joi
    .string()
    .regex(/^\d{3}\.\d{3}\.\d{3}-\d{2}$/)
    .required()
    .messages({
      "string.pattern.base": "O campo CPF deve conter um formato válido",
      "string.empty": "O campo CPF é obrigatório",
      "string.base": "O campo CPF deve conter um formato válido",
      "any.required": "O campo CPF é obrigatório",
    }),
  data_nascimento: joi
    .date()
    .iso()
    .greater("1900-01-01")
    .less("now")
    .required()
    .messages({
      "any.required": "O campo Data de Nascimento é obrigatório",
      "date.base": "O campo data de nascimento deve conter um formato válido",
      "date.format": "O campo data de nascimento deve conter um formato válido",
    }),
  telefone: joi
    .string()
    .regex(/(\(?\d{2}\)?\s)?(\d{4,5}\-\d{4})/)
    .required()
    .messages({
      "any.required": "O campo telefone é obrigatório",
      "string.pattern.base": "O campo telefone deve conter um formato válido",
      "string.empty": "O campo telefone é obrigatório",
    }),
  email: joi
    .string()
    .email({
      tlds: { allow: ["com", "net"] },
    })
    .required()
    .messages({
      "any.required": "O campo email é obrigatório",
      "string.email": "O campo email deve conter um formato válido",
      "string.base": "O campo email deve conter um formato válido",
    }),
  senha: joi
    .string()
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/
    )
    .required()
    .messages({
      "any.required": "O campo senha é obrigatório",
      "string.base": "O campo senha deve conter um formato válido",
      "string.pattern.base":
        "O campo senha deve conter ao menos 8 caracteres, contendo ao menos um caractere maiúsculo, minúsculo, numeral e também conter um caractere especial",
    }),
});

module.exports = schemaUsers;
