import React, { Component } from 'react'
import './CoursExam.scss'
import { Row, Col, Icon, Progress } from 'antd'
import { POST1 } from '../../../components/commonModules/POST'
export default class CoursExam extends Component {
  constructor(props) {
    super(props)
    this.state = {
      chapter1: []
    }
  }
  componentWillMount() {
    let id = 10
    var data = `cid=${id}`
    this.setState({ cid: id })
    // 获取章信息接口
    POST1(`/getChapterByCid.action`, data, (re) => {
      if (re.status == 1) {
        this.setState({ chapter1: re.data })
      }
    })
  }
  render() {
    return (
      <div className='course_management'>
        <Row>
          <Col span={10} offset={2}>
            <div className='course-left'>
              <div className='course-name'>
                <h2 style={{ display: 'inline-block', marginTop: 10, marginLeft: 15, fontFamily: '微软雅黑' }}>中西文化比较</h2>
                <span style={{ display: 'inline-block', marginLeft: 300 }}>学习到2.1  中西地理与文化关系比较概述</span>
              </div>
              {this.state.chapter1.map((item, i) => {
                return (
                  <div className='chapter-list' key={i}>
                    <span style={{ fontSize: 19, fontWeight: 'normal' }}>第{i + 1}章
                    <Icon type='caret-right' /></span>
                    <span style={{ marginLeft: 18, fontSize: 17 }}>{item.name}</span>
                    <div className='single-passage' >
                      <SinglePassage id={item.id} passid={i} />
                    </div>
                  </div>
                )
              })}
            </div>
          </Col>
          <Col />
        </Row>
      </div>
    )
  }
}
class SinglePassage extends Component {
  constructor(props) {
    super(props)
    this.state = {
      passage: [],
      progress: []
    }
  }
  componentWillMount() {
    var id = this.props.id
    var data = `id=${id}`
    POST1(`/getPassageByChId.action`, data, re => {
      if (re.status == 1) {
        this.setState({ passage: re.data })
      }
    })
  }
  render() {
    return (
      <div className='single-passage'>
        <ul>
          {this.state.passage.map((item, i) => {
            return (
              <li key={i}><span style={{ fontSize: 14, marginRight: 10 }}>{this.props.passid + 1}.{i + 1}</span>
                <Progress1 id={this.props.id} pid={item.id} />
                <span style={{ marginLeft: 10 }}>{item.name}</span>
              </li>)
          })}
        </ul>
      </div>

    )
  }
}
class Progress1 extends Component {
  constructor(props) {
    super(props)
    this.state = {
      progress: 1
    }
  }
  componentWillMount() {
    // 查询学习进度接口
    var data = `cid=${this.props.id}&pid=${this.props.pid}`
    POST1('/user/getProgress.action', data, (re) => {
      if (re.status == 1) {
        console.log(re.data)
        this.setState({ progress: re.data.type })
      }
    })
  }
  render() {
    return (
      <Progress type='circle' percent={100} width={19} status='exception' />
    )
  }
}
