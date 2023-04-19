import { useState, useEffect, FC } from "react";
import { Link, useParams } from "react-router-dom";
import { fetchData } from "../utils/API";
import { APIdata } from "./Articles";

const SingleArticle: FC = () => {
  const [articles, setArticles] = useState<APIdata[]>([]);
  const [displayedArticle, setDisplayedArticle] = useState<APIdata | undefined>(
    undefined
  );
  const { data } = useParams();
  const findArticle = (paramsTitle: string | undefined): void => {
    const displayThisArticle: APIdata | undefined = articles.find(
      (article: APIdata) => {
        return article.title == paramsTitle;
      }
    );
    if (displayThisArticle !== undefined) {
      setDisplayedArticle(displayThisArticle);
    } else {
      null;
    }
  };
  useEffect(() => {
    (async () => {
      try {
        const res = await fetchData(
          "https://newsapi.org/v2/everything?q=bitcoin&apiKey=8523bd2a5fef471f8fed4a36a53f9a25"
        );
        if (res) {
          setArticles(res.articles);
        } else {
          throw new Error("Error in calling API");
        }
      } catch (error: any) {
        throw new Error(error.message);
      }
    })();
  }, []);
  useEffect(() => {
    if (data && articles.length) {
      const decodedData = decodeURIComponent(data);
      findArticle(decodedData);
    } else {
      return;
    }
  }, [articles, data]);

  return (
    <section className="pt-40 pb-28">
      <div className="max-w-screen-xl mx-auto px-8 bg">
        <div className="items-center gap-x-12 sm:px-4 md:px-0 flex max-lg:flex-col">
          <div className="flex-1  block">
            <img
              src={
                displayedArticle?.urlToImage
                  ? displayedArticle?.urlToImage
                  : "/not-available.png"
              }
              className="md:max-w-lg sm:rounded-lg h-[300px]"
              alt=""
            />
          </div>
          <div className="max-w-xl px-4 space-y-8 mt-6 sm:px-8 md:mt-0 lg:max-w-2xl">
            <h3 className="text-indigo-600 font-semibold">
              {displayedArticle?.author}
            </h3>
            <p className="text-indigo-200 text-3xl font-semibold sm:text-4xl ">
              {displayedArticle?.title}
            </p>
            <p className="mt-3 text-gray-200 text-xl">
              {displayedArticle?.description}
            </p>
            <Link
              to="/all/everything"
              className="inline-flex gap-x-1 items-center text-indigo-600 hover:text-indigo-500 duration-150 font-medium"
            >
              Back to Articles
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                className="w-5 h-5"
              >
                <path
                  fillRule="evenodd"
                  d="M3 10a.75.75 0 01.75-.75h10.638L10.23 5.29a.75.75 0 111.04-1.08l5.5 5.25a.75.75 0 010 1.08l-5.5 5.25a.75.75 0 11-1.04-1.08l4.158-3.96H3.75A.75.75 0 013 10z"
                  clipRule="evenodd"
                />
              </svg>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};
export default SingleArticle;
