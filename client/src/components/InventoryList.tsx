import { useState, useEffect } from 'react'
import { CATEGORY_DROPDOWN } from '../util/dropdownData'
import ProductList from './ProductList'

const InventoryList = () => {
  const [searchQuery, setSearchQuery] = useState({
    category: '',
    minPrice: '',
    maxPrice: '',
  })
  const [currentPage, setCurrentPage] = useState(1)
  const [totalProducts, setTotalProducts] = useState(24)
  const [productList, setProductList] = useState(null)
  const [loading, setLoading] = useState(true)

  const createFilterQueryString = (filters: { [x: string]: string }) => {
    const params = new URLSearchParams()

    for (const key in filters) {
      if (filters[key] !== undefined && filters[key] !== null) {
        params.append(key, filters[key])
      }
    }

    return params.toString()
  }
  const fetchingFunction = () => {
    let url = '/api/products'
    const queryString = createFilterQueryString({ ...searchQuery, page: `${currentPage}` })
    if (queryString) {
      url += `?${queryString}`
    }
    fetch(url, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    })
      .then(response => {
        if (response.ok) return response.json()
        throw response
      })
      .then(data => {
        setProductList(data.data)
        setTotalProducts(data.total)
      })
      .catch(error => console.log(error))
      .finally(() => setLoading(false))
  }

  useEffect(() => {
    fetchingFunction()
  }, [])

  const handlePageChange = (newPage: number, e: any) => {
    setLoading(true)
    setCurrentPage(newPage)
    handleSubmit(e)
  }

  const handleChange = (e: any) => {
    setSearchQuery({
      ...searchQuery,
      [e.target.name]: e.target.value,
    })
    setCurrentPage(1)
  }

  const handleSubmit = (e: any) => {
    e.preventDefault()
    fetchingFunction()
  }
  if (loading) return <div>Loading...</div>

  return (
    <main>
      <h3>Filter the inventory list</h3>
      <form className="form" onSubmit={handleSubmit}>
        <span>Food's category: </span>
        <select name="category" onChange={handleChange} value={searchQuery.category}>
          <option value="all">all</option>
          {CATEGORY_DROPDOWN.map((category, index) => (
            <option key={index} value={category.name}>
              {category.name}
            </option>
          ))}
        </select>
        <br />
        <span>Min Price: </span>
        <div>
          <input
            type="number"
            name="minPrice"
            min="1"
            step=".01"
            value={searchQuery.minPrice}
            onChange={handleChange}
          />{' '}
          <span>Nok</span>
        </div>
        <br />
        <span>Max Price: </span>
        <div>
          <input
            type="number"
            name="maxPrice"
            min="1"
            step=".01"
            value={searchQuery.maxPrice}
            onChange={handleChange}
          />{' '}
          <span>Nok</span>
        </div>
        <div className="form_buttons">
          <input className="form_button" type="submit" value="Search" />
        </div>
      </form>
      {!loading && (
        <div>
          <ProductList products={productList} />
          <div className="pagination_buttons">
            <button disabled={currentPage < 2} onClick={e => handlePageChange(currentPage - 1, e)}>
              Previous
            </button>
            <button
              disabled={Math.floor(totalProducts / 24) <= currentPage}
              onClick={e => handlePageChange(currentPage + 1, e)}
            >
              Next
            </button>
          </div>
        </div>
      )}
    </main>
  )
}

export default InventoryList
