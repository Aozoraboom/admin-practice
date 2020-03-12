import React, { Component } from 'react';
import './style.less';
import logo from '../../assets/images/logo.png';
import { Link ,withRouter} from 'react-router-dom';

import { Menu, Icon } from 'antd';
import menuList from '../../config/menuConfig';
const { SubMenu } = Menu;
class LeftNav extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }
    /**根据menu的数据数组生成对应的标签数组
     * 使用map + 递归
     */
    getMenuNodes = (menuList) =>{
        // 取到当前路径
        const path = this.props.location.pathname;
        return menuList.map(item=>{
            if(!item.children){
                return (
                    <Menu.Item key={item.key}>
                        <Link to={item.key}>
                            <Icon type={item.icon}/>
                            <span>{item.title}</span>
                        </Link>
                    </Menu.Item>
                );
            }else {
                // 查找一个与当前请求路径匹配的子Item
                const cItem = item.children.find( cItem => cItem.key === path )
                // 如果存在，说明当前item对应的子列表需要展开
                if (cItem){
                    this.openKey = item.key;
                }
                return (
                    <SubMenu key= {item.key} title = {
                        <span>
                            <Icon type={item.icon}/>
                            <span>{item.title}</span>
                        </span>
                    }>
                        {this.getMenuNodes(item.children)}
                    </SubMenu>
                );
            }
        })
    } 
    // 在第一次render()之前执行一次
    componentWillMount(){
        this.menuNodes = this.getMenuNodes(menuList)
    }
    render() {
        //得到当前路径
        const path = this.props.location.pathname;
        return (
            <div id='left-nav'>
                <Link to='/' >
                    <header className='left-nav-header' >
                        <img src={logo} alt='' />
                        <h1>后台</h1>
                    </header>
                </Link>
                <Menu
                    selectedKeys={[path]}
                    defaultOpenKeys = {[this.openKey]}
                    mode="inline"
                    theme="dark"
                >{
                    this.menuNodes
                }
                </Menu>
            </div>
        );
    }
}
/**
 * withRouter高阶组件：
 * 包装非路由组件，返回一个新的组件
 * 新的组件向非路由组件传递3个属性：history/location/match
 */
export default withRouter(LeftNav);