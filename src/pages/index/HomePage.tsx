/*
 * @FilePath: /galaxy-app-h5/src/pages/HomePage.tsx
 * @Description:
 */
import { type FC } from 'react';
import { Button, Swiper, Image, Card, Space, Toast } from 'antd-mobile';
import { useLoaderData } from 'react-router-dom';
import styles from './HomePage.module.less';

// 定义 Loader 数据类型
interface LoaderData {
  message: string;
  banners?: string[];
  services?: string[];
  cards?: {
    title: string;
    description: string;
  }[];
}

// 默认图片，当 loader 没有提供数据时使用
const defaultImages = [
  'https://images.unsplash.com/photo-1567945716310-4745a6b7844b?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
  'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
  'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
];

// 默认服务，当 loader 没有提供数据时使用
const defaultServices = ['服务一', '服务二', '服务三', '服务四'];

// 默认卡片，当 loader 没有提供数据时使用
const defaultCards = [
  { title: '内容标题 1', description: '这是一段内容描述信息，介绍相关服务和功能。' },
  { title: '内容标题 2', description: '这是一段内容描述信息，介绍相关服务和功能。' },
  { title: '内容标题 3', description: '这是一段内容描述信息，介绍相关服务和功能。' },
];

const HomePage: FC = () => {
  // 使用路由加载器数据
  const loaderData = useLoaderData() as LoaderData;

  // 使用 loader 数据或默认数据
  const images = loaderData.banners || defaultImages;
  const services = loaderData.services || defaultServices;
  const cards = loaderData.cards || defaultCards;

  return (
    <div className={styles.container}>
      <div className={styles.title}>
        Galaxy应用 {loaderData.message && `- ${loaderData.message}`}
      </div>

      {/* 轮播图 */}
      <div className={styles.swiper}>
        <Swiper autoplay loop>
          {images.map((image, index) => (
            <Swiper.Item key={index}>
              <div className={styles.swiperItem}>
                <Image src={image} fit="cover" width="100%" height="100%" />
              </div>
            </Swiper.Item>
          ))}
        </Swiper>
      </div>

      {/* 快捷入口 */}
      <div className={styles.services}>
        {services.map((item, index) => (
          <div
            key={index}
            className={styles.serviceItem}
            onClick={() => {
              Toast.show(`点击了${item}`);
            }}
          >
            <div className={styles.iconWrapper}>
              <span className={styles.icon}>{index + 1}</span>
            </div>
            <div className={styles.serviceName}>{item}</div>
          </div>
        ))}
      </div>

      {/* 内容卡片 */}
      <Space direction="vertical" block>
        {cards.map((item, index) => (
          <Card key={index} className="card">
            <div className={styles.cardTitle}>{item.title}</div>
            <div className={styles.cardDesc}>{item.description}</div>
            <Button
              color="primary"
              size="small"
              onClick={() => {
                Toast.show('功能开发中');
                return undefined;
              }}
            >
              查看详情
            </Button>
          </Card>
        ))}
      </Space>
    </div>
  );
};

export default HomePage;
