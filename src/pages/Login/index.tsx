import React,{Component} from 'react';
import { Form, Input, Button,message } from 'antd';
import {Redirect} from 'react-router-dom'
import myAxios from '../../http/myAxios'
import './style.css';

interface password {
  password:number
}

class Login extends Component {
  state= {
    isLogin: false
  }
  
  onFinish = (values: password) => {
    myAxios.post('login',{
      password:values.password
    }).then(res=>{
      if(res.data){
        message.success('登录成功！')
        this.setState({
          isLogin:true
        })
      }else {
        message.error('登陆失败，密码错误！')
      }
    })
  };

  onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };

  render () {
    let {isLogin} = this.state
    const layout = {
      labelCol: { span: 8 },
      wrapperCol: { span: 16 },
    };
    const tailLayout = {
      wrapperCol: { offset: 8, span: 16 },
    };
    return isLogin?<Redirect to="/"/>: <div className="login-box">
      <Form
      {...layout}
      name="login"
      initialValues={{ remember: true }}
      onFinish={this.onFinish}
      onFinishFailed={this.onFinishFailed}
    >
      <Form.Item
        label="密码："
        name="password"
        rules={[{ required: true, message: '请输入登陆密码!' }]}
      >
        <Input.Password />
      </Form.Item>
      <Form.Item {...tailLayout}>
        <Button type="primary" htmlType="submit">
          登录
        </Button>
      </Form.Item>
    </Form>
    </div>
  }
}

export default Login