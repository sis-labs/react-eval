import React from 'react';

import { Button } from 'antd';

import {
  Link
} from "react-router-dom";


function FeatureRequest() {
    return (
        <div>
            <Button><Link to="/feature-requests">Back tot he list</Link></Button>
            <p>The detail of a request</p>
        </div>
    );
}

export default FeatureRequest;