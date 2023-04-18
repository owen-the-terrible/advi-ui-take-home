import { useState, useEffect, useCallback, FC } from 'react'
import { APIdata } from './Articles'
import { fetchData } from '../utils/API'
import { useParams } from 'react-router-dom'
import { Pagination } from './Pagination'



const AllArticles: FC = () =>{
  const [articles,setArticles] = useState<APIdata[]>([]);
  const [filteredArticles, setFilteredArticles] = useState<APIdata[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [articlesPerPage, setArticlsPerPage] = useState<number>(8);
  const indexOfLastArticle = currentPage * articlesPerPage;
  const indexOfFirstArticle = indexOfLastArticle - articlesPerPage;
  const currentArticles = filteredArticles.slice(indexOfFirstArticle, indexOfLastArticle);
  const {data} = useParams();
  const paginate = useCallback((pageNumber:number) => {
    setCurrentPage(pageNumber);
    console.log(currentPage)
  }, [setCurrentPage]);
  const paramFilter = (name: string) =>{
    if(name !== 'everything'){
    const filteredArticlesCompleted = articles.slice().filter((item:APIdata, index:number)=>{
      if(item.source.name === name){
        return item;
      }else{
        return '';
      }
      
    })
    console.log(filteredArticles)
    setFilteredArticles(filteredArticlesCompleted)
    return filteredArticlesCompleted;
  }else{
    setFilteredArticles(articles)
    return articles
  }
  }
  useEffect(() => {
    (async () =>{
       try{
         const resData = await fetchData("https://newsapi.org/v2/everything?q=bitcoin&apiKey=8523bd2a5fef471f8fed4a36a53f9a25");
         if (resData) {
           setArticles(resData.articles);
         }else{
           throw new Error("Error in calling API");
         }

       }catch(error:any){
         throw new Error(error.message)

       }
     })();
   },[]);
   useEffect(()=>{
    if(data){
    paramFilter(data)
    }else{
      return
    }
   },[articles, data])
return(
    
   <div className="mx-auto mt-32 max-w-7xl px-6 sm:mt-40 lg:px-8">
   <div className="mx-auto max-w-2xl lg:mx-0">
     <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">{data}</h2>
     <p className="mt-6 text-lg leading-8 text-gray-300">
       <Pagination articlesPerPage={articlesPerPage} totalArticles={filteredArticles.length} paginate={paginate}/>
     </p>
   </div>
   <ul
     role="list"
     className="mx-auto mt-20 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-14 sm:grid-cols-2 lg:mx-0 lg:max-w-none lg:grid-cols-3 xl:grid-cols-4"
   >
     {currentArticles.map((article:APIdata) => (
       <li key={article.title}>
         <img className="aspect-[14/13] w-full rounded-2xl object-cover" src={article.urlToImage ? article.urlToImage : '/not-available.png'} alt="" />
         <h3 className="mt-6 text-lg font-semibold leading-8 tracking-tight text-white">{article.title}</h3>
         <p className="text-base leading-7 text-gray-300">{article.source.name}</p>
         <p className="text-sm leading-6 text-gray-500">{article.description.slice(0,110) + '...'}</p>
       </li>
     ))}
   </ul>
 </div>
)
}
export default AllArticles