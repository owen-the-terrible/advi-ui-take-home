import { useState, useEffect, useRef, SyntheticEvent } from 'react';
import { BrowserRouter, Route, Routes} from 'react-router-dom'
import Articles from "./components/Articles"
import AllArticles from './components/AllArticles';
import SingleArticle from './components/SingleArticle';
export default function App() {
const [articles, setArticles] = useState([]);
const apiKey = '8523bd2a5fef471f8fed4a36a53f9a25'

  return (

    <BrowserRouter>
    <Routes>
      <Route path='/' element={<Articles />}>
      <Route path="all" element={<AllArticles/>} />
      <Route path="article/:data" element={<SingleArticle/>} />

      </Route>

    </Routes>
    </BrowserRouter>
  )
}
