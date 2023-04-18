import { FC, useState, useEffect } from "react"

type Props={
    articlesPerPage: number;
    totalArticles: number;
    paginate: (pageNumber: number) => void;
}
export const  Pagination:FC<Props> = ({articlesPerPage, totalArticles, paginate}) => {
    const  pageNumbers = []
    const [pages, setPages] = useState<number[]>([])
    const [currentPage, setCurrentPage] = useState("1");

   useEffect(()=>{
    const findPages:number = Math.ceil(totalArticles / articlesPerPage)
    const pagesArray: number[] = [];
    for(let i = 1; i <= findPages; i++){
        pagesArray.push(i)
    }
    setPages(pagesArray)
   },[articlesPerPage, totalArticles])
   console.log(pages)

    return (
        <nav>
            { pages.length > 1 && (<ul className="flex">
                { pages.map((page:number, index: number)=>(
                    <li className="border mx-2" key={page+index+page} onClick={()=> paginate(page)}>
                        {page}
                    </li>
                ))}
            </ul>)}
        </nav>
    )
}