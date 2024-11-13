import "./App.scss";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "../src/components/Header/Header"
import Footer from "../src/components/Footer/Footer"

function App() {

  return (
    <BrowserRouter>
    <Header/>
    <Routes>

    </Routes>
    <Footer/>
    </BrowserRouter>
  )
}

export default App