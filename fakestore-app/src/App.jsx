
import './App.css'
import NavbarCustom from './components/Navbar.jsx'

function App() {

  return (
    <>
      <NavbarCustom />
      <div className="welcome-container mt-5">
        <h1 className="welcome-header">Welcome to Lunelle</h1>
        <p className="welcome-subtext">
          Step into a world where moonlight meets gemstones.<br />
          Each piece is a little spell waiting to be chosen —<br />
          will you find the one that shines just for you?
        </p>
        <button className="enchant-btn mt-4">Enchant Your Style</button>
      </div>

    </>
  )
}

export default App
