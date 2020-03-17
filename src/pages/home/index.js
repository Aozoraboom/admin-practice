import React, { Component } from 'react';
import './style.less'
/**首页路由 */
class Home extends Component {

   constructor(props) {
       super(props);
       this.state = {}
   }
  
   render() {
       return (
         <div id='home'> 后台管理系统</div>
       );
   }
}
export default Home;