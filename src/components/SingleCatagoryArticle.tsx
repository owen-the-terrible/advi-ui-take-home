import { useEffect, useState, FC } from "react";
import { APIdata, sortedAPIdata } from "./Articles";
import { Link } from "react-router-dom";

type Props = {
  data: sortedAPIdata;
  placement: number;
};

export const SingleCatagoryArticle: FC<Props> = ({ data, placement}) => {
  const [list, setList] = useState<APIdata[]>([]);
  const [starter, setStarter] = useState<APIdata | null>(null);
  const currentContent = 1;
  const check = Object.entries(data).slice();


  useEffect(() => {
    if (check && check[placement]) {
      setList(check[placement][1]);
    }
    // return () => {
    //   setList([]);
    // };
  }, [check]);
  useEffect(()=>{
    setStarter(list[currentContent]);
    // return ()=>{
    //     setStarter(null)
    // }
  }, [list, currentContent])
  if(placement === 0){

  return (
    <dl className="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-8 text-base leading-7 text-gray-300 sm:grid-cols-2 lg:mx-0 lg:max-w-none lg:gap-x-16">
      {list.slice(0,16).map((value: APIdata, index: number) => {
        if(placement === 0){
        return (
          <Link to={`/article/${value.title}`} key={value.description[0] + index} className="relative pl-9 cursor-pointer">
            <dt className="inline font-semibold text-white">
              <img
                loading="lazy"
                src={value.urlToImage ? value.urlToImage : ""}
                alt="stock photo"
              />
            </dt>{" "}
            <dd className="inline">{value.description}</dd>
          </Link>
        );}    
      })}
    </dl>
  );}else{
   
    
    return (
        <div className="relative isolate -z-10 mt-32 sm:mt-40">
            <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
    <div className="mx-auto flex max-w-2xl flex-col gap-16 bg-white/5 px-6 py-16 ring-1 ring-white/10 sm:rounded-3xl sm:p-8 lg:mx-0 lg:max-w-none lg:flex-row lg:items-center lg:py-20 xl:gap-x-20 xl:px-20">
      <img
        loading="lazy"
        className="h-96 w-full flex-none rounded-2xl object-cover shadow-xl lg:aspect-square lg:h-auto lg:max-w-sm"
        src={starter?.urlToImage ? starter.urlToImage : ""}
        alt="news photo"
      />
      <div className="w-full flex-auto">
        <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
          {starter?.title}
        </h2>
        <p className="mt-6 text-lg leading-8 text-gray-300">
          {starter?.content.slice(0, 200) + '...'}
        </p>
        <ul
          role="list"
          className="mt-10 grid grid-cols-1 gap-x-8 gap-y-3 text-base leading-7 text-white sm:grid-cols-2"
        >
          {list.map((value: any, index: any) => (
            <li key={value+index} className="flex gap-x-3">
              <Link
                className="h-7 w-5 flex-none"
                aria-hidden="true"
                to={`/article/${value.title}`}
              />
              {value.title.split(' ').slice(0,2).join(' ')}
            </li>
          ))}
        </ul>
        <div className="mt-10 flex">
          <Link
            to={ starter ? `/article/${starter.title}` : '#'}
            className="text-sm font-semibold leading-6 text-indigo-400 cursor-pointer"
          >
            See this article <span aria-hidden="true">&rarr;</span>
          </Link>
        </div>
      </div>
    </div>
  </div>
  <div
    className="absolute inset-x-0 -top-16 -z-10 flex transform-gpu justify-center overflow-hidden blur-3xl"
    aria-hidden="true"
  >
    <div
      className="aspect-[1318/752] w-[82.375rem] flex-none bg-gradient-to-r from-[#80caff] to-[#4f46e5] opacity-25"
      style={{
        clipPath:
          "polygon(73.6% 51.7%, 91.7% 11.8%, 100% 46.4%, 97.4% 82.2%, 92.5% 84.9%, 75.7% 64%, 55.3% 47.5%, 46.5% 49.4%, 45% 62.9%, 50.3% 87.2%, 21.3% 64.1%, 0.1% 100%, 5.4% 51.1%, 21.4% 63.9%, 58.9% 0.2%, 73.6% 51.7%)",
      }}
    />
  </div>
  </div>
    )
}
};
export default SingleCatagoryArticle;
