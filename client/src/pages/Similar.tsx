import SimilarList from '../components/SimilarList'
import { useNavigate } from 'react-router-dom'

const Home = () => {
  const navigate = useNavigate()

  return (
    <main>
      <h1>Inventory Manager</h1>
      <SimilarList />
      <div className="form_buttons" style={{ marginTop: '20px' }}>
        <button className="form_button" type="button" onClick={() => navigate('/')}>
          New Product
        </button>
        <button className="form_button" type="button" onClick={() => navigate('/inventory')}>
          Inventory
        </button>
      </div>
    </main>
  )
}

export default Home