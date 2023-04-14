const sorting = (data, category = null, minPrice = null, maxPrice = null, pageLimit = 24, page = 1) => {
  let filteredProducts = data
  if (category  || minPrice || maxPrice) {
    filteredProducts = data.filter((product) => {
      if (category && product.category !== category && category !== 'all') {
        return false;
      }
      if (minPrice && product.price < minPrice) {
        return false;
      }
      if (maxPrice && product.price > maxPrice) {
        return false;
      }
      return true;
    });
  }
  let result = pagination(filteredProducts, pageLimit, page);

  return result;
}

const pagination = (data, pageLimit=24, page=1) => {
  let result = {
    data: data.slice((page - 1) * pageLimit, page * pageLimit),
    total: data.length
  };
return result;
}

module.exports.sorting = sorting;

module.exports.pagination = pagination;
