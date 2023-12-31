const Card = require('../../models/Card')
const User = require('../../models/User')
const AddActivity = require('../../models/Board/AddActivity')
const List = require('../../models/List')
const { validationResult } = require('express-validator');

const createCard = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const { title, listId, boardId } = req.body;

    // Create and save the card
    const newCard = new Card({ title });
    const card = await newCard.save();

    // Assign the card to the list
    const list = await List.findById(listId);
    list.cards.push(card.id);
    await list.save();

    // Log activity
    await AddActivity(boardId, {
      text: `Notify: ${req.user.name} added '${title}' to '${list.title}'`
    })

    res.json({ card, listId });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Erro no Servidor');
  }
}

module.exports = createCard