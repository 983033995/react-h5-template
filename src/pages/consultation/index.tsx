/*
 * @FilePath: /galaxy-app-h5/src/pages/consultation/index.tsx
 * @Description:
 */
import React, { useState } from 'react';
import { Button, Card, List, Avatar, Tag, ImageViewer, Dialog } from 'antd-mobile';
import './index.less';
import Cascader from './components/Cascader';

const ConsultationPage: React.FC = () => {
  const [visible, setVisible] = useState(false);
  const [defaultIndex, setDefaultIndex] = useState(0);
  const demoImages = [
    'https://randomuser.me/api/portraits/men/1.jpg',
    'https://randomuser.me/api/portraits/men/2.jpg',
    'https://randomuser.me/api/portraits/men/3.jpg',
  ];
  const handleConsultation = (index: number) => {
    setVisible(true);
    setDefaultIndex(index);
  };
  return (
    <div className="consultation-page">
      <header className="header">
        <h1>在线咨询服务</h1>
        <p>专业咨询团队为您解答各类问题</p>
      </header>

      <Card className="intro-card">
        <div className="card-content">
          <h2>Galaxy咨询服务</h2>
          <p>
            我们拥有专业的咨询团队，可以为您提供各类专业咨询服务。无论您有任何问题，都可以通过我们的平台获得及时解答。
          </p>
          <Button
            color="primary"
            block
            onClick={() =>
              Dialog.alert({
                content: '俺三点睡得',
                onConfirm: () => {
                  console.log('Confirmed');
                },
              })
            }
          >
            立即咨询
          </Button>
          <Cascader />
        </div>
      </Card>

      <div className="section">
        <h2 className="section-title">咨询师团队</h2>
        <List>
          {[1, 2, 3].map(i => (
            <List.Item
              key={i}
              prefix={<Avatar src={`https://randomuser.me/api/portraits/men/${i + 10}.jpg`} />}
              description={
                <div>
                  专业领域：<Tag color="primary">财务</Tag> <Tag color="success">法律</Tag>
                </div>
              }
              extra={
                <Button size="small" color="primary" onClick={() => handleConsultation(i)}>
                  预约
                </Button>
              }
            >
              咨询师 {i} 号
            </List.Item>
          ))}
        </List>
        <ImageViewer.Multi
          images={demoImages}
          visible={visible}
          defaultIndex={defaultIndex}
          onClose={() => {
            setVisible(false);
          }}
        />
      </div>

      <div className="section">
        <h2 className="section-title">热门咨询</h2>
        <List>
          {['如何处理合同纠纷？', '个人理财有哪些建议？', '创业初期应该注意什么？'].map(
            (item, index) => (
              <List.Item key={index}>{item}</List.Item>
            ),
          )}
        </List>
      </div>

      <footer className="footer">
        <p>© 2023 Galaxy咨询 版权所有</p>
        <p>联系电话：400-123-4567</p>
      </footer>
    </div>
  );
};

export default ConsultationPage;
