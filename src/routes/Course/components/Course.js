import React, { Component } from 'react'
import PropTypes from 'prop-types'
import './Course.scss'
import { Row, Col, Tabs, Button, message, Input, Modal, Pagination } from 'antd'
import Charpter from './modules/Chapter'
import Tintroduction from './modules/T-Introduction'
import Courseqa from './modules/Course-qa.jsx'
import { POST1 } from '../../../components/commonModules/POST'
import CommentBox from './modules/CommentBox'
import Exam from './modules/Exam.jsx'
import moment from 'moment'
const TabPane = Tabs.TabPane
const { TextArea } = Input

function info () {
  Modal.info({
    title: '请登录',
    onOk () { }
  })
}
export default class Course extends Component {
  constructor (props) {
    super(props)
    this.state = {
      like: false,
      collection: false,
      power: true,
      visible: false,
      apply: '',
      apply1: '',
      status: 0,
      getcourse: {
        teacher: { head: './img/headers/2f68c97d-3832-4a60-aa9f-3120fc41c38f.jpg' },
        name: '',
        progress: {
          endDate: ''
        }
      },
      cid: '', // 课程id
      queslist: [],
      datavalue: '',
      login: true, // 用来判断用户是否登录
      allCount: 0
    }
  }
  // 接受传来的课程id
  componentDidMount () {
    var id = this.props.location.query.id// 获取课程id
    var data = `id=${id}`
    this.setState({ cid: id })
    // 获取章信息接口
    POST1(`/getDClass.action`, data, (re) => {
      if (re.status === 1) {
        this.setState({ getcourse: re.data.list[0] })
        // this.setState({status:1})
        this.askques(id)
      }
    })
  }
  // 获取问答接口
  askques (id) {
    var data1 = `cid=${id}&pageNum=1&pageSize=4`
    POST1('/getQuestion.action', data1, (re) => {
      if (re.status === 1) {
        this.setState({ queslist: re.data.list })
        this.setState({ allCount: re.data.total })
        console.log(re)
        this.setState({ apply1: true })
      } else if (re.status == 21) {
        this.setState({ login: false })
      }
    })
    // 查看该学生申请课程的情况
    var data = `cid=${id}`
    POST1('/user/getCu.action', data, (re) => {
      if (re.status == 21) {
        alert('您还未登录，请先登录')
      } else if (re.status == 1) {
        let apply = re.data[0].isApply
        if (apply == 1) {
          this.setState({ apply: '已提交' })
        } else if (apply == 2) {
          this.setState({
            apply: '已同意',
            status: 1
          })
        } else if (apply == 3) {
          this.setState({ apply: '被拒绝' })
        }
      } else {
        alert('网络错误，请稍后重试')
      }
    })
  }
  collection () {
    this.setState({ collection: !this.state.collection })
  }

  // 点击申请课程
  applycourse () {
    message.config({
      top: 100,
      duration: 5
    })
    const success = () => {
      message.success('已成功申请,等待老师同意')
      this.setState({ apply: '已提交' })
    }
    if (!this.state.apply || this.state.apply == '被拒绝') {
      let data = `cid=${this.props.location.query.id}`
      POST1('/user/createCu.action', data, (re) => {
        if (re.status === 1) {
          success()
        } else if (re.status == 21) {
          this.setState({ login: false })
          info()
        }
      })
    } else {
      message.error('请勿重复申请')
    }
  }

  askquestion (e) {
    this.setState({ datavalue: e.target.value })
  }

