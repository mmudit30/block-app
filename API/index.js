const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
const { registerDoctor } = require('./services/transactionService');

app.use(cors());
app.use(bodyParser.json());

app.post('/register-doctor', async (req, res) => {
  try {
    const { address, id, name, labId } = req.body;
    await registerDoctor(address, id, name, labId, res);
  } catch (e) {
    res.status(500).send(e);
  }
});

app.listen(4000);
