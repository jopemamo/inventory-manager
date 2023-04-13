const express = require('express');
const path = require('path');
const productsRoutes = require('./routes/products');

const app = express();
const PORT = process.env.PORT || 5005;

app.use(express.static(path.join(__dirname, '../client/build')));
app.use(express.json());
app.use('/api/products', productsRoutes);

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/build/index.html'));
});

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
