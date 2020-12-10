const express = require('express');
const productsController = require('../controllers/products');

const router = express.Router();

/* Task 2. You can pass nothing in the params and get all the results
paginated or you can pass one/two/all of the filters. Changing the pagination limit could be done as well by setting a 
new pageLimit and you can choose the page of the list as well.
Keys of the params: 
{
    category,
    minPrice,
    maxPrice,
    pageLimit,
    page,
  }
 */

router.get('/', productsController.getProducts);

/* Task 3. This require to pass the Id of a product as a param.
 */

 router.get('/sorted-list', productsController.getList);

/* 
  Task 1.
*/

router.post('/new-product', productsController.createProduct);


module.exports = router;