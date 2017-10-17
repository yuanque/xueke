import React, { Component } from 'react';
import { POST1 } from '../../../../components/commonModules/POST'

class Tpinfo extends Component {
  constructor(props) {
    super(props)
    this.state = {
      pinfo: ''
    }
  }

  componentWillMount() {


    let data = `id=${this.props.id}`
    POST1('/user/getUserInfo.action', data, (re) => {
      if (re.status === 1) {
        this.setState({ pinfo: re.data })
      }
    })
  }
  render() {
    const { account, emil, sign, sex, phone } = this.state.pinfo
    return (
      <div style={{ textAlign: 'left', marginTop: 50, lineHeight: 4, fontSize: 20, color: 'gray', marginLeft: 100 }}>
        <p><b>昵称</b>：{account}</p>
        <p><b>邮箱</b>：{emil}</p>
        <p><b>性别</b>：{{ sex } == 1 ? '女' : { sex } == 2 ? '男' : '保密'}</p>
        <p><b>手机</b>：{phone}</p>
        <p><b>个人签名</b>：{sign}</p>
      </div>
    );
  }
}

export default Tpinfo;