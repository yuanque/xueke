import React from 'react'
import { Link } from 'react-router'
import './Header.scss'
import img1 from '../img/logo.png'
import img3 from '../img/tongzhi.png'
import { Row, Col, Input, Menu, Dropdown, Modal, message } from 'antd'
import Login from './modules/Login'
import { POST, POST1, BASE_URL } from '../commonModules/POST'
import { browserHistory } from 'React-router'

const DemoBox = props =>
  <p
    style={{
      height: props.value,
      display: 'table-cell',
      verticalAlign: 'middle',
      width: 100,
    }}
  >
    {props.children}
  </p>
const Search = Input.Search
export class Header extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      check1: true,
      check2: false,
      check3: false,
      check4: false,
      check5: false,
      login: false,
      modal2Visible: false,
      modal3Visible: false,
      focusstate: 1,
      shownum: 0,
      info: {
        id: 0
      }
    }
  }
  componentWillMount() {
    var data = ``
    POST1('/user/getUserInfo.action', data, re => {
      if (re.status === 1) {
        this.setState({ info: re.data })
        this.setState({ login: true })
      }
    })
  }
  logintrue() {
    var data = ``
    POST1('/user/getUserInfo.action', data, re => {
      if (re.status === 1) {
        this.setState({ info: re.data })
        this.setState({ login: true })
        location.reload()
      }
    })
  }
  setModal2Visible(modal2Visible, num) {
    this.setState({ modal2Visible })
  }
  check(num) {
    this.setState({
      check1: false,
      check2: false,
      check3: false,
      check4: false,
      check5: false
    })
    switch (num) {
      case 1:
        this.setState({ check1: true })
        break
      case 2:
        this.setState({ check2: true })
        break
      case 3:
        this.setState({ check3: true })
        break
      case 4:
        this.setState({ check4: true })
        break
      case 5:
        this.setState({ check5: true })
        break
      default:
        break
    }
  }
  // 点击搜索的回调
  search(value) {
    if (value !== '') {
      console.log(value)
      browserHistory.push({
        pathname: `/searchresult`,
        query: {
          value: value
        }
      })
    } else {
      const error = () => {
        message.error('请输入内容')
      }
      error()
    }
  }
  changefocus(num) {
    this.setState({ focusstate: num })
  }
  // 查询未读消息
  query() {
    let data = `uid=1`
    POST('/user/getMessage.action', data, re => {
    })
  }
  queryinfo() {
    browserHistory.push({
      pathname: `/pinfo`,
      query: {
        id: this.state.info.id
      }
    })
  }
  exit() {
    let data = ``
    const success = () => {
      message.success('成功退出')
    }
    POST1('/user/exit.action', data, (re) => {
      if (re.status === 1) {
        this.setState({ login: false })
        success()
        location.reload()
      } else {
        alert('网络出错')
      }
    })
  }
  render() {
    const menu = (
      <Menu>
        <Menu.Item key='0' >
          <span onClick={this.queryinfo.bind(this)}>个人中心</span>
        </Menu.Item>
        <Menu.Item key='3' >
          <span onClick={this.exit.bind(this)}>退出</span>
        </Menu.Item>
      </Menu>
    )
    return (
      <div className='header'>
        <div className='page-container'>
          <Row >
            <Col span={2}>
              <div className='logo'>
                <a href=''>
                  <img src={img1} width='70px' height='70px' />
                </a>
              </div>
            </Col>
            <Col>
              <div className='nav-item'>
                <Col
                  span={2}
                  onClick={this.check.bind(this, 1)}
                  className={
                    this.state.check1 == false ? 'checkstate' : 'uncheckstate'
                  }
                >
                  <Link to='/'>
                    <DemoBox value={70}>首页</DemoBox>
                  </Link>
                </Col>
              </div>
            </Col>
            <Col span={3} offset={14}>
              <div className='search'>
                <Search
                  placeholder='请输入搜索内容'
                  style={{ width: '110%' }}
                  onSearch={(value) => this.search(value)}
                />
              </div>
            </Col>
            <Col span={1} className='bell'>
              <Link to='/notice'>
                <DemoBox value={70}>
                  <img
                    src={img3}
                    onClick={this.query.bind(this)}
                    style={{
                      display: 'inline-block',
                      marginLeft: 20,
                      height: 40,
                      width: 40
                    }}
                  />
                </DemoBox>
              </Link>
            </Col>
            {this.state.login === false
              ? <Col span={2}>
                <div
                  className='login-area'
                  onClick={() => this.setModal2Visible(true)}
                >
                  <a href='#'>登录</a>
                </div>
                <div className='reg-area'>
                  <a href='/register'>注册</a>
                </div>
              </Col>
              : <Col span={2} style={{ width: 200 }}>
                <Dropdown overlay={menu} trigger={['hover']}>
                  <a href='#' className='ant-dropdown-link'>
                    <img
                      className='myheader'
                      src={BASE_URL + this.state.info.head}
                      height='50px'
                      width='50px'
                      style={{
                        display: 'inline-block',
                        marginTop: 10,
                        borderRadius: '50%',
                        marginLeft: 20
                      }}
                    />
                  </a>
                </Dropdown>
                <span
                  style={{
                    position: 'relative',
                    top: -20,
                    fontSize: 16,
                    color: 'white',
                    left: 5
                  }}
                >
                  {this.state.info.account}
                </span>
              </Col>}
          </Row>
        </div>

        <Modal
          title='登录'
          key={this.state.newKey}
          wrapClassName='vertical-center-modal'
          visible={this.state.modal2Visible}
          onOk={() => this.setModal2Visible(false)}
          onCancel={() => this.setModal2Visible(false)}
          footer={null}
          width={360}
        >
          <img
            src={
              this.state.focusstate === 1
                ? 'login3.png'
                : this.state.focusstate === 2 ? 'login2.png' : 'login1.png'
            }
            className='pandaimg'
          />
          <Login
            changefocus={this.changefocus.bind(this)}
            setModal2Visible={this.setModal2Visible.bind(this)}
            logintrue={this.logintrue.bind(this)}
          />
        </Modal>
      </div>
    )
  }
}

export default Header
