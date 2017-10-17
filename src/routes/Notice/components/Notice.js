import React, { Component } from 'react'
import './Notice.scss'
import { Button, Row, Col, Tabs, Icon, Card, message, Input } from 'antd'
import { POST1 } from '../../../components/commonModules/POST'
import moment from 'moment'
import { browserHistory } from 'React-Router'
const { TextArea } = Input
class Notice extends Component {
  constructor(props) {
    super(props)
    this.state = {
      message_item: [],
      login: true
    }
  }

  componentWillMount() {
    this.getMessage()
  }
  getMessage() {
    var data = ``
    POST1('/user/getMessage.action', data, (re) => {
      if (re.status == 1) {
        this.setState({ message_item: re.data })
      } else if (re.status == 21) {
        this.setState({ login: false })
      }
    })
  }
  remove(id) {
    var data = `id=${id}`
    POST1('/user/deleteMessage.action', data, (re) => {
      if (re.status == 1) {
        message.success('删除成功')
        this.getMessage()
      } else {
        alert('网络错误')
      }
    })
  }
  render() {
    const TabPane = Tabs.TabPane
    return (
      <div className='system-notice'>
        <div className='notice-item'>
          <Tabs defaultActiveKey='1'>
            <TabPane tab={<span style={{ fontSize: 18, fontFamily: '宋体' }}><Icon type='bell' />系统消息</span>} key='1'>
              {this.state.login == true
                ? <Row gutter={16} style={{ padding: 20 }}>
                  {this.state.message_item.map((item, i) => {
                    return (
                      item.type == 1 ? <Cardmessage item={item} key={i} remove={this.remove.bind(this)} /> : item.type == 5
                        ? <Applymessage key={i} data={item} remove={this.remove.bind(this)} /> : '')
                  })}
                </Row> : <div style={{ marginLeft: 200 }}>'请先登录'</div>}
            </TabPane>
            <TabPane tab={<span style={{ fontSize: 18, fontFamily: '宋体' }}><Icon type='compass' />动态消息</span>} key='2'>
              <Dynamicmessage message_item={this.state.message_item} remove={this.remove.bind(this)} />
            </TabPane>
          </Tabs>
        </div>
      </div>
    )
  }
}

export default Notice
// 系统信息组件接口
class Cardmessage extends React.Component {
  render() {
    const { data, startDate, user } = this.props.item
    return (
      <Col span={8}>
        <Card title={this.props.item.type == 1 ? '系统消息' : '课程通知'} style={{ border: '1px solid silver', height: 150, margin: 5 }}
        // extra={<span>发信人：{user.type == 2 ? `${user.account}老师` : '管理员'}</span>}
        >
          {data}</Card>
      </Col>
    )
  }
}
// 动态消息
class Dynamicmessage extends React.Component {
  componentWillMount() {
  }
  render() {
    const { data, startTime, user } = this.props.message_item
    return (
      <div className='dynamic_message'>
        <div style={{ background: '#ECECEC', padding: '30px' }}>
          <Row gutter={16} >
            {
              this.props.message_item.map((item, i) => {
                return (
                  item.type == 3 ? <Commentmessage item={item} remove={this.props.remove.bind(this)} key={i} />
                    : item.type == 6 ? <Askmessage item={item} remove={this.props.remove.bind(this)} key={i} />
                      : item.type == 7 ? <Answersmessage item={item} remove={this.props.remove.bind(this)} key={i} /> : ''
                )
              })}
          </Row>
        </div>
      </div>
    )
  }
}

