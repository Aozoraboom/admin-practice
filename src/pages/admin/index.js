import React, { Component } from 'react'
import memoryUtils from '../../utils/memoryUtils'
import { Redirect, Route,Switch} from 'react-router-dom';
import { Layout} from 'antd';
import LeftNav from '../../components/left-nav';
import Header from '../../components/header';

import Home from '../home/index';
import Category from '../category/index';
import Product from '../product/index';
import Role from '../role/index';
import User from '../user/index';
import Bar from '../charts/bar';
import Line from '../charts/line';
import Pie from '../charts/pie';

const { Footer, Sider, Content } = Layout;
class Admin extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }
    render() {
        const user = memoryUtils.user;
        //    如果内存没有存储user==>当前没登录
        if (!user || !user._id) {
            //自动跳转到登录页面 在render()中
            return <Redirect to='/login' />
        }
        return (

            <Layout style={{ height: '100%' }}>
                <Sider>
                    <LeftNav />
                </Sider>
                <Layout>
                    <Header />
                    <Content style={{margin:'20px', backgroundColor: '#fff' }}>
                        <Switch>
                            <Route path='/home' component={Home} />
                            <Route path='/category' component={Category} />
                             <Route path='/product' component={Product} /> 
                             <Route path='/role' component={Role} />
                            <Route path='/user' component={User} />
                            <Route path='/charts/bar' component={Bar} /> 
                            <Route path='/charts/line' component={Line} /> 
                            <Route path='/charts/pie' component={Pie} />
                             <Redirect to='/home' />
                        </Switch>
                    </Content>
                    <Footer style={{ textAlign: 'center', color: '#ccc' }}>底部文字</Footer>
                </Layout>
            </Layout>

        );
    }
}
export default Admin;