import React, { Component } from 'react'
import './Pinfo.scss'
import { Icon, Row, Col, Button, Timeline, Pagination } from 'antd'
import { POST1, BASE_URL } from '../../../components/commonModules/POST'
import Modifyinfo from './modules/ModifyInfo'
import Changepass from './modules/Changepass'
import { browserHistory } from 'React-router'
import Courseqa from '../../Course/components/modules/Course-qa.jsx'
import moment from 'moment'
import Tpinfo from './modules/Tpinfo'
class Route extends Component {
  constructor(props) {
    super(props)
    this.state = {
      res: true,
      changepan: 2,
      data: {},
      changepass: 1,
      pinfo: [],
      tinfo: [],
      queslist: [],
      type: this.props.location.query.type,
      allCount: 0
    }
  }
  componentDidMount() {
    // 获取个人信息
    var id = this.props.location.query.id
    if (id == 0) {
      var data = ``
      POST1('/user/getUserInfo.action', data, (re) => {
        if (re.status === 1) {
          this.setState({ pinfo: re.data })
        }
      })
    } else {
      if (id != 0) {
        var data = `id=${id}`
        POST1('/user/getUserInfo.action', data, (re) => {
          if (re.status === 1) {
            this.setState({ pinfo: re.data })
          }
        })
      }
    }
    // 获取当前账户提出的问题
    let data1 = `pageNum=1&pageSize=5`
    POST1('/getQuestion.action', data1, (re) => {
      if (re.status == 1) {
        this.setState({ queslist: re.data.list })
        this.setState({ allCount: re.data.total })
      }
    })
  }

  // 通过改变状态来切换组件
  changestate(num) {
    switch (num) {
      case 1: this.setState({ changepan: 1 }); break
      case 2:
        this.setState({ changepan: 2 }); break
      case 3: this.setState({ changepan: 3 }); break
      case 4: this.setState({ changepan: 4 }); break
      case 5: this.setState({ changepan: 5 }); break
    }
  }
  changepass(num) {
    this.setState({ changepass: num })
  }
  goteaher() {
    browserHistory.push({
      pathname: '/Teacher',
      query: {
        // id:this.props.location.query.id
      }
    })
  }
  // 分页页数改变的时候的回叼
  changepage(page, pageSize) {
    let data1 = `pageNum=${page}&pageSize=5`
    POST1('/getQuestion.action', data1, (re) => {
      if (re.status == 1) {
        this.setState({ queslist: re.data.list })
        // this.setState({ allCount:re.data.total })
      }
    })
  }
  render() {
    const { account, head, emil, sex, sign, type } = this.state.pinfo
    var id = this.props.location.query.id
    return (
      <div>
        <div className='card-container'>
          <div className='total-wrapper'>
            <div className='header-wrapper'>
              <div className='master-avatar'><a><img src={BASE_URL + head} /></a></div>
              <div className='master-info'> <a><h2 style={{ display: 'inline-block' }}>{account}</h2 ></a>
                <span style={{ fontSize: 12, display: 'inline-block', marginLeft: 8 }}>{type == 1 ? '学生' : type == 2 ? '老师' : '管理员'}</span>
                <h4 style={{ fontSize: 14 }}>{emil}</h4>
                <div className='introduction'><span>{sign}</span></div>
                {this.state.pinfo.type == 2 ? this.state.type != 1 ? <a onClick={() => this.goteaher()}
                  style={{ float: 'right' }}>
                  前往老师管理页面<Icon type='right' />
                </a> : '' : ''}
              </div>
            </div>
          </div>
        </div>
        <div className='page-body'>
          <Row style={{minWidth:1235}}>
            <Col span={3} >
              <div className='slider'>
                <ul>

                  <li>
                    <a onClick={this.changestate.bind(this, 2)}>
                      <Icon type='idcard' /><span>个人信息</span><b className='icon-drop_right' />
                    </a>
                  </li>
                  {this.state.pinfo.type == 1
                    ? <li>
                      <a onClick={this.changestate.bind(this, 3)}>
                        <Icon type='question-circle-o' /><span>我的提问</span><b className='icon-drop_right' />
                      </a>
                    </li>
                    : ''}
                  {this.state.pinfo.type == 2 ? this.state.type != 1
                    ? <li>
                      <a onClick={this.changestate.bind(this, 4)}>
                        <Icon type='key' /><span>我的回答</span><b className='icon-drop_right' />
                      </a>
                    </li>
                    : '' : ''}
                </ul>
              </div>
            </Col>
            <Col span={20} style={{padding:50,paddingRight:500}} >
              <div className='main-center1'>{this.state.type != 1 ? this.state.changepan == 2 ? this.state.changepass == 1
                ? <Modifyinfo pinfo={this.state.pinfo} changepass={this.changepass.bind(this)} uid={id} />
                : <Changepass changepass={this.changepass.bind(this)} /> : '' : <Tpinfo id={id} />}</div>
              <div className='main-center'>{this.state.changepan == 3
                ? this.state.queslist.map((item, i) => {
                  return (<Courseqa data={item} key={i} qid={id} type={1} uid={id} />)
                }) : ''}</div>
              <div className='main-center' style={{ marginLeft: 50, marginTop: 30 }}>{this.state.changepan == 4
                ? this.state.queslist.map((item, i) => {
                  return (<Courseqa data={item} key={i} id={id} uid={id} />)
                }) : ''}</div>
              <Pagination total={this.state.allCount} pageSize={5}
                onChange={(page, pageSize) => { this.changepage(page, pageSize) }} />

            </Col>
          </Row>
        </div>
      </div>
    )
  }
}
export default Route
