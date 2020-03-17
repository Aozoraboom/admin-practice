import React, { Component } from 'react';
import {withRouter} from 'react-router-dom'
import './style.less';
import memoryUtils from '../../utils/memoryUtils';
import storageUtils from '../../utils/storageUtils';
import moment from 'moment'; 
import {reqWeather} from '../../api'
import menuList from '../../config/menuConfig';
import {Modal} from 'antd';
import LinkButton from '../link-button'
class Head extends Component {
   constructor(props) {
       super(props);
       this.state = {
         currentTime : moment(new Date()).format('YYYY-MM-DD hh:mm:ss'),
         dayPictureUrl: '',
         weather :''
       }
   }

   getTime =()=>{
    this.intervalId = setInterval(()=>{
      // 每隔1s获取当前时间，更新状态数据currentTime
      const currentTime =  moment(new Date()).format('YYYY-MM-DD hh:mm:ss');
      this.setState({
        currentTime
      })
    },1000)
  }
   
  getWeather = async () => {
    // 调用接口请求异步获取数据
    const {dayPictureUrl , weather} = await reqWeather('北京');
    // 更新状态
    this.setState({
      dayPictureUrl,
      weather
    })
  }

  getTitle = () =>{
    // 得到当前请求路径
    const path = this.props.location.pathname;
    let title ;
    menuList.forEach(item=>{
      if(item.key === path){  // 如果当前item的key与path一样
        title = item.title;
      }else if(item.children){ // 在所有子Item中查找匹配的
        const cItem = item.children.find( cItem => cItem.key === path);
        // 有值的话就是有匹配项
        if (cItem){
          title = cItem.title;
        }   
      }
    })
    return title;

  }
  logout = (e)=>{
    // 显示对话框
    Modal.confirm({
      content:'确定退出吗？',
      onOk: ()=>{
        // 清除保存的user数据
        storageUtils.removeUser();
        memoryUtils.user = {};
        // 跳转到login
        this.props.history.replace('/login');
      }
    })
  }

  componentDidMount(){
    // 获取当前时间
    this.getTime();
    this.getWeather();
  }
  /**
   * 当前组件卸载之前调用
   */
  componentWillUnmount(){
    clearInterval(this.intervalId);
  }

  render() {
     const username = memoryUtils.user.username;
     const {currentTime,dayPictureUrl,weather} = this.state;
     // 需要随着render来变，不能放在willMount里
     const title = this.getTitle();
       return (
         <div id='header'> 
         <div className='header-top'>欢迎,{username}
          <LinkButton  onClick={this.logout}>退出</LinkButton>
          </div>
         <div className='header-bottom'> 
       <div className='header-bottom-left'>{title}</div>
         <div className='header-bottom-right'>
         <span>{currentTime}</span>
           <img src ={dayPictureUrl}  alt='天气图片'/>
          <span>{weather}</span> 
         </div>
         </div>
         </div>
       );
   }
}
export default withRouter(Head);