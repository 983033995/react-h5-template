import { type FC, useState } from 'react';
import { List, PullToRefresh, InfiniteScroll, Avatar, SearchBar } from 'antd-mobile';
import { type PullStatus } from 'antd-mobile/es/components/pull-to-refresh';
import { useLoaderData, useFetcher } from 'react-router-dom';

interface ListItem {
  id: number;
  title: string;
  description: string;
  avatar: string;
}

// 提供给 loader 类型
interface LoaderData {
  items: ListItem[];
}

// 提供给 action 类型
interface ActionData {
  searchResults: ListItem[];
  searchTerm: string;
}

const mockData: ListItem[] = Array(20)
  .fill(0)
  .map((_, i) => ({
    id: i,
    title: `列表项 ${i + 1}`,
    description: `这是列表项 ${i + 1} 的详细描述信息，可以包含多行文本内容。`,
    avatar: `https://randomuser.me/api/portraits/men/${i + 1}.jpg`,
  }));

const statusRecord: Record<PullStatus, string> = {
  pulling: '下拉刷新',
  canRelease: '释放立即刷新',
  refreshing: '加载中...',
  complete: '刷新成功',
};

const ListPage: FC = () => {
  // 使用路由加载器数据
  const loaderData = useLoaderData() as LoaderData;

  // 用于表单提交的 fetcher
  const fetcher = useFetcher<ActionData>();

  // 本地状态管理
  const [data, setData] = useState<ListItem[]>(
    fetcher.data?.searchResults?.length
      ? fetcher.data.searchResults
      : loaderData.items.length
        ? loaderData.items
        : mockData.slice(0, 10),
  );
  const [hasMore, setHasMore] = useState(true);

  // 搜索状态
  const isSearching = fetcher.state === 'submitting';

  // 刷新处理
  const onRefresh = () => {
    return new Promise<void>(resolve => {
      setTimeout(() => {
        setData(mockData.slice(0, 10));
        setHasMore(true);
        resolve();
      }, 1000);
    });
  };

  // 加载更多处理
  const loadMore = async () => {
    return new Promise<void>(resolve => {
      setTimeout(() => {
        const append = mockData.slice(data.length, data.length + 5);
        setData(val => [...val, ...append]);
        setHasMore(data.length < 15);
        resolve();
      }, 1000);
    });
  };

  // 搜索处理
  const handleSearch = (searchTerm: string) => {
    if (!searchTerm.trim()) {
      // 如果搜索词为空，恢复原始数据
      setData(mockData.slice(0, 10));
      setHasMore(true);
      return;
    }

    // 使用 fetcher 提交搜索表单
    const formData = new FormData();
    formData.append('searchTerm', searchTerm);
    fetcher.submit(formData, { method: 'post' });
  };

  return (
    <div className="h-full bg-gray-100">
      <div className="p-2 bg-white sticky top-0 z-10">
        <fetcher.Form method="post">
          <SearchBar placeholder="搜索" showCancelButton onSearch={handleSearch} />
          <input type="hidden" name="searchTerm" id="searchTerm" />
        </fetcher.Form>
      </div>

      {isSearching ? (
        <div className="flex justify-center items-center p-4">
          <span className="loading loading-spinner loading-md"></span>
          <span className="ml-2">搜索中...</span>
        </div>
      ) : (
        <PullToRefresh
          onRefresh={onRefresh}
          renderText={status => {
            return <div>{statusRecord[status]}</div>;
          }}
        >
          <List className="h-full">
            {data.length > 0 ? (
              data.map(item => (
                <List.Item
                  key={item.id}
                  prefix={<Avatar src={item.avatar} />}
                  description={item.description}
                >
                  {item.title}
                </List.Item>
              ))
            ) : (
              <div className="flex justify-center items-center py-8">
                <span className="text-gray-500">暂无数据</span>
              </div>
            )}
          </List>
          {data.length > 0 && <InfiniteScroll loadMore={loadMore} hasMore={hasMore} />}
        </PullToRefresh>
      )}
    </div>
  );
};

export default ListPage;
