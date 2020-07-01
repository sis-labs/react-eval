import React from 'react';

import { Row, Col, Tag, Divider } from 'antd';

import DescriptionItem from './DescriptionItem';

function FeatureRequestSummary(props) {
    const { featureRequest: {title, content, tags, votes, comments }} = props;
    
    const tagList = tags.map((t) => (
      <Tag color="magenta">{t}</Tag>
    ));
    
    return (
        <div>
            <p className="site-description-item-profile-p" style={{ marginBottom: 24 }}>
                Feature request ({votes.length})
              </p>
              <p className="site-description-item-profile-p">General</p>
              <Row>
                <Col span={12}>
                  <DescriptionItem title="Title" content={title} />
                </Col>
                <Col span={12}>
                  <DescriptionItem title="Content" content={content} />
                </Col>
              </Row>
              <Divider />
              <Row>
                <Col span={24}>
                  <p className="site-description-item-profile-p" style={{ marginBottom: 24 }}>
                    Tags
                  </p>
                </Col>
                <Col span={24}>
                  {tagList}
                </Col>
              </Row>
              <Divider />
          </div>
    );
}

export default FeatureRequestSummary;
