import React, { Component } from 'react';
import { hot } from 'react-hot-loader';
import CSSModules from 'react-css-modules';
import { Toast } from 'antd-mobile';
import fetch from '@/utils/fetch';
import login from '@/assets/images/login.png';
import styles from './index.scss';

@hot(module)
@CSSModules(styles)
export default class Login extends Component {
  constructor(props) {
    super(props);
    this.state = { tel: '', pwd: '' };
  }
  telHandler = (e) => {
    this.setState({
      tel: e.target.value
    });
  };
  pwdHandler = (e) => {
    this.setState({
      pwd: e.target.value
    });
  };
  loginHandler = () => {
    if (!/^1[3456789]\d{9}$/.test(this.state.tel)) {
      return Toast.info('手机号格式不正确');
    }
    if (!/(?!^[0-9]+$)(?!^[A-z]+$)(?!^[^A-z0-9]+$)^.{8,20}$/.test(this.state.pwd)) {
      return Toast.info('密码应为8~20位的数字、符号或字母中的2种组合');
    }
    fetch('login', { tel: this.state.tel, pwd: this.state.pwd }, 'POST').then((res) => {
      console.log(res);
      if (res.code === 200) {
        Toast.success('登录成功');
      } else {
        Toast.fail('登录失败');
      }
    });
  };
  render() {
    return (
      <div styleName="login">
        <div styleName="header">
          <div styleName="header__back">
            <span className="iconfont icon-back" />
          </div>
          <div styleName="header__title">登陆</div>
          <div />
        </div>
        <div styleName="logo">
          <img styleName="logo__img" src={login} alt="登录图标" />
        </div>
        <div styleName="content">
          <div styleName="input-wrapper">
            <span className="iconfont icon-phone" />
            <input styleName="input-inner" type="tel" placeholder="请输入手机号" value={this.state.tel} onChange={this.telHandler} maxLength="11" />
          </div>
          <div styleName="input-wrapper">
            <span className="iconfont icon-password" />
            <input styleName="input-inner" type="password" placeholder="请输入密码" value={this.state.pwd} onChange={this.pwdHandler} />
          </div>
          <button styleName="login-btn" onClick={this.loginHandler}>登录</button>
          <div styleName="forget">
            <span styleName="forget__text">忘记密码？</span>
          </div>
        </div>
      </div>
    );
  }
}
