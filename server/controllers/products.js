const { sorting, pagination } = require('../util/filter');
const products = require('../db');
const fs = require('fs');
const { v4: uuidv4 } = require('uuid');

exports.getProducts = (req, res) => {
  const {
    category,
    minPrice,
    maxPrice,
    pageLimit,
    page,
  } = req.query;
  let result = sorting(products, category, minPrice, maxPrice, pageLimit, page);
  res
    .status(200)
    .send(result);
};

exports.getList = (req, res) => {
  const product = products.find(({id}) => req.query.id=== id);
  let list= products.filter(({category}) => category === product.category);
  const index = list.findIndex(({id}) => req.query.id=== id);
  list.splice(index, 1);
  const sortedList = list
    .map(prod => {
    return {...prod, sortingValue:(Math.abs(prod.price - product.price))}
    })
    .sort((a,b)=> a.sortingValue-b.sortingValue);
  res
    .status(200)
    .send(pagination(sortedList));
}

exports.createProduct = (req, res) => {
  let newProduct = req.body;
  newProduct.id = uuidv4();
  products.push(newProduct);
  let newProducts = `const products = ${JSON.stringify(products)}; module.exports = products;`
  fs.writeFileSync('db.js', newProducts);
  res
    .status(200)
    .send({ message: 'New product added' });
};