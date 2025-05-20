/*
 * @FilePath: /h5-react/src/components/Skeleton.tsx
 * @Description: 骨架屏
 */
import React from 'react';
import { Skeleton as AntSkeleton } from 'antd-mobile';
import classNames from 'classnames';

/**
 * 骨架屏组件类型
 */
export type SkeletonProps = {
  /** 是否启用动画效果 */
  animated?: boolean;
  /** 段落行数 */
  lineCount?: number;
  /** 是否显示标题 */
  showTitle?: boolean;
  /** 自定义类名 */
  className?: string;
  /** 加载状态，false 时会展示子组件 */
  loading?: boolean;
  /** 子组件 */
  children?: React.ReactNode;
  /** 骨架屏类型 */
  type?: 'default' | 'card' | 'list' | 'avatar' | 'image';
  /** 自定义圆角 */
  radius?: number | string;
  /** 宽度 */
  width?: number | string;
  /** 高度 */
  height?: number | string;
};

/**
 * 通用骨架屏组件
 */
const CustomSkeleton: React.FC<SkeletonProps> = ({
  animated = true,
  lineCount = 3,
  showTitle = true,
  className,
  loading = true,
  children,
  type = 'default',
  radius,
  width,
  height,
}) => {
  // 如果不是加载状态，直接显示子组件
  if (!loading) {
    return <>{children}</>;
  }

  // 基础样式
  const containerStyle: React.CSSProperties = {
    width: width || '100%',
    height: height || 'auto',
    borderRadius: radius,
  };

  // 根据类型渲染不同的骨架屏
  const renderSkeleton = () => {
    switch (type) {
      case 'card':
        return (
          <div
            className={classNames('p-4 bg-white shadow-sm', className)}
            style={{ ...containerStyle, borderRadius: radius || '8px' }}
          >
            {showTitle && <AntSkeleton.Title animated={animated} />}
            <AntSkeleton.Paragraph lineCount={lineCount} animated={animated} />
          </div>
        );

      case 'list':
        return (
          <div className={classNames('space-y-4', className)} style={containerStyle}>
            {Array(lineCount)
              .fill(0)
              .map((_, index) => (
                <div key={index} className="flex items-center">
                  <div className="mr-3 bg-gray-200 rounded-full w-10 h-10" />
                  <div className="flex-1">
                    <AntSkeleton.Title animated={animated} />
                    <AntSkeleton.Paragraph lineCount={1} animated={animated} />
                  </div>
                </div>
              ))}
          </div>
        );

      case 'avatar':
        return (
          <div className={classNames('flex items-center', className)} style={containerStyle}>
            <div className="mr-3 bg-gray-200 rounded-full w-12 h-12" />
            <div className="flex-1">
              {showTitle && <AntSkeleton.Title animated={animated} />}
              <AntSkeleton.Paragraph lineCount={lineCount} animated={animated} />
            </div>
          </div>
        );

      case 'image':
        return (
          <div className={classNames('space-y-4', className)} style={containerStyle}>
            <div
              className="w-full bg-gray-200"
              style={{ height: '200px', borderRadius: radius || '4px' }}
            />
            {showTitle && <AntSkeleton.Title animated={animated} />}
            <AntSkeleton.Paragraph lineCount={lineCount} animated={animated} />
          </div>
        );

      default:
        return (
          <div className={classNames('w-full', className)} style={containerStyle}>
            {showTitle && <AntSkeleton.Title animated={animated} />}
            <AntSkeleton.Paragraph lineCount={lineCount} animated={animated} />
          </div>
        );
    }
  };

  return renderSkeleton();
};

export default CustomSkeleton;
