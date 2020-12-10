import React, { useState, useEffect } from 'react';
import { CATEGORY_DROPDOWN } from '../util/dropdownData';

const Form = () => {

  const [product, setProduct] = useState({
    name: '',
    category: 'meat',
    price: 0
  });

  const [categoryOptions, setcategoryOptions] = useState(CATEGORY_DROPDOWN);

  useEffect(() => { setcategoryOptions(CATEGORY_DROPDOWN) }, [categoryOptions]);

  const handleChange = (e) => {
    if (e.target.name === 'category') {
      const index = e.target.value;
      setProduct({
        ...product,
        category: categoryOptions[index].name,
      })
    } else {
      setProduct({
        ...product,
        [e.target.name]: e.target.value
      });
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch('http://localhost:3001/products/new-product', {
      method: 'POST',
      body: JSON.stringify(product),
      headers: { 'Content-Type': 'application/json' }
    })
      .catch(error => console.log(error));
    setProduct({
      name: '',
      category: 'meat',
      price: 0
    });
  }

  return (
    <main>
      <h3>Create a new product</h3>
      <form className="form" onSubmit={handleSubmit}>
        <span>Food's category: </span>
        <select name="category" onChange={handleChange}>
          {categoryOptions.map((category, index) => <option key={index} value={category.id}>{category.name}</option>)}
        </select>
        <br />
        <span>Name: </span>
        <input type="text" name="name" placeholder="Name of the product" value={product.name} onChange={handleChange} required />
        <br />
        <span>Price: </span>
        <div>
          <input type="number" name="price" min="1" step=".01" value={product.price} onChange={handleChange} /> <span>Nok</span>
        </div>
        <div className="form_buttons">
          <input className="form_button" type="submit" value="Calculate" />
        </div>
      </form>
    </main>
  )
}

export default Form;