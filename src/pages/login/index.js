import React, {Component} from 'react';
import './style.less';
import logo from './images/logo.png';
import { Form, Input, Button, Icon } from 'antd';
class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }
    handleSubmit(event){
      // 阻止默认事件
      event.preventDefault();
      // 对所有表单字段进行校验
      this.props.form.validateFields((err,values)=>{
        if(!err){
          console.log('提交登录请求',values);
        } else {
          console.log('失败')
        } 
      });
    }
    validatePwd (rule,value,callback){
      if (!value){
        callback('必须输入密码')
      }
      else if (value.length<4){
        callback('长度必须大于4')
      }
      callback();//验证成功
    }
    render() {
      const form = this.props.form;
      const {getFieldDecorator} = form;
        return ( 
        <div id='login'>
            <header className='login-header'>
                <img src={logo} alt=''/>
                <h1>React 项目：后台管理系统</h1>
                </header>
            <section className='login-content'>
                <h2>用户登录</h2>
                <div>
                <Form name="normal_login" className="login-form" onSubmit = {(e)=>{this.handleSubmit(e)}}>
      <Form.Item>
        {
          getFieldDecorator('username',{rules:[
            {
              required: true,
              message: 'Please input your Username!',
            }]})(
              <Input prefix={<Icon type='user'/>} placeholder='用户名'/>,
            )
        }
      </Form.Item>
      <Form.Item>        
      {
        getFieldDecorator('password',{rules:[
          {
            validator: this.validatePwd
          }
        ]})(
            <Input  placeholder='密码'/>,
          )
      }
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit" className="login-form-button">
          Log in
        </Button>
      </Form.Item>

    </Form>
                </div>
            </section>
        </div>
        )
    }
}

// 包装Form组件生成一个新的组件Form(Login)
// 新组件会向Form组件传递一个props：form对象
// 这个对象里面封装了很多方法
const WrapLogin =Form.create()(Login)
export default WrapLogin;