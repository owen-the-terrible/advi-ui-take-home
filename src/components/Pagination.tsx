import { FC, useState, useEffect } from "react";

type Props = {
    currentPage: number;
    totalArticles: number;
    articlesPerPage: number;
    paginate: (pageNumber: number) => void;
};
const Pagination: FC<Props> = ({
  articlesPerPage,
  totalArticles,
  paginate,
  currentPage
}) => {
  const [pages, setPages] = useState<number[]>([]);
  useEffect(() => {
    const findPages: number = Math.ceil(totalArticles / articlesPerPage);
    const pagesArray: number[] = [];
    for (let i = 1; i <= findPages; i++) {
      pagesArray.push(i);
    }
    setPages(pagesArray);
  }, [articlesPerPage, totalArticles]);

  return (
    <nav className=" max-sm:w-[300px] ">
      {pages.length > 1 && (
        <ul className="flex max-sm:flex-wrap">
          {pages.map((page: number, index: number) => (
            <li
              className={index === (currentPage - 1) ? 'border-b-2 border-indigo-600 mx-3' : 'mx-3'}
              key={page + index + page}
              onClick={() => paginate(page)}
            >
              <button className="px-1 sm:px-3 py-0.5 sm:py6-1.5 text-sm text-indigo-600 duration-150 bg-indigo-50 rounded-lg hover:bg-indigo-100 border-b active:bg-indigo-200 mb-3">
              {page}
              </button>
              
            </li>
          ))}
        </ul>
      )}
    </nav>
  );
};
export default Pagination;