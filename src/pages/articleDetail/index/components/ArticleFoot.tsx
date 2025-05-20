/*
 * @FilePath: /h5-react/src/pages/articleDetail/index/components/ArticleFoot.tsx
 * @Description:
 */
import React, { useState } from 'react';
import type { getInfoflowArticleInfoRes } from '@/services/apifox/ChaoJiAPP/shouYeZiXun/interface';
import LottieWeb from '@/components/LottieWeb';
import lottie_like_news from '@/utils/lottie/lottie_like_news.json';
const ArticleFoot: React.FC<{
  articleInfo?: getInfoflowArticleInfoRes;
}> = ({ articleInfo }) => {
  const [isLike, setIsLike] = useState(articleInfo?.isLike);
  const handleLike = () => {
    setIsLike(!isLike);
  };
  return (
    <div className="w-full h-[59px] pb-[21px] flex items-center box-content border-t-[0.5px] border-[#F2F2F2] border-solid">
      <div className="flex-1 flex items-center ml-[20px]">
        <div className="w-[34px] h-[34px] rounded-full bg-[#fff] flex items-center justify-center overflow-hidden">
          <img src={articleInfo?.author?.avatar} alt="" className="w-[34px] h-[34px]" />
        </div>
        <span className="text-[14px] text-[#121A26] font-bold ml-[10px]">咨询顾问</span>
      </div>
      <div className="flex-1 flex items-center mr-[20px] justify-end">
        <div className="mr-[24px] flex items-center justify-center flex-col" onClick={handleLike}>
          <div className="w-[24px] h-[24px] text-[#141414] text-bold flex items-center justify-center relative">
            {isLike ? (
              <LottieWeb
                className="absolute top-[-1px] left-[1px]"
                animationData={lottie_like_news}
                loop={false}
              />
            ) : (
              <i className="iconfont icon-a-zixun_notliked"></i>
            )}
          </div>
          <span className="text-[11px] text-[#141414] leading-[15px]">34</span>
        </div>
        <div className="mr-[10px] flex items-center justify-center flex-col">
          <div className="w-[24px] h-[24px] text-[#141414] text-bold flex items-center justify-center">
            <i className="iconfont icon-a-zixun_notcollect"></i>
          </div>
          <span className="text-[11px] text-[#141414] leading-[15px]">34</span>
        </div>
      </div>
    </div>
  );
};

export default ArticleFoot;
