/*
 * @FilePath: /h5-react/src/pages/articleDetail/index/components/ArticleDetail.tsx
 * @Description:
 */
import React, { useState, useEffect, useRef } from 'react';
import { ImageViewer } from 'antd-mobile';

const ArticleDetail: React.FC<{
  articleDetail: string;
}> = ({ articleDetail }) => {
  const [articleContent, setArticleContent] = useState('');

  const contentRef = useRef<HTMLDivElement>(null);
  // 处理图片标签的函数
  const handleImg = (img: string) => {
    // 宽高做处理
    const styleMatch = img.match(/style="([^"]*)"/);
    const style = styleMatch ? styleMatch[1] : '';
    if (style) {
      img = img.replace(/style="([^"]*)"/, `style="${`${style};max-width:100%;height:auto;`}"`);
    } else {
      img = img.replace('>', 'style="max-width:100%;height:auto">');
    }

    // 增加后缀?x-oss-process=image/format,avif 压缩图片
    const srcMatch = img.match(/src="([^"]*)"/);
    let src = srcMatch ? srcMatch[1] : '';

    if (!src.match(/^(http|https):\/\//i)) {
      src = `http:${src}`;
    }

    // 如果地址含有 galaxy-immi.com  证明是cdn地址
    if (src && (src.includes('galaxy-immi.com') || src.includes('aliyuncs.com'))) {
      const defaultSrc = src;

      if (!src.endsWith('?x-oss-process=image/format,avif')) {
        src += '?x-oss-process=image/format,avif';
      }
      src.replace('http://', 'https://');

      img = img.replace(/src="([^"]*)"/, `src="${src}" `);

      img = img.replace('>', `onerror="this.src='${defaultSrc}'" longdesc="${defaultSrc}">`);
    } else {
      img = img.replace('>', `longdesc="${src}">`);
    }
    return img.replace('<img', '<img class="article-preview-image"');
  };
  // 处理从接口获取的富文本数据
  useEffect(() => {
    if (articleDetail) {
      setArticleContent(articleDetail.replace(/<img[^>]*>/gi, handleImg));
    }
  }, [articleDetail]);

  // 在内容渲染后处理图片点击事件
  useEffect(() => {
    if (!articleContent || !contentRef.current) return;

    // 找到所有图片元素
    const imgElements = contentRef.current.querySelectorAll('.article-preview-image');

    // 提前收集所有图片URL
    const imageUrls = Array.from(imgElements).map(img => {
      const longdesc = img.getAttribute('longdesc');
      const src = img.getAttribute('src');
      return longdesc || src || '';
    });

    // 为每个图片添加点击事件
    imgElements.forEach((img, index) => {
      img.addEventListener('click', () => {
        ImageViewer.Multi.show({
          images: imageUrls,
          defaultIndex: index,
        });
      });
    });

    // 清理函数，移除事件监听器
    return () => {
      imgElements.forEach(img => {
        img.removeEventListener('click', () => {});
      });
    };
  }, [articleContent]);

  return (
    <div>
      {/* 文章内容区域，使用ref跟踪DOM */}
      <div
        className="flex flex-col items-center"
        ref={contentRef}
        dangerouslySetInnerHTML={{ __html: articleContent }}
      />
    </div>
  );
};

export default ArticleDetail;
