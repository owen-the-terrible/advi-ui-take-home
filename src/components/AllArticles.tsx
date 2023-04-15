import { useState, useEffect, FC } from 'react'


const AllArticles: FC = () =>{
return(
    <div className="mx-auto mt-20 max-w-7xl px-6 lg:px-8">
    <div className="mx-auto max-w-2xl lg:mx-0 lg:max-w-none">
      <div className="grid max-w-xl grid-cols-1 gap-8 text-base leading-7 text-gray-300 lg:max-w-none lg:grid-cols-2">
        <div>
          <p>
            Faucibus commodo massa rhoncus, volutpat. Dignissim sed eget risus enim. Mattis mauris semper sed amet
            vitae sed turpis id. Id dolor praesent donec est. Odio penatibus risus viverra tellus varius sit neque
            erat velit. Faucibus commodo massa rhoncus, volutpat. Dignissim sed eget risus enim. Mattis mauris
            semper sed amet vitae sed turpis id.
          </p>
          <p className="mt-8">
            Et vitae blandit facilisi magna lacus commodo. Vitae sapien duis odio id et. Id blandit molestie
            auctor fermentum dignissim. Lacus diam tincidunt ac cursus in vel. Mauris varius vulputate et ultrices
            hac adipiscing egestas.
          </p>
        </div>
        <div>
          <p>
            Erat pellentesque dictumst ligula porttitor risus eget et eget. Ultricies tellus felis id dignissim
            eget. Est augue maecenas risus nulla ultrices congue nunc tortor. Enim et nesciunt doloremque nesciunt
            voluptate.
          </p>
          <p className="mt-8">
            Et vitae blandit facilisi magna lacus commodo. Vitae sapien duis odio id et. Id blandit molestie
            auctor fermentum dignissim. Lacus diam tincidunt ac cursus in vel. Mauris varius vulputate et ultrices
            hac adipiscing egestas. Iaculis convallis ac tempor et ut. Ac lorem vel integer orci.
          </p>
        </div>
      </div>
      
    </div>
  </div>
)
}
export default AllArticles