import InventoryList from 'components/InventoryList'
import { useNavigate } from 'react-router-dom'

const Inventory = () => {
  const navigate = useNavigate()
  return (
    <main>
      <h1>Inventory </h1>
      <InventoryList />
      <div className="form_buttons" style={{ marginTop: '20px' }}>
        <button className="form_button" type="button" onClick={() => navigate('/')}>
          New Product
        </button>
      </div>
    </main>
  )
}

export default Inventory
