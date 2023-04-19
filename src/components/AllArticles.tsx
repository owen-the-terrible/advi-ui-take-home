import { useState, useEffect, useCallback, FC, FormEvent } from "react";
import "react-datepicker/dist/react-datepicker.css";
import { Link, useParams } from "react-router-dom";
import NotFoundModal from "./NotFoundModal";
import DatePicker from "react-datepicker";
import Pagination from "./Pagination";
import { fetchData } from "../utils/API";
import { APIdata } from "./Articles";

const AllArticles: FC = () => {
  const [filteredArticles, setFilteredArticles] = useState<APIdata[]>([]);
  const [selectedItemName, setSelectedItemName] = useState<string>("");
  const [startDateCompare, setStartDateCompare] = useState<Date>();
  const [filteringInput, setFilteringInput] = useState<string>("");
  const [endDateCompare, setEndDateCompare] = useState<Date>();
  const [selectedItem, setSelectedItem] = useState<number>(0);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [articles, setArticles] = useState<APIdata[]>([]);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [articlesPerPage] = useState<number>(8);
  const [startDate] = useState(new Date());
  const paginate = useCallback(
    (pageNumber: number) => {
      setCurrentPage(pageNumber);
    },
    [setCurrentPage]
  );
  const { data } = useParams();
  /////// NON-Hook CONSTANTS
  const tabItems = ["Title", "Description", "Author", "Source", "Date"];
  const indexOfLastArticle = currentPage * articlesPerPage;
  const indexOfFirstArticle = indexOfLastArticle - articlesPerPage;
  const currentArticles = filteredArticles.slice(
    indexOfFirstArticle,
    indexOfLastArticle
  );
  /////// METHODS
  const encodedURI = (value: string): string => {
    return encodeURIComponent(value);
  };
  //Filtering
  const dateFilter = (
    valueStart: Date | undefined,
    valueEnd: Date | undefined
  ): void => {
    if (valueStart !== undefined && valueEnd !== undefined) {
      const formattedStart = new Date(valueStart);
      const formattedEnd = new Date(valueEnd);
      const filterByDate = articles.filter((article: APIdata) => {
        const formattedArticleDate = new Date(article.publishedAt);
        if (
          formattedArticleDate >= formattedStart &&
          formattedArticleDate <= formattedEnd
        ) {
          return article;
        } else {
          return false;
        }
      });
      if (filterByDate) {
        setFilteredArticles(filterByDate);
      } else {
        setIsOpen(true);
      }
    } else {
      throw new Error("Date Error.");
    }
  };
  const paramFilter = (name: string) => {
    if (name !== "everything") {
      const filteredArticlesCompleted = articles
        .slice()
        .filter((item: APIdata) => {
          if (item.source.name === name) {
            return item;
          } else {
            return "";
          }
        });
      if (filteredArticlesCompleted) {
        setFilteredArticles(filteredArticlesCompleted);
        return filteredArticlesCompleted;
      } else {
        setIsOpen(true);
        return null;
      }
    } else {
      setFilteredArticles(articles);
      return articles;
    }
  };
  const selectedItemNameSubmitFilter = (value: string): void => {
    const formattedSelectedItem =
      selectedItemName.toLowerCase() as keyof APIdata;
    const filteredByItemName = articles.filter((article: APIdata) => {
      const checkForSource =
        formattedSelectedItem !== "source"
          ? article[formattedSelectedItem]?.toString()
          : article.source.name
          ? article.source.name
          : "";
      const regexCheck: boolean = new RegExp(value, "gi").test(
        checkForSource || "none"
      );
      if (regexCheck && checkForSource != "") {
        return article;
      } else {
        return false;
      }
    });
    if (filteredByItemName.length) {
      setFilteredArticles(filteredByItemName);
      setFilteringInput("");
    } else {
      setFilteringInput("");
      setIsOpen(true);
    }
  };
  //Input Handling
  const handleFilteringInput = (event: FormEvent<HTMLInputElement>): void => {
    setFilteringInput(event.currentTarget.value);
  };
  const executeFilteringSelection = (index: number): void => {
    setSelectedItem(index);
    setSelectedItemName(tabItems[index]);
    setFilteringInput("");
  };
  const startDateChangeHandler = (value: Date) => {
    setStartDateCompare(value);
  };
  const endDateChangeHandler = (value: Date) => {
    setEndDateCompare(value);
  };
  const handleDateSubmit = (): void => {
    dateFilter(startDateCompare, endDateCompare);
  };
  /////// ON MOUNT OR STATE CHANGE
  useEffect(() => {
    (async () => {
      try {
        const resData = await fetchData(
          "https://newsapi.org/v2/everything?q=bitcoin&apiKey=8523bd2a5fef471f8fed4a36a53f9a25"
        );
        if (resData) {
          setArticles(resData.articles);
        } else {
          throw new Error("Error in calling API");
        }
      } catch (error: any) {
        throw new Error(error.message);
      }
    })();
  }, []);
  useEffect(() => {
    if (data) {
      paramFilter(data);
      setSelectedItem(0);
      setSelectedItemName("");
      setFilteringInput("");
    } else {
      return;
    }
  }, [articles, data]);
  //////////////////////////
  return (
    <div className="mx-auto mt-4 max-w-7xl px-6 sm:mt-10 lg:px-8">
      <div className="mx-auto max-w-2xl lg:mx-0">
        <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
          { data == 'everything' ? 'All Articles' : data }
        </h2>
        <div className="mt-6 text-lg leading-8 text-gray-300">
          <Pagination
            currentPage={currentPage}
            paginate={paginate}
            articlesPerPage={articlesPerPage}
            totalArticles={filteredArticles.length}
          />
        </div>
        <div className="mx-auto max-w-2xl lg:mx-0">
          <div className="px-6">
            <h2 className="text-xl font-bold tracking-tight text-white sm:text-2xl mt-10">
              SEARCH BY:
            </h2>
            <ul
              role="tablist"
              className="max-w-screen-xl mx-auto  flex items-center gap-x-3 overflow-x-auto text-sm"
            >
              {tabItems.map((item: string, idx: number) => (
                <li
                  key={idx}
                  className={`py-2  ${
                    selectedItemName == tabItems[idx]
                      ? "border-indigo-600 text-indigo-600 border-b-2"
                      : "border-white text-gray-500"
                  }`}
                >
                  <button
                    role="tab"
                    aria-selected={selectedItem == idx ? true : false}
                    aria-controls={`tabpanel-${idx + 1}`}
                    className="py-2.5 px-4 rounded-lg duration-150 hover:text-indigo-600 hover:bg-gray-50 active:bg-gray-100 font-medium"
                    onClick={() => executeFilteringSelection(idx)}
                  >
                    {item}
                  </button>
                </li>
              ))}
            </ul>
          </div>
          {selectedItemName === "Date" ? (
            <div className="mx-auto max-w-3xl lg:mx-0 flex justify-center mt-8">
              <DatePicker
                onChange={startDateChangeHandler}
                startDate={startDate}
                className="bg-indigo-50  rounded text-indigo-600"
                selected={startDateCompare}
                placeholderText="From: 00/00/00"
              />
              <DatePicker
                onChange={endDateChangeHandler}
                startDate={startDate}
                className="bg-indigo-50  rounded text-indigo-600"
                selected={endDateCompare}
                placeholderText="To: 00/00/00"
              />
              <button
                onClick={() => handleDateSubmit()}
                className="mt-1 whitespace-nowrap px-3 py-1.5 text-sm text-indigo-600 duration-150 bg-indigo-50 rounded-lg hover:bg-indigo-100 border-b active:bg-indigo-200 mb-3"
              >
                Find Articles
              </button>
            </div>
          ) : selectedItemName !== "" ? (
            <div className="mx-auto max-w-3xl lg:mx-0 flex justify-evenly mt-8">
              <input
                type="text"
                className="bg-indigo-50  rounded text-indigo-600 md:w-[400px]"
                placeholder={`${selectedItemName.toUpperCase()}: `}
                value={filteringInput}
                onChange={(e) => handleFilteringInput(e)}
              />
              <button
                onClick={() => selectedItemNameSubmitFilter(filteringInput)}
                className="mt-1 whitespace-nowrap px-3 py-1.5 text-sm text-indigo-600 duration-150 bg-indigo-50 rounded-lg hover:bg-indigo-100 border-b active:bg-indigo-200 mb-3"
              >
                Find Articles
              </button>
            </div>
          ) : (
            <></>
          )}
        </div>
      </div>
      <ul
        role="list"
        className="mx-auto mt-20 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-14 sm:grid-cols-2 lg:mx-0 lg:max-w-none lg:grid-cols-3 xl:grid-cols-4"
      >
        {currentArticles.map((article: APIdata) => (
          <li key={article.title} className="cursor-pointer">
            <Link to={`/article/${encodedURI(article.title)}`}>
              <img
                className="aspect-[14/13] w-full rounded-2xl object-cover"
                src={
                  article.urlToImage ? article.urlToImage : "/not-available.png"
                }
                alt=""
              />
              <h3 className="mt-6 text-lg font-semibold leading-8 tracking-tight text-white">
                {article.title}
              </h3>
              <p className="text-base leading-7 text-gray-300">
                {article.source.name}
              </p>
              <p className="text-sm leading-6 text-gray-500">
                {article.description.slice(0, 110) + "..."}
              </p>
            </Link>
          </li>
        ))}
      </ul>
      {isOpen && <NotFoundModal setIsOpen={setIsOpen} />}
    </div>
  );
};
export default AllArticles;
