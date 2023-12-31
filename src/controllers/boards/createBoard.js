const Create = require('../../models/Board/Create')

const createBoard = async (req, res) => {
  try {
    const { title, backgroundURL, description } = req.body;

    const board = await Create(title, backgroundURL, description, req.userId)

    res.json(board);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Erro no Servidor');
  }
}

module.exports = createBoard