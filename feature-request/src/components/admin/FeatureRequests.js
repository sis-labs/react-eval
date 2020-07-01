import React, { useState } from 'react';
import * as uuid from 'uuid';
import * as moment from 'moment';

import { Table } from 'antd';

import {
  Link
} from "react-router-dom";

function createRequest(title, content, email, tags = [], votes = [], comments = []) {
    const id = uuid.v4();
    const ts = moment().unix();
    return {
        id,
        ts,
        title,
        content,
        email,
        tags,
        votes,
        comments,
    };
}

function FeatureRequests() {
    const [requests, setRequests] = useState([]);
    const r = createRequest('test', 'this is the content of the test', 'jdoe@mydom.com')
    requests.push(r);
    
    const columns = [
      {
        title: 'Title',
        dataIndex: 'title',
        key: 'title',
      },
      {
        title: 'Content',
        dataIndex: 'content',
        key: 'content',
      },
      {
        title: 'Email',
        dataIndex: 'email',
        key: 'email',
      },
      {
        title: 'Scode',
        dataIndex: 'score',
        key: 'score',
      },
    ];
    
    const dataSource = requests.map((r) => ({key: r.id, score: r.votes.length, ...r}));
    
    return (
        <div>
            <p>The list of request</p>
            <Table dataSource={dataSource} columns={columns} />
            <Link to="/feature-requests/06af3dec-f897-43f0-a896-e1ab39ac8ce1">test</Link>
        </div>
    );
}

export default FeatureRequests;