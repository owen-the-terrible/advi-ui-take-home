import { useState, useEffect, FC } from "react";
import SingleCategoryArticlesSection from "./SingleCategoryArticles";
export interface Source {
  source: string | null;
  name: string | null;
}

export interface APIdata {
  author: string | null;
  content: string;
  description: string;
  publishedAt: string;
  source: Source;
  title: string;
  url: string;
  urlToImage: string | null;
}
export interface sortedAPIdata {
  [key: string]: APIdata[];
}
export type sortedAPIdataType = {
  [key: string]: APIdata[];
};
export type displayType = [string, APIdata[]][];
export const Articles: FC = () => {
  const [articles, setArticles] = useState([]);
  const [topFeedState, setTopFeedState] = useState<sortedAPIdata>({});
  const [groupedApiDataState, setGroupedApiDataState] = useState<sortedAPIdata>(
    {}
  );
  ////// METHODS
  const topFeedSearch = (object: sortedAPIdataType): sortedAPIdata => {
    const topFeeds: sortedAPIdata = {};
    const arrays = Object.entries(object).filter(([_, value]) =>
      Array.isArray(value)
    );
    const sortedArrays = arrays.sort((a, b) => b[1].length - a[1].length);
    sortedArrays.slice(0, 4).map(([key, value]) => {
      topFeeds[key] = value;
    });
    setTopFeedState(topFeeds);
    return topFeeds;
  };
  const assignGrouping = () => {
    const groupedAPIdata: sortedAPIdata = {};
    articles.forEach((obj: any) => {
      const groupName = obj.source.name;
      if (!groupedAPIdata[groupName]) {
        groupedAPIdata[String(groupName)] = [];
      }
      groupedAPIdata[groupName].push(obj);
    });
    setGroupedApiDataState(groupedAPIdata);
    return groupedAPIdata;
  };
  ////// ON MOUNT OR STATE CHANGE
  useEffect(() => {
    const url =
      "https://newsapi.org/v2/everything?q=bitcoin&apiKey=8523bd2a5fef471f8fed4a36a53f9a25";

    const fetchData = async () => {
      try {
        const response = await fetch(url);

        if (!response.ok) {
          throw new Error("Error fetching articles");
        }
        const data = await response.json();
        if (data) {
          setArticles(data.articles);
        } else {
          throw new Error("Error fetching articles");
        }
      } catch (error: any) {
        throw new Error(error.message);
      }
    };
    fetchData();
    return () => {
      setArticles([]);
    };
  }, []);
  useEffect(() => {
    assignGrouping();
  }, [articles]);
  useEffect(() => {
    topFeedSearch(groupedApiDataState);
  }, [groupedApiDataState]);

  return (
    <div className="bg-gray-900">
      <main className="relative isolate">
        <div
          className="absolute inset-x-0 top-4 -z-10 flex transform-gpu justify-center overflow-hidden blur-3xl"
          aria-hidden="true"
        >
          <div
            className="aspect-[1108/632] w-[69.25rem] flex-none bg-gradient-to-r from-[#80caff] to-[#4f46e5] opacity-25"
            style={{
              clipPath:
                "polygon(73.6% 51.7%, 91.7% 11.8%, 100% 46.4%, 97.4% 82.2%, 92.5% 84.9%, 75.7% 64%, 55.3% 47.5%, 46.5% 49.4%, 45% 62.9%, 50.3% 87.2%, 21.3% 64.1%, 0.1% 100%, 5.4% 51.1%, 21.4% 63.9%, 58.9% 0.2%, 73.6% 51.7%)",
            }}
          />
        </div>
        <>
          <div className="mt-32 sm:mt-40 xl:mx-auto xl:max-w-7xl xl:px-8">
            <img
              loading="lazy"
              src="/news.png"
              alt="news background"
              className="aspect-[9/4] w-full object-cover xl:rounded-3xl"
            />
          </div>

          <div className="mx-auto mt-32 max-w-7xl px-6 sm:mt-40 lg:px-8">
            <div className="mx-auto max-w-2xl lg:mx-0">
              <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
                Top News
              </h2>
            </div>
            <SingleCategoryArticlesSection placement={0} data={topFeedState} />
          </div>
          <SingleCategoryArticlesSection placement={2} data={topFeedState} />
        </>
      </main>
    </div>
  );
};

export default Articles;