  // 课程页面提出问题接口
  sub () {
    const success = () => {
      message.success('问题成功提出', 1.5)
    }
    var cid = this.props.location.query.id
    var data = this.state.datavalue
    var data1 = `data=${data}&cid=${cid}`
    POST1('/user/createQuestion.action', data1, (re) => {
      if (re.status == 1) {
        success()
        this.askques(cid)
        this.setState({ datavalue: '' })
      }
    })
  }
  // 为我要提问添加键盘事件
  keydown (e) {
    if (e.keyCode == 13) {
      this.sub()
    }
  }
  // 问答页数改变的回调
  changePage (page, pageSize) {
    let id = this.state.cid
    var data1 = `cid=${id}&pageNum=${page}&pageSize=4`
    POST1('/getQuestion.action', data1, (re) => {
      if (re.status === 1) {
        this.setState({ queslist: re.data.list })
        console.log(re)
        this.setState({ apply1: true })
      } else if (re.status == 21) {
        this.setState({ login: false })
      }
    })
  }
  render () {
    var getcourse = this.state.getcourse
    const customPanelStyle = {
      borderRadius: 2,
      marginBottom: 24,
      border: 1,
      width: 600
    }
    return (
      <div className='course-infos'>
        <div className='course-wraps'>
          <div className='middle-wrap'>
            <Row>
              <Col span={10}>
                <h1 className='main-title'>{`${getcourse.name}`}</h1>
                <span
                  className='course-power'
                  style={{ fontFamily: '宋体', fontSize: 14 }}
                >
                  {getcourse.public === 1 ? '公开课' : '限选课'}
                </span>
              </Col>
            </Row>
            <div className='statics'>
              <div className='red-btn' onClick={() => { this.applycourse() }} >
                <a href='#' > {this.state.status === 1 ? '开始学习' : '申请学习'}
                  {this.state.apply ? <h6 style={{ padding: 2, color: 'white' }}>&nbsp;({this.state.apply})</h6> : ''}</a>
              </div>
              <div className='static-item'>
                <span className='meta'>难度级别</span>
                <span className='meta-value'>
                  {getcourse.level === 1 ? '初级' : getcourse.level === 2 ? '中级' : '高级'}</span>
              </div>

              <div className='static-item'>
                <span className='meta'>开始时间</span>
                <span className='meta-value'>{moment(getcourse.startDate).format('YYYY-MM-DD')}</span>
              </div>
              <div className='static-item' style={{ borderRight: 'none' }}>
                <span className='meta'>结束时间</span>
                <span className='meta-value'>{moment(getcourse.endDate).format('YYYY-MM-DD')}</span>
              </div>
            </div>
          </div>
        </div>
        <div className='course-info-main'>
          <Row>
            <Col span={15}>
              <div className='course-chapter'>
                <p
                  style={{
                    marginBottom: 30,
                    backgroundColor: '#D0E9FF',
                    color: '#011935',
                    textIndent: '2em',
                    padding: 5
                  }}
                >
                  简介：{getcourse.info}
                </p>
                <Tabs defaultActiveKey='1' tabPosition='left'>
                  <TabPane tab='章节' key='1' style={customPanelStyle}>
                    {this.state.status === 1
                      ? <Charpter id={this.state.cid} cname={getcourse.name} /> : <span
                        style={{ fontSize: 20, marginTop: 20, marginLeft: 178, display: 'inline-block' }}>请先申请学习,并等待老师同意</span>}
                  </TabPane>
                  <TabPane tab='考试' key='2' style={customPanelStyle}>
                    {this.state.status === 1
                      ? <Exam data={getcourse} /> : <span
                        style={{ fontSize: 20, marginTop: 20, marginLeft: 178, display: 'inline-block' }}>
                        请先申请学习,并等待老师同意</span>}
                  </TabPane>
                  <TabPane tab='评论' key='3' style={customPanelStyle}>
                    {this.state.status === 1
                      ? <CommentBox cid={this.state.cid} /> : <span
                        style={{ fontSize: 20, marginTop: 20, marginLeft: 178, display: 'inline-block' }}>
                        请先申请学习,并等待老师同意</span>}
                  </TabPane>
                  <TabPane tab='问答' key='4' style={customPanelStyle}>
                    {this.state.status === 1
                      ? <div>
                        <TextArea rows={4} onChange={(e) => { this.askquestion(e) }}
                          value={this.state.datavalue} onKeyDown={(e) => this.keydown(e)} />
                        <Button
                          className='qa-btn'
                          onClick={() => { this.sub() }}
                        >
                          我要提问
                      </Button>
                        {this.state.queslist.map((item, i) => {
                          return (
                            <Courseqa key={i} data={item} cid={this.props.location.query.id} />
                          )
                        })
                        }
                        <Pagination defaultCurrent={1} total={this.state.allCount}
                          onChange={(page, pageSize) => { this.changePage(page, pageSize) }} pageSize={4} />,
                    </div> : <span
                      style={{ fontSize: 20, marginTop: 20, marginLeft: 178, display: 'inline-block' }}>
                        请先申请学习,并等待老师同意</span>}
                  </TabPane>
                </Tabs>
              </div>
            </Col>
            <Col span={6} offset={2}>
              <div className='course-prompt'>
                <div>
                  <Tintroduction teacher={getcourse.teacher} course={getcourse} />
                </div>
              </div>
            </Col>
          </Row>
        </div>
      </div>
    )
  }
}

