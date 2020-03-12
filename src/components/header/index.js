import React, { Component } from 'react';
import './style.less';

class Head extends Component {
   constructor(props) {
       super(props);
       this.state = {}
   }
   render() {
       return (
         <div id='header'> 
         <div className='header-top'>欢迎，admin <a href=''>退出</a></div>
         
         </div>
       );
   }
}
export default Head;