// 学生申请课程的消息组件
class Applymessage extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      enable: false,
      courseinfo: []
    }
  }
  componentDidMount() {
    let id = this.props.data.dataid
    let data = `id=${id}`
    POST1(`/getDClass.action`, data, (re) => {
      console.log(re.data)
      if (re.status === 1) {
        this.setState({ courseinfo: re.data.list[0] })
      }
    })
  }
  isapply(num, mid, cuid) {
    let id = this.props.data.dataid
    var data = `cid=${id}&isApply=${num}&mid=${mid}&id=${cuid}`
    POST1('/admin/upadateCu.action', data, re => {
      if (re.status == 1) {
        this.setState({ enable: true })
        message.success('操作成功')
      } else {
        alert('网络错误')
      }
    })
  }
  getinfo() {
    browserHistory.push({
      pathname: `/pinfo`,
      query: {
        id: this.props.data.user.id
      }
    })
  }
  render() {
    let mid = this.props.data.id
    let cuid = this.props.data.data
    console.log(this.state.courseinfo)
    return (
      <Col span={8} ><Card title='申请消息' style={{ border: '1px solid silver', height: 150, margin: 5 }}
        bodyStyle={{ height: 130 }}
        extra={<a style={{ textDecoration: 'none', color: 'red' }}
          onClick={() => this.props.remove(this.props.data.id)}>删除</a>}>
        <div style={{ width: 180, display: 'inline-block' }}>
          <a onClick={() => this.getinfo()}>{this.props.data.user.account}
          </a>申请了课程名为&lt;<mark>{this.state.courseinfo.name}</mark>&gt;的课程</div>
        <div style={{ position: 'relative', bottom: 0, float: 'right' }}>
          <Button style={{ float: 'right' }}
            onClick={() => { this.isapply(2, mid, cuid) }} disabled={this.state.enable}>同意</Button>
          <Button onClick={() => { this.isapply(3, mid, cuid) }} disabled={this.state.enable} style={{ float: 'right' }}>拒绝</Button>
        </div>
      </Card></Col>
    )
  }
}
// 点赞消息组件
class Commentmessage extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      commentdata: ''
    }
  }
  componentDidMount() {
    var data = `id=${this.props.item.dataid}`
    POST1('/getComment.action', data, (re) => {
      if (re.status == 1) {
        this.setState({ commentdata: re.data[0].data })
      }
    })
  }
  seeInfo() {
    browserHistory.push({
      pathname: `/pinfo`,
      query: {
        // 将课程id传入课程详情
        id: this.props.item.user.id
      }
    })
  }
  render() {
    var item = this.props.item
    return (
      <div>
        <Col span={8} >
          <Card title='动态消息' style={{ border: '1px solid silver' }} bodyStyle={{ height: 130 }}
            extra={<a style={{ textDecoration: 'none', color: 'red' }} onClick={() => this.props.remove(item.id)}>删除</a>}>
            <a onClick={() => this.seeInfo()}>{item.user.account}</a>赞了你的评论
            <span style={{ fontSize: 10, backgroundColor: 'silver', borderRadius: 3 }}>{this.state.commentdata}</span>
            <span style={{ float: 'right' }}>{moment(item.startDate).format('YYYY-MM-DD')}</span>
          </Card>
        </Col>
      </div>
    )
  }
}
// 提问消息组件
class Askmessage extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      commentdata: '',
      textvalue: '',
      cid: ''
    }
  }

  componentDidMount() {
    var data = `id=${this.props.item.dataid}`
    POST1('/getQuestion.action', data, (re) => {
      if (re.status == 1) {
        this.setState({ commentdata: re.data[0].data, cid: re.data[0].cid })
      }
    })
  }
  changevalue(e) {
    this.setState({ textvalue: e.target.value })
  }
  submit() {
    let id = this.props.item.dataid
    let text = this.state.textvalue
    let cid = this.state.cid
    var data = `qid=${id}&data=${text}&cid=${cid}`
    POST1('/user/createQuestion.action', data, (re) => {
      if (re.status == 1) {
        message.success('成功回复')
        this.setState({ textvalue: '' })
      }
    })
  }
  seeInfo() {
    browserHistory.push({
      pathname: `/pinfo`,
      query: {
        // 将课程id传入课程详情
        id: this.props.item.user.id
      }
    })
  }
  render() {
    var item = this.props.item
    return (
      <div>
        <Col span={8} >
          <Card title='动态消息' style={{ border: '1px solid silver' }} bodyStyle={{ height: 130 }}
            extra={<a style={{ textDecoration: 'none', color: 'red' }}
              onClick={() => this.props.remove(item.id)}>删除</a>}>
            <a onClick={() => this.seeInfo()}>{item.user.account}</a>在你的课程中问了问题：
            {/*<span style={{ fontSize: 10, backgroundColor: 'silver', borderRadius: 3 }}>{this.state.commentdata}</span>
            <TextArea placeholder='请输入您的答案'rows={2} onChange={(e) => this.changevalue(e)} /><Button onClick={() => this.submit()}>提交</Button>*/}
            <span style={{ float: 'right' }}>{moment(item.startDate).format('YYYY-MM-DD')}</span>
          </Card>
        </Col>
      </div>
    )
  }
}
// 回答消息组件
class Answersmessage extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      commentdata: '',
      question: ''
    }
  }

  componentDidMount() {
    var data = `id=${this.props.item.dataid}`
    POST1('/getQuestion.action', data, (re) => {
      if (re.status == 1) {
        var data = re.data[0]
        var datap = `id=${data.qid}`
        POST1('/getQuestion.action', datap, (re) => {
          if (re.status == 1) {
            this.setState({ commentdata: data.data, question: re.data[0].data })
          }
        })
      }
    })
  }
  seeInfo() {
    browserHistory.push({
      pathname: `/pinfo`,
      query: {
        // 将课程id传入课程详情
        id: this.props.item.user.id
      }
    })
  }
  render() {
    var item = this.props.item
    return (
      <div>
        <Col span={8} >
          <Card title='动态消息' style={{ border: '1px solid silver' }} bodyStyle={{ height: 130 }}
            extra={<a style={{ textDecoration: 'none', color: 'red' }}
              onClick={() => this.props.remove(item.id)} >删除</a>} >
            <Row>
              <Col span={14}>
                <a onClick={() => { this.seeInfo() }}>{item.user.account}</a>在你的问题：
                  <span style={{ fontSize: 10, backgroundColor: 'silver', borderRadius: 3 }}>{this.state.question}</span>
                回答：{this.state.commentdata}
              </Col>
              <Col span={8}>
                <span style={{ position: 'relative', bottom: -20, right: -70 }}>{moment(item.startDate).format('YYYY-MM-DD')}</span>
              </Col>
            </Row>
          </Card>
        </Col>
      </div>
    )
  }
}
// 老师是否同意申请课程的请求
class Appmessage extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      commentdata: ''
    }
  }
  render() {
    var item = this.props.item
    return (
      <div>
        <Col span={8} >
          <Card title='申请回复消息' style={{ border: '1px solid silver' }} bodyStyle={{ height: 130 }}>
            <Row>
              <Col span={14}>
                <a>{item.user.account}</a>同意了课程
            <span style={{ fontSize: 10, backgroundColor: 'silver', borderRadius: 3 }}>{this.state.commentdata}</span>
              </Col>
              <Col spam={8}>
                <span style={{ float: 'rigth' }}>{moment(item.startDate).format('YYYY-MM-DD')}</span>
              </Col>
            </Row>
          </Card>
        </Col>
      </div>
    )
  }
}

