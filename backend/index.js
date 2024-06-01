require('dotenv').config();
const express = require('express');
const app = express();

app.use(require('cors')());
app.use(require('helmet')());
app.use(express.json());

app.get('/api/v1/test', (req, res) => {
  res.json({
    status: true,
  });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`App is listening on port ${PORT}`));
