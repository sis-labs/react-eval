import React from 'react';
import logo from './logo.svg';
import { Layout, Menu, Breadcrumb } from 'antd';

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

import AdminFeatureRequests from './components/admin/FeatureRequests';
import AdminFeatureRequest from './components/admin/FeatureRequest';

import LandingFeatureRequests from './components/landing/FeatureRequests';
import LandingFeatureRequest from './components/landing/FeatureRequest';

import './App.css';

const { Header, Content, Footer } = Layout;

function App() {
  return (
    <Router>
      <div className="App">
        <Layout>
            <Header style={{ position: 'fixed', zIndex: 1, width: '100%' }}>
              <div className="logo" />
              <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['1']}>
                <Menu.Item key="1">
                  <Link to="/">Home</Link>
                </Menu.Item>
                <Menu.Item key="2">
                  <Link to="/admin/feature-requests">Feature request (admin)</Link>
                </Menu.Item>
                <Menu.Item key="3">
                  <Link to="/landing/feature-requests">Feature request (landing)</Link>
                </Menu.Item>
              </Menu>
            </Header>
            <Content className="site-layout" style={{ padding: '0 50px', marginTop: 64 }}>
              <Breadcrumb style={{ margin: '16px 0' }}>
                <Breadcrumb.Item>Home</Breadcrumb.Item>
                <Breadcrumb.Item>Content</Breadcrumb.Item>
              </Breadcrumb>
              <Switch>
                <Route path="/admin/feature-requests/:id">
                  <AdminFeatureRequest />
                </Route>
                <Route path="/admin/feature-requests">
                  <AdminFeatureRequests />
                </Route>
                <Route path="/landing/feature-requests/:id">
                  <LandingFeatureRequest />
                </Route>
                <Route path="/landing/feature-requests">
                  <LandingFeatureRequests />
                </Route>
                <Route path="/">
                  <div className="site-layout-background" style={{ padding: 24, minHeight: 380 }}>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris fermentum dolor nec nibh interdum, 
                    sit amet fringilla sem gravida. Donec lobortis tellus eget blandit hendrerit. Nunc bibendum euismod nulla, 
                    at placerat lacus mattis a. Maecenas scelerisque, metus id vehicula consequat, massa nunc condimentum augue, 
                    quis tincidunt metus nisl vel ligula. Etiam massa leo, porttitor eget lacus sed, eleifend cursus ligula. Nulla 
                    ac ipsum ut ligula euismod suscipit. Vivamus vehicula a metus a cursus. Maecenas tristique enim et urna 
                    sodales, sodales semper odio iaculis. Integer blandit felis est, at blandit elit lobortis tincidunt. Curabitur 
                    in sapien pulvinar, mattis massa et, sollicitudin risus. Vivamus vestibulum nibh quis congue sollicitudin. 
                    Aliquam eu velit nec mi condimentum imperdiet. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed 
                    augue mauris, pulvinar ut urna at, iaculis feugiat nulla. Pellentesque egestas nibh eu magna accumsan suscipit.
                  </div>
                </Route>
              </Switch>
            </Content>
            <Footer style={{ textAlign: 'center' }}>QimInfo ©2020 Created using Antd and React.</Footer>
          </Layout>
      </div>
    </Router>
  );
}

export default App;
