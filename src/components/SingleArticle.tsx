import { useState, useEffect, FC } from "react";
import { useParams } from "react-router-dom";
import { fetchData } from "../utils/API";
import { APIdata } from "./Articles";

const SingleArticle: FC = () => {
  const [articles, setArticles] = useState<APIdata[]>([]);
  const [displayedArticle, setDisplayedArticle] = useState<APIdata | undefined>(undefined);
  const {data} = useParams();
  const findArticle = (paramsTitle: string | undefined):void =>{
    console.log(paramsTitle)
    const displayThisArticle: APIdata | undefined =  articles.find((article: APIdata)=> {
      console.log(article)
      console.log(article.title)
      return article.title == paramsTitle});
    // console.log(displayThisArticle)
    if(displayThisArticle !== undefined){
    setDisplayedArticle(displayThisArticle);
    }else{
      null
    }
  }

  useEffect(() => {
    (async () => {
      try {
        const res = await fetchData("https://newsapi.org/v2/everything?q=bitcoin&apiKey=8523bd2a5fef471f8fed4a36a53f9a25");
        if (res) {
          setArticles(res.articles);
          console.log(res);
        } else {
          throw new Error("Error in calling API");
        }
      } catch (error: any) {
        throw new Error(error.message);
      }
    })();
  }, []);
  useEffect(()=>{
    if(data && articles.length){
    findArticle(data)
    }else{
      return
    }
  },[articles, data])

  return <div>{displayedArticle !== undefined ? displayedArticle.title : "No Article has this title."}</div>;
};
export default SingleArticle;
