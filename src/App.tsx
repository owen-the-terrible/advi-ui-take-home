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


// const url = 'https://newsapi.org/v2/top-headlines';
// const params = {
//   country: 'us',
//   apiKey: '8523bd2a5fef471f8fed4a36a53f9a25'
// };

// fetch(url, { params })
//   .then(response => {
//     if (response.status === 200) {
//       const data = response.data;
//       const articles = data.articles;
//       for (const article of articles) {
//         console.log(article.title);
//       }
//     } else {
//       console.log('Error: ', response.status);
//     }
//   })
//   .catch(error => {
//     console.log('Error: ', error);
//   });

export const VerificationCode = () => {
  const fieldsRef = useRef<null | HTMLDivElement>(null);
  const [state, setState] = useState({
    code1: "",
    code2: "",
    code3: "",
    code4: "",
    code5: "",
    code6: "",
  });

  // Switch to input fields method
  const inputFocus = (event: SyntheticEvent<HTMLInputElement>) => {
    if (fieldsRef.current) {
      const elements = fieldsRef.current.children;
      const dataIndex = (event.target as HTMLInputElement).getAttribute("data-index"); 
      if ('key' in event && (event.key === "Delete" || event.key === "Backspace")) {
        const next = dataIndex !== null ? +dataIndex - 1 : 0;
        if (next > -1) {
          (elements[next] as HTMLInputElement).focus();
        }
      } else {
        const next = dataIndex !== null ? +dataIndex + 1 : 0;
        if (
          next < elements.length &&
          (event.target as HTMLInputElement).value != " " &&
          (event.target as HTMLInputElement).value != "" &&
          'key' in event &&
          (event.key as string).length == 1
        ) {
          const element = elements[next] as HTMLInputElement;
          element.focus();
        }
      }
    }
  };

  const handleChange = (
    e: SyntheticEvent<HTMLInputElement>,
    codeNumber: string
  ) => {
    const { value } = e.target as HTMLInputElement;
    setState({ ...state, [codeNumber]: value.slice(value.length - 1) });
  };

  return (
    <div>
      <label className="text-gray-600">Enter pass code</label>
      <div ref={fieldsRef} className="mt-2 flex items-center gap-x-2">
        <input
          type="text"
          data-index="0"
          placeholder="0"
          value={state.code1}
          className="w-12 h-12 rounded-lg border focus:border-purple-600 outline-none text-center text-2xl"
          onChange={(e) => handleChange(e, "code1")}
          onKeyUp={inputFocus}
        />
        <input
          type="text"
          data-index="1"
          placeholder="0"
          value={state.code2}
          className="w-12 h-12 rounded-lg border focus:border-purple-600 outline-none text-center text-2xl"
          onChange={(e) => handleChange(e, "code2")}
          onKeyUp={inputFocus}
        />
        <input
          type="text"
          data-index="2"
          placeholder="0"
          value={state.code3}
          className="w-12 h-12 rounded-lg border focus:border-purple-600 outline-none text-center text-2xl"
          onChange={(e) => handleChange(e, "code3")}
          onKeyUp={inputFocus}
        />
        <input
          type="text"
          data-index="3"
          placeholder="0"
          value={state.code4}
          className="w-12 h-12 rounded-lg border focus:border-purple-600 outline-none text-center text-2xl"
          onChange={(e) => handleChange(e, "code4")}
          onKeyUp={inputFocus}
        />
        <input
          type="text"
          data-index="4"
          placeholder="0"
          value={state.code5}
          className="w-12 h-12 rounded-lg border focus:border-purple-600 outline-none text-center text-2xl"
          onChange={(e) => handleChange(e, "code5")}
          onKeyUp={inputFocus}
        />
        <input
          type="text"
          data-index="5"
          placeholder="0"
          value={state.code6}
          className="w-12 h-12 rounded-lg border focus:border-purple-600 outline-none text-center text-2xl"
          onChange={(e) => handleChange(e, "code6")}
          onKeyUp={inputFocus}
        />
      </div>
    </div>
  );
};