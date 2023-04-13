const ProductList = ({ products }: any) => {
  return (
    <div>
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
          <div key={product.id}>
            <div>
              {product.category}-{product.name}-{product.price}kr.
            </div>
          </div>
        ))}
    </div>
  )
}

export default ProductList
