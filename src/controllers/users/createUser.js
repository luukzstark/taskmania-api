require("dotenv").config();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Create = require("../../models/User/Create");
const GetUserByEmail = require("../../models/User/GetUserByEmail");
const { validationResult } = require("express-validator");

const createUser = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { name, email, password } = req.body;

  try {
    // See if user exists
    if (await GetUserByEmail(email)) {
      return res.status(400).json({ errors: [{ msg: "Usuário já existe" }] });
    }

    const avatar = ""
    const cryptPassword = await bcrypt.hash(password, await bcrypt.genSalt(10));

    // Register new user
    const user = await Create(name, email, avatar, cryptPassword);

    // Return jsonwebtoken
    jwt.sign(
      {
        user: {
          id: user._id,
        },
      },
      // eslint-disable-next-line no-undef
      process.env.JWT_SECRET,
      { expiresIn: 360000 },
      (err, token) => {
        if (err) throw err;
        res.json({
          _id: user._id,
          name: user.name,
          email: user.email,
          avatar: user.avatar,
          token
        });
      }
    );
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Erro no Servidor");
  }
};

module.exports = createUser;
