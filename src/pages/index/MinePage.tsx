import { type FC } from 'react';
import { List, Avatar, Button, Dialog, Toast } from 'antd-mobile';
import { UserOutline, PayCircleOutline, EnvironmentOutline, SetOutline } from 'antd-mobile-icons';

const MinePage: FC = () => {
  const handleLogout = async () => {
    const result = await Dialog.confirm({
      content: '确定要退出登录吗？',
    });

    if (result) {
      Toast.show({
        icon: 'success',
        content: '已退出登录',
      });
    }
  };

  return (
    <div className="h-full bg-gray-100">
      {/* 个人信息区域 */}
      <div className="p-4 bg-blue-500 text-white">
        <div className="flex items-center">
          <Avatar src="https://randomuser.me/api/portraits/men/43.jpg" className="w-16 h-16 mr-4" />
          <div>
            <div className="text-lg font-bold">用户名称</div>
            <div className="text-sm opacity-80">ID: 123456</div>
          </div>
        </div>
      </div>

      {/* 数据统计 */}
      <div className="grid grid-cols-3 bg-white p-4 mb-3">
        <div className="flex flex-col items-center">
          <span className="text-lg font-bold">0</span>
          <span className="text-xs text-gray-500">收藏</span>
        </div>
        <div className="flex flex-col items-center">
          <span className="text-lg font-bold">0</span>
          <span className="text-xs text-gray-500">关注</span>
        </div>
        <div className="flex flex-col items-center">
          <span className="text-lg font-bold">0</span>
          <span className="text-xs text-gray-500">粉丝</span>
        </div>
      </div>

      {/* 菜单列表 */}
      <List className="mb-3">
        <List.Item
          prefix={<UserOutline />}
          onClick={() => {
            Toast.show('个人资料');
            return undefined;
          }}
        >
          个人资料
        </List.Item>
        <List.Item
          prefix={<PayCircleOutline />}
          onClick={() => {
            Toast.show('我的订单');
            return undefined;
          }}
        >
          我的订单
        </List.Item>
        <List.Item
          prefix={<EnvironmentOutline />}
          onClick={() => {
            Toast.show('收货地址');
            return undefined;
          }}
        >
          收货地址
        </List.Item>
      </List>

      <List className="mb-6">
        <List.Item
          prefix={<SetOutline />}
          onClick={() => {
            Toast.show('设置');
            return undefined;
          }}
        >
          设置
        </List.Item>
      </List>

      <div className="px-4">
        <Button block color="danger" onClick={handleLogout}>
          退出登录
        </Button>
      </div>
    </div>
  );
};

export default MinePage;
