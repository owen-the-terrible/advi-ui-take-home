import { FC, useState, useEffect } from "react";
import { sortedAPIdata, APIdata } from "./Articles";
import { Link } from "react-router-dom";

type Props = {
    topFooterFeedState:sortedAPIdata;
    footerDisplayState:sortedAPIdata;
    keyPlacement: number;
    bottomPlacement: number;
}

export const FooterDisplay:FC<Props> = ({topFooterFeedState, footerDisplayState,keyPlacement, bottomPlacement}) => {
    const [topLink, setTopLink] = useState<APIdata|null>(null)
    const topKey = Object.keys(topFooterFeedState).slice()[keyPlacement];
    const bottomDisplay = Object.entries(footerDisplayState).slice(bottomPlacement-4, bottomPlacement);
    const encodedData = (data: APIdata): string =>{
        const newEncoded = encodeURIComponent(JSON.stringify(data));
        return newEncoded;
    }
    useEffect(()=>{
        if(topFooterFeedState && topKey){
        setTopLink(topFooterFeedState[topKey][0])
        }
        return()=>{
            setTopLink(null);
        }
    },[topKey, topFooterFeedState])
    return (
      <>
        <h3 className="text-sm font-semibold leading-6 text-white"><Link to={ topLink ? `/article/${encodedData(topLink)}` : '#'}>{topKey}</Link></h3>
        <ul role="list" className="mt-6 space-y-4">
          {bottomDisplay.map(
            (item: [key: string, value: APIdata[]], index: number) => (
              <li key={item[0] + index}>
                <Link
                  to={`/article/${encodedData(item[1][0])}`}
                  className="text-sm leading-6 text-gray-300 hover:text-white cursor-pointer"
                >
                  {item[0]}
                </Link>
              </li>
            )
          )}
        </ul>
      </>
    );
  };

  export default FooterDisplay