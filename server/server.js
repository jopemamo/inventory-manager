const express = require('express');
const path = require('path');
const productsRoutes = require('./routes/products');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 6005;

app.use(cors());
app.use(express.json());
// Serve static files in production
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../client/build')));
  app.use('/api/products', productsRoutes);
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../client/build', 'index.html'));
  });
} else {
  app.use(express.static(path.join(__dirname, 'public')));
  app.use('/api/products', productsRoutes);
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
  });
}

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
