require('dotenv').config();
const express = require('express');
const {
  handleNotFound,
  handleServerError,
} = require('./middlewares/handleErrors');
const app = express();

app.use(require('cors')());
app.use(require('helmet')());
app.use(express.json());

app.use('/api/v1', require('./routes'));

app.use(handleNotFound);
app.use(handleServerError);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`App is listening on port ${PORT}`));
