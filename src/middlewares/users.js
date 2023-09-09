
const validateBody = joiSchema => async (req, res, next) => {
        try {
            await joiSchema.validateAsync(req.body);
            next()
            
        } catch (error) {
          res.status(400).json({mensagem: error })
        }
}


module.exports = validateBody