import Form from '../components/Form'
import { useNavigate } from 'react-router-dom'

const Home = () => {
  const navigate = useNavigate()

  return (
    <main>
      <h1>Inventory Manager</h1>
      <Form />
      <div className="form_buttons">
        <button className="form_button" type="button" onClick={() => navigate('/inventory')}>
          Inventory
        </button>
      </div>
    </main>
  )
}

export default Home
