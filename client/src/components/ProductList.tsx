import { useNavigate } from 'react-router-dom'

const ProductList = ({ products, showSimilar = false }: any) => {
  const navigate = useNavigate()
  return (
    <ul className="list_products">
      {products
        ?.sort((a: any, b: any) => {
          if (a.category < b.category) {
            return -1
          }
          if (a.category > b.category) {
            return 1
          }
          return 0
        })
        .map((product: any) => (
          <li className="list_product" key={product.id}>
            <div>
              {product.category}-{product.name}-{product.price}kr.
            </div>
            {showSimilar && (
              <button
                style={{ marginLeft: '5px' }}
                type="button"
                onClick={() => navigate(`/product/${product.id}`)}
              >
                Find similar
              </button>
            )}
          </li>
        ))}
    </ul>
  )
}

export default ProductList
