import React, { useState, useEffect } from 'react';
import * as uuid from 'uuid';
import * as moment from 'moment';

import { List, Button, Skeleton, Avatar, Space } from 'antd';
import { MessageOutlined, LikeOutlined, StarOutlined, DeleteOutlined, ExclamationCircleOutlined } from '@ant-design/icons';

//import FeatureRequestForm from '../shared/FeatureRequestForm';
import FeatureRequestViewer from '../shared/FeatureRequestViewer';


import { createRequest } from '../../service/create-request.service';

import {
  Link
} from "react-router-dom";

const r = createRequest('test', 'this is the content of the test', 'jdoe@mydom.com', ['foo', 'bar', 'baz']);

const IconText = ({ icon, text }) => (
  <Space>
    {React.createElement(icon)}
    {text}
  </Space>
);

function FeatureRequests() {
    const [requests, setRequests] = useState([r]);
    const [mode, setMode ] = useState("show");
    const [visible, setVisible] = useState(false);
    
    const showDrawer = () => {
      setVisible(true);
    };
    
    const onClose = () => {
      setVisible(false);
    };
    
    /*const data = requests.map(({id, title, content, email, votes}) => ({
      id,
      key: id,
      content: `${title} - ${content} | ${votes.length}`
    }));*/
    
    const onFrClick = () => {
      setMode("edit");
      showDrawer();
    };
    
    
    /* ------------------- */
    const [ initLoading, setInitLoading ] = useState(true);
    const [ loading, setLoading ] = useState(false);
    const [ data, setData ] = useState([]);
    const [ list, setList ] = useState([]);
  
    const getData = callback => {
      fetch('https://randomuser.me/api/?results=3&inc=name,gender,email,nat&noinfo', {
        method: 'GET',
        mode: 'cors',
        cache: 'no-cache',
        contentType: 'application/json',
        headers: {
          'Content-Type': 'application/json'
        },
      }).then(response => response.json()).then(d => {
        callback(d);
      });
    };
  
    const onLoadMore = () => {
      setLoading(true);
      setList(list.concat([...new Array(3)].map(() => ({ loading: true, name: {} }))));
      
      getData(res => {
        const d = data.concat(res.results);
        setData(d);
        setList(d);
        setLoading(false);
        window.dispatchEvent(new Event('resize'));
      });
    };
    
    const loadMore =
      !initLoading && !loading ? (
        <div
          style={{
            textAlign: 'center',
            marginTop: 12,
            height: 32,
            lineHeight: '32px',
          }}
        >
          <Button onClick={onLoadMore}>loading more</Button>
        </div>
      ) : null;
      
      useEffect(() => {
        getData((res) => {
          const d = data.concat(res.results);
          setData(d);
          setList(d);
          setInitLoading(false);
        window.dispatchEvent(new Event('resize'));
        });
      }, [initLoading]);
    /* -------------------- */
    
    const getId = (item) => {
      return `${item.name.last}${item.name.first}`;
    };
    
    return (
        <div>
            <List
              className="demo-loadmore-list"
              header={<div>List of feature request</div>}
              footer={<div>total ...</div>}
              loading={initLoading}
              itemLayout="horizontal"
              loadMore={loadMore}
              dataSource={list}
              renderItem={item => (
                <List.Item
                  key={getId(item)}
                  actions={[
                    <IconText icon={StarOutlined} text="156" key="list-vertical-star-o" />,
                    <IconText icon={LikeOutlined} text="156" key="list-vertical-like-o" />,
                    <IconText icon={MessageOutlined} text="2" key="list-vertical-message" />,
                    <IconText icon={DeleteOutlined} text="" key="list-vertical-message" />,
                    <IconText icon={ExclamationCircleOutlined} text="" key="list-vertical-message" />,
                  ]
                    /*actions={[<a key="list-loadmore-edit">edit</a>, <a key="list-loadmore-more">more</a>]}*/
                  }
                  extra={
                    <p>&nbsp;</p>
                  }
                >
                  <Skeleton avatar title={false} loading={item.loading} active>
                    <List.Item.Meta
                      avatar={
                        <Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
                      }
                      title={<a href="https://ant.design">{item.name.last}</a>}
                      description="Ant Design, a design language for background applications, is refined by Ant UED Team"
                    />
                    <div>This is the content of the feature request</div>
                  </Skeleton>
                </List.Item>
              )}
            />
            {/*
            <List
              size="large"
              header={<div>List of feature request</div>}
              footer={<div>Load more ...</div>}
              bordered
              dataSource={data.map(({content}) => (content))}
              renderItem={item => <List.Item>{item}</List.Item>}
            />
            <FeatureRequestViewer visible={visible} onClose={onClose} featureRequest={requests[0]} mode={mode}></FeatureRequestViewer>
            */}
            <Button type="primary" onClick={onFrClick}>New Feature Request</Button>
            <FeatureRequestViewer visible={visible} onClose={onClose} featureRequest={requests[0]} mode={mode}></FeatureRequestViewer>
        </div>
    );
}

export default FeatureRequests;