const sorting = (data, category = null, minPrice = null, maxPrice = null, pageLimit = 24, page = 1) => {
  let sortedData = data.filter(product => {
    if (category && minPrice && maxPrice) {
      return product.category === category && product.price >= minPrice && product.price <= maxPrice;
    }
    if (category && maxPrice) {
      return product.category === category && product.price <= maxPrice;
    }
    if (category && minPrice) {
      return product.category === category && product.price >= minPrice;
    }
    if (minPrice && maxPrice) {
      return product.price >= minPrice && product.price <= maxPrice;
    }
    if (category) {
      return product.category === category;
    }
    if (minPrice) {
      return product.price >= minPrice;
    }
    if (maxPrice) {
      return product.price <= maxPrice;
    }
    return true;
  });
  let result = pagination(sortedData, pageLimit, page);
  return result;
}

const pagination = (data, pageLimit=5, page=1) => {
let result = data.slice((page - 1) * pageLimit, page * pageLimit);
return result;
}

module.exports.sorting = sorting;

module.exports.pagination = pagination;