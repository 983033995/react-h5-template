/*
 * @FilePath: /h5-react/src/pages/articleDetail/index/index.tsx
 * @Description: 文章详情页面
 */
import React from 'react';
import { useRouteLoaderData } from 'react-router-dom';
import PageHeader from '../components/PageHeader';
import ArticleDetail from './components/ArticleDetail';
import {
  useGetInfoflowArticleDetail,
  useGetInfoflowArticleInfo,
} from '@/services/apifox/ChaoJiAPP/shouYeZiXun/apifox';
import CustomSkeleton from '@/components/Skeleton';
import ArticleFoot from './components/ArticleFoot';
/**
 * 文章详情页面
 */
const ArticleDetailPage: React.FC = () => {
  const {
    searchParams: { id: queryId, statusBarH, isShare },
  } = useRouteLoaderData('root-loader');

  const { data: articleDetail, isLoading } = useGetInfoflowArticleDetail({
    id: Number(queryId || 0),
  });
  const { data: articleInfo, isLoading: isLoadingArticleInfo } = useGetInfoflowArticleInfo({
    id: Number(queryId || 0),
  });
  // // 优先使用查询参数，如果没有则使用路径参数
  // const id = queryId;
  // console.log('文章ID:', id, Array.from(searchParams.entries()));

  return (
    <div className="w-[100vw] h-[100vh] flex flex-col overflow-hidden mx-auto">
      <div
        className="w-full bg-[#fff]"
        style={{ height: statusBarH ? `${statusBarH}px` : '0' }}
      ></div>
      {isShare ? null : <PageHeader />}
      <main className="flex-1 overflow-y-auto pt-[12px] px-[20px]">
        {isLoading || isLoadingArticleInfo ? (
          <CustomSkeleton lineCount={20} />
        ) : (
          <section className="w-full">
            <div className="w-full">
              <div className="text-[22px] leading-[30px] font-bold line-clamp-2 text-left">
                {articleDetail?.title}
              </div>
              <div className="h-[34px] flex items-center text-[13px] text-[#B9C1CC]">
                <span>{articleDetail?.release_time}</span>
                <div className="w-[1px] h-[12px] bg-[#E9ECF0] mx-[12px]"></div>
                <span>{articleDetail?.view_count || 0}次阅读</span>
              </div>
            </div>
            {articleDetail && <ArticleDetail articleDetail={articleDetail.content || ''} />}
            <div className="w-full h-[24px]"></div>
          </section>
        )}
      </main>
      {isShare ? null : <ArticleFoot articleInfo={articleInfo} />}
    </div>
  );
};

export default ArticleDetailPage;
