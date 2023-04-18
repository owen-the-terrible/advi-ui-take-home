import { useState, useEffect, FC } from "react";
import { Dialog } from "@headlessui/react";
import {
  Bars3Icon,
  XMarkIcon,
} from "@heroicons/react/24/outline";

import { Outlet, useParams } from "react-router";
import { Link, useLocation } from "react-router-dom";
import FooterDisplay from "./FooterDisplay";
import { fetchData } from "../utils/API";

interface NavigationItem {
  name: string;
  href: string;
}

const navigation: NavigationItem[] = [
  { name: "Business Insider", href: "#" },
  { name: "Google News", href: "#" },
  { name: "Gizmodo.com", href: "#" },
  { name: "heise online", href: "#" },
];

export interface Source {
  source: string | null;
  name: string | null;
}
export interface PromiseAPI{
  articles: APIdata[];
  status: string;
  totalResults: number;
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

export const Root: FC = () => {
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [articles, setArticles] = useState<APIdata[]>([]);
  const [groupedApiDataState, setGroupedApiDataState] = useState<sortedAPIdata>(
    {}
  );
  const [topFeedState, setTopFeedState] = useState<sortedAPIdata>({});
  const [topFooterFeedState, setTopFooterFeedState] = useState<sortedAPIdata>(
    {}
  );
  const [footerDisplayState, setFooterDisplayState] = useState<sortedAPIdata>(
    {}
  );
  const params = useParams();
    console.log("location, params: ", location, params)
  const topFeedSearch = (object: sortedAPIdataType): sortedAPIdata => {
    const topFeeds: sortedAPIdata = {};
    const arrays = Object.entries(object).filter(([_, value]) =>
      Array.isArray(value)
    );
    const sortedArrays = arrays.sort((a, b) => b[1].length - a[1].length);
    sortedArrays.slice(0, 4).map(([key, value]) => {
      topFeeds[key] = value;
      //   footerTopFeeds[key] = value;
    });
    setTopFeedState(topFeeds);
    setTopFooterFeedState(topFeeds);

    return topFeeds;
  };

  const assignFooterDisplayValues = (object: sortedAPIdataType): void => {
    const footerDisplay: sortedAPIdata = {};
    for (const key in object) {
      const checkFeedPlacement = topFeedState[key];
      if (checkFeedPlacement == undefined) {
        footerDisplay[key] = object[key];
      }
    }
    setFooterDisplayState(footerDisplay);
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
  const encodedData = groupedApiDataState["Business Insider"]?.length
    ? encodeURIComponent(
        JSON.stringify(groupedApiDataState["Business Insider"][0])
      )
    : encodeURIComponent(JSON.stringify({ name: "nothing" }));


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
  useEffect(() => {
    assignGrouping();
  }, [articles]);
  useEffect(() => {
    topFeedSearch(groupedApiDataState);
  }, [groupedApiDataState]);
  useEffect(() => {
    assignFooterDisplayValues(groupedApiDataState);
  }, [topFeedState]);

  return (
    <div className="bg-gray-900">
      {/* Header */}
      <header className="absolute inset-x-0 top-0 z-50">
        <nav
          className="mx-auto flex max-w-7xl items-center justify-between p-6 lg:px-8"
          aria-label="Global"
        >
          <div className="flex lg:flex-1">
            <Link to="/" className="-m-1.5 p-1.5">
              <span className="sr-only">Your Company</span>
              <img
                loading="lazy"
                className="h-8 w-auto rounded"
                src="/adviLogo.png"
                alt=""
              />
            </Link>
          </div>
          <div className="flex lg:hidden">
            <button
              type="button"
              className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-400"
              onClick={() => setMobileMenuOpen(true)}
            >
              <span className="sr-only">Open main menu</span>
              <Bars3Icon className="h-6 w-6" aria-hidden="true" />
            </button>
          </div>
          <div className="hidden lg:flex lg:gap-x-12">
            {navigation.map((item) => (
              <Link
                key={item.name}
                className="text-sm font-semibold leading-6 text-white"
                to={`/all/${item.name}`}
              >
                {item.name}
              </Link>
            ))}
          </div>
          <div className="hidden lg:flex lg:flex-1 lg:justify-end">
            <a href="#" className="text-sm font-semibold leading-6 text-white">
              Log in <span aria-hidden="true">&rarr;</span>
            </a>
          </div>
        </nav>
        <Dialog
          as="div"
          className="lg:hidden"
          open={mobileMenuOpen}
          onClose={setMobileMenuOpen}
        >
          <div className="fixed inset-0 z-50" />
          <Dialog.Panel className="fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-gray-900 px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-white/10">
            <div className="flex items-center justify-between">
              <button
                type="button"
                className="-m-2.5 rounded-md p-2.5 text-gray-400"
                onClick={() => setMobileMenuOpen(false)}
              >
                <span className="sr-only">Close menu</span>
                <XMarkIcon className="h-6 w-6" aria-hidden="true" />
              </button>
            </div>
            <div className="mt-6 flow-root">
              <div className="-my-6 divide-y divide-gray-500/25">
                <div className="space-y-2 py-6">
                  {navigation.map((item) => (
                    <a
                      key={item.name}
                      href={item.href}
                      className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-white hover:bg-gray-800"
                    >
                      {item.name}
                    </a>
                  ))}
                </div>
                <div className="py-6">
                  <a
                    href="#"
                    className="-mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold leading-7 text-white hover:bg-gray-800"
                  >
                    Log in
                  </a>
                </div>
              </div>
            </div>
          </Dialog.Panel>
        </Dialog>
      </header>

      <main className="relative isolate">
        {/* Background */}
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

        {/* Header section */}
        <div className="px-6 pt-14 lg:px-8">
          {/* save */}
          <div className="mx-auto max-w-2xl pt-24 text-center sm:pt-40">
            {location.pathname == "/" && (
              <>
                <h2 className="text-4xl font-bold tracking-tight text-white sm:text-6xl">
                  Welcome to the Advi Bitcoin News API
                </h2>
                <p className="mt-6 text-lg leading-8 text-gray-300">
                  Introducing the ultimate news searching app, Advi News App!
                  With this app, you can easily search through a variety of Bitcoin 
                  news feeds to find the information you're looking
                  for. Our app makes it easy to stay up-to-date on the latest
                  happenings around the world in Bitcoin. With just a few clicks, you'll be
                  able to browse through a wealth of information from top news
                  sources, all in one convenient place. Say goodbye to endless
                  scrolling and searching - download our app today and start
                  exploring the world of news!
                </p>
              </>
            )}
          </div>
        </div>
        <Outlet />
      </main>

      {/* Footer */}
      <footer
        className="relative mt-32 sm:mt-40"
        aria-labelledby="footer-heading"
      >
        <h2 id="footer-heading" className="sr-only">
          Footer
        </h2>
        <div className="mx-auto max-w-7xl px-6 pb-8 lg:px-8">
          <div className="xl:grid xl:grid-cols-3 xl:gap-8">
            <div className="space-y-8">
              <img
                loading="lazy"
                className="h-7 rounded"
                src="/adviLogo.png"
                alt="Company name"
              />
              <p className="text-sm leading-6 text-gray-300">
                We deliver news article searching that eliminates friction
                points in the readers experienece.
              </p>
              <div className="flex space-x-6"></div>
            </div>
            <div className="mt-16 grid grid-cols-2 gap-8 xl:col-span-2 xl:mt-0">
              <div className="md:grid md:grid-cols-2 md:gap-8">
                <div>
                  <FooterDisplay
                    keyPlacement={0}
                    bottomPlacement={4}
                    topFooterFeedState={topFooterFeedState}
                    footerDisplayState={footerDisplayState}
                  />
                </div>
                <div className="mt-10 md:mt-0">
                  <FooterDisplay
                    keyPlacement={1}
                    bottomPlacement={8}
                    topFooterFeedState={topFooterFeedState}
                    footerDisplayState={footerDisplayState}
                  />
                </div>
              </div>
              <div className="md:grid md:grid-cols-2 md:gap-8">
                <div>
                  <FooterDisplay
                    keyPlacement={2}
                    bottomPlacement={12}
                    topFooterFeedState={topFooterFeedState}
                    footerDisplayState={footerDisplayState}
                  />
                </div>
                <div className="mt-10 md:mt-0">
                  <FooterDisplay
                    keyPlacement={3}
                    bottomPlacement={16}
                    topFooterFeedState={topFooterFeedState}
                    footerDisplayState={footerDisplayState}
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="mt-16 border-t border-white/10 pt-8 sm:mt-20 lg:mt-24">
            <p className="text-xs leading-5 text-gray-400">
              &copy; 2020 Your Company, Inc. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Root;
