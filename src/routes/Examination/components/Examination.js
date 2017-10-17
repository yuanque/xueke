import React from 'react'
import './Examination.scss'
import SingleExam from './SingleExam'
import TestEdit from './TestEdit'
import { Button, message } from 'antd'
import { POST1 } from '../../../components/commonModules/POST'

class Examination extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      a: true,
      data: [],
      uname: '',
      type: this.props.location.query.type
    }
  }
  componentDidMount = () => {
    var id = this.props.location.query.cid
    var tid = this.props.location.query.tid
    let type = this.props.location.query.type
    if (type) {
      this.setState({ a: false })
    }
    if (!id) {
      message.error('有误，请返回并刷新再试')
      history.go(-1)
    }
    let data1 = `tid=${tid}`
    let data2 = ``
    POST1('/user/getTestByTid.action', data1, (re) => {
      console.log(re)
      this.setState({ data: re.data })
    })
    POST1('/user/getUserInfo.action', data2, (re) => {
      this.setState({ uname: re.data.account })
    })
  }

  back() {
    history.back()
    if (this.state.type == 2) {
      let data = `cid=${this.props.location.query.cid}`
      POST1('/createScore.action', data, (re) => {
        if (re.status == 1) {
          message.success('你已完成本课程学习，最终成绩已生成')
        } else {
          message.error('网络错误，请稍后重试')
        }
      })
    }
  }

  render() {
    var tid = this.props.location.query.id
    var data = this.state.data
    return (
      <div>
        <div className='m-conhead'>
          <div className='m-learnhead'>
            <span>课程：</span>
            <p
              style={{ marginTop: 10, marginLeft: 20, display: 'inline-block' }}
            >
              {this.props.location.query.cname}:{this.props.location.query.chapterName}
            </p>
            <br />
            <p style={{ display: 'inline-block', fontSize: 12 }}>{this.state.uname}</p>
          </div>

        </div>
        <div className='u-learn-moduletitle'>
          <h2 style={{ display: 'inline-block' }}>{this.state.a === false ? '章节小测验' : '期末考试'}</h2>
        </div>

        <div className='m-learnbox'>
          {data.map((item, i) => {
            return (<SingleExam data={item} key={i} />)
          })}
        </div>
        <div>
          <a
            style={{ display: 'inline-block', marginLeft: 420 }}
          >
            <Button icon='left-square-o' className='back' style={{ marginBottom: 50 }} onClick={this.back.bind(this)}>
              完成答题并返回
            </Button>
          </a>
        </div>
      </div>
    )
  }
}
export default Examination
