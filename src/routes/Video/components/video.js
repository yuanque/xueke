import React, { Component } from 'react'
import './video.scss'
import { Row, Col, Icon, Tabs, Input, Button, message } from 'antd'
import { POST1, BASE_URL } from '../../../components/commonModules/POST'
import CommentBox from '../../Course/components/modules/CommentBox'
import Courseqa from '../../Course/components/modules/Course-qa.jsx'
import { browserHistory } from 'React-router'
const TabPane = Tabs.TabPane
const { TextArea } = Input

export default class video extends Component {
  constructor(props) {
    super(props)
    this.state = {
      like: false,
      collection: false,
      filelocation: null,
      textarea: '',
      questionlist: []

    }
  }
  componentDidMount() {
    // 获取视频接口
    var passageid = this.props.location.query.passageid
    var cid = this.props.location.query.cid
    var data = `id=${passageid}`
    POST1('/user/getFile.action', data, (re) => {
      if (re.status == 1) {
        this.setState({ filelocation: re.data.location })
      }
    })
    // 获取问答接口
    var data1 = `pid=${passageid}`
    POST1('/getQuestion.action', data1, (re) => {
      if (re.status == 1) {
        this.setState({ questionlist: re.data.list })
      }
    })
    // 告诉服务器用户开始看视频
    var data2 = `cid=${cid}&pid=${passageid}&type=1`
    POST1('/user/createProgress.action', data2, (re) => {
      if (re.status === 1) {
        console.log('开始看')
      }
    })
  }

  // 提出问题接口
  askquestion() {
    var pid = this.props.location.query.passageid
    var cid = this.props.location.query.cid
    var text = this.state.textarea
    var data = `pid=${pid}&cid=${cid}&data=${text}`
    POST1('/user/createQuestion.action', data, (re) => {
      if (re.status == 1) {
        message.success('问题已成功提出')
        this.setState({ textarea: '' })
        let data1 = `pid=${this.props.location.query.passageid}`
        POST1('/getQuestion.action', data1, (re) => {
          if (re.status == 1) {
            this.setState({ questionlist: re.data.list })
          }
        })
      } else {
        message.error('网络错误请重试')
      }
    })
  }
  //
  changevalue(e) {
    this.setState({ textarea: e.target.value })
  }
  end() {
    var passageid = this.props.location.query.passageid
    var cid = this.props.location.query.cid
    var data2 = `cid=${cid}&pid=${passageid}&type=2`
    POST1('/user/createProgress.action', data2, (re) => {
      if (re.status === 1) {
        console.log('已看完')
      }
    })
  }

  rebac() {
    var cid = this.props.location.query.cid
    browserHistory.go(-1)
  }
  render() {
    var filelocation = this.state.filelocation
    var pid = this.props.location.query.passageid
    var cid = this.props.location.query.cid
    var nump = this.props.location.query.num
    var cname = this.props.location.query.cname
    if (!cid || !pid) {
      history.go(-1)
      alert('课程章节参数不合法')
    }
    return (
      <div className='video'>
        <div className='passage_header'>
          <Row>
            <Col span={12} offset={0}>
              <div className='course_detail'>
                <a onClick={this.rebac.bind(this)}><Icon type='arrow-left' className='icon_arrow' /></a>
                <div className='chapter-passage'><Row><Col span={10} offset={0}>
                  <span className='video-chapter'>{cname}</span>
                  <span className='video-passage'> 第{nump}节</span>
                </Col>
                </Row>
                </div>
              </div>
            </Col>
          </Row>
        </div>
        <div className='video-box-mocoplayer'>
          <div className='video-box'>
            <video autoPlay='autoplay' controls='controls'
              width='83%' style={{ margin: '0 100px', height: '100%' }} onEnded={() => { this.end() }} >
              {filelocation ? <source src={BASE_URL + filelocation} type='video/mp4' /> : ''}
            </video>
          </div>
        </div>
        <div className='course-subcontainer'>
          <Row>
            <Col span={24} >
              <div className='course-left'>
                <div >
                  <Tabs defaultActiveKey='1' >
                    <TabPane tab='评论' key='1'> <CommentBox pid={pid} cid={cid} /></TabPane>
                    <TabPane tab='问答' key='2'>
                      <TextArea rows={4} cols={15} className='areatext' onChange={this.changevalue.bind(this)} value={this.state.textarea} />
                      <Button type='primary' onClick={this.askquestion.bind(this)} style={{ marginTop: 10 }}>提 问</Button>
                      {this.state.questionlist.length > 0 ? this.state.questionlist.map((item, i) => {
                        console.log(item)
                        return (<Courseqa key={i} data={item} cid={cid} />)
                      }) : ''}
                    </TabPane>
                  </Tabs>
                </div>
              </div>
            </Col>
            <Col>
              <div className='course-right' />
            </Col>
          </Row>
        </div>
      </div>
    )
  }
}
