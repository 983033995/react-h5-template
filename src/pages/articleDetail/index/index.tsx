/*
 * @FilePath: /h5-react/src/pages/articleDetail/index/index.tsx
 * @Description:
 */
import React from 'react';
import './index.less';
import { useSearchParams } from 'react-router-dom';

/**
 * 文章详情页面
 */
const ArticleDetailPage: React.FC = () => {
  const [searchParams] = useSearchParams(); // 获取查询参数 ?id=123
  const queryId = searchParams.get('id'); // 获取查询参数中的id值

  // 优先使用查询参数，如果没有则使用路径参数
  const id = queryId;
  console.log('文章ID:', id, Array.from(searchParams.entries()));

  const pageHeader = () => {
    return (
      <div className="px-[16px] py-[10px] flex justify-between">
        <div className="w-96 justify-start text-gray-900 text-xl font-medium font-['PingFang_SC']">
          拿到香港身份，孩子幼小中本教育路线这么安排就稳了！
        </div>
      </div>
    );
  };

  return (
    <div className="w-100vw h-100vh flex flex-col overflow-hidden">
      {pageHeader()}

      <main className="page-content">
        <section className="content-section">
          <h2 className="text-[22px]">欢迎访问文章详情</h2>
          <p className="text-xs">这是文章详情的内容区域，您可以在这里添加实际内容。</p>
        </section>
      </main>

      <footer className="page-footer">
        <p>© 2025 Galaxy应用</p>
      </footer>
    </div>
  );
};

export default ArticleDetailPage;
