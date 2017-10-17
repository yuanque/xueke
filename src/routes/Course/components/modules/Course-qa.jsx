import React, { Component } from 'react'
import { Row, Col, Icon, Input, Button, message } from 'antd'
import '../css/courseqa.scss'
import { browserHistory } from 'react-router'
import { POST1, BASE_URL } from '../../../../components/commonModules/POST'
import moment from 'moment'
const { TextArea } = Input

export default class Courseqa extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      likecount: 0,
      result: true,
      like: false,
      answer: '',
      text: ''
    }
  }
  componentDidMount() {
    this.props.data.question == null ? this.setState({ result: false }) : ''
  }
  changevalue(e) {
    this.setState({ answer: e.target.value })
  }

  // 回答问题的接口
  submit() {
    var text = this.state.answer
    var id = this.props.data.id
    var cid = this.props.data.cid
    var data = `data=${text}&qid=${id}&cid=${cid}`
    POST1('/user/createQuestion.action', data, (re) => {
      if (re.status == 1) {
        message.success('回答成功')
        this.setState({ answer: '' })
        this.refs.getanswer.getQuestion()
      } else if (re.status == 22) {
        message.error('对不起，只有老师才能回答问题')
      } else {
        message.error('网络错误')
      }
    })
  }
  render() {
    const aid = this.props.id
    const qqid = this.props.qid
    const ccid = this.props.cid
    const { data, startedDate, pid, id, question } = this.props.data
    const { head, account } = this.props.data.user
    return (
      <div className='course-qa' >
        <Row>
          <Col span={2} >
            <div className='header-container'>
              <img src={BASE_URL + head} height='35px' width='35px' />{this.state.result == false
                ? <Icon type='question-circle-o' className='icon-ques-revert' /> : <Icon type='check-circle' className='icon-ques-true' />}
            </div>
          </Col>
          <Col span={18} offset={1}>
            <div className='qa-content'>
              <a href='' className='user-name' >{account}</a>
              <a href=''><h3 className='qa-title'>{data}</h3></a>
              <Answer list={question} />
              {this.props.type != 1 ? <div>
                <TextArea placeholder='请输入你的答案' cols={15} rows={2} style={{ display: 'inline-block', width: 450 }}
                  onChange={this.changevalue.bind(this)} value={this.state.answer} />
                <Button style={{ display: 'inline-block', marginLeft: 390, marginTop: 5 }} onClick={this.submit.bind(this)}>提交</Button></div>
                : ''}
              <div className='qa-time'>时间：{moment(startedDate).format('YYYY-MM-DD')}</div>
            </div>
          </Col>
        </Row>
      </div>
    )
  }
}

// 问题的回答列表
class Answer extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      anslist: this.props.list, // 回复列表
      aname: ''
    }
  }

  componentDidMount() {
    let p = this.state.anslist
    if (this.state.anslist != null) {
      let data = `id=${p.uid}`
      POST1('/user/getUserInfo.action', data, (re) => {
        if (re.status == 1) {
          this.setState({ aname: re.data.account })
        } else {
          message.error('网络错误请重试')
        }
      })
    }
  }
  // 将获取问答放到方法中

  render() {
    const { anslist, aname } = this.state
    return (
      <div style={{ marginLeft: 10, marginTop: 5 }}>
        {
          anslist != null ? <div style={{ marginLeft: 15 }}>
            <span >
              <span style={{ fontSize: 12 }}>{aname}:</span>
              <p style={{ display: 'inline-block', fontSize: 12, color: '#93999f' }}>{anslist.data}</p><br />
            </span>

          </div> : <span style={{ fontSize: 12, marginLeft: 15, color: '#93999f' }}>暂无回答</span>
        }
      </div>
    )
  }
}
