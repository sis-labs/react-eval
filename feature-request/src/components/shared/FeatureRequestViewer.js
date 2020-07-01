import React from 'react';

import { Drawer } from 'antd';

import FeatureRequestSummary from './FeatureRequestSummary';
import FeatureRequestForm from './FeatureRequestForm';

function FeatureRequestViewer(props) {
    const { visible, onClose, mode, featureRequest, width = 640, placement = 'right' } = props;
    
    return (
        <Drawer
          width={width}
          placement={placement}
          closable={false}
          onClose={onClose}
          visible={visible}
        >
        {mode === 'edit' ? <FeatureRequestForm featureRequest={featureRequest} /> : <FeatureRequestSummary featureRequest={featureRequest} />}
        </Drawer>
    );
}

export default FeatureRequestViewer;
