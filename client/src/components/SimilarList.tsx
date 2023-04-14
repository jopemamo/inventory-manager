import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import ProductList from './ProductList'

const SimilarList = () => {
  const [productList, setProductList] = useState(null)
  const [loading, setLoading] = useState(true)
  const { id } = useParams()

  const fetchingFunction = () => {
    let url = `/api/products/sorted-list?id=${id}`
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
      })
      .catch(error => console.log(error))
      .finally(() => setLoading(false))
  }

  useEffect(() => {
    fetchingFunction()
  }, [])

  if (loading) return <div>Loading...</div>

  return (
    <main>
      <h3>Similar products</h3>
      {!loading && (
        <div>
          <ProductList products={productList} />
        </div>
      )}
    </main>
  )
}

export default SimilarList
