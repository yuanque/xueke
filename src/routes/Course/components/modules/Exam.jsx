import React from 'react'
import '../css/All.scss'
import { browserHistory } from 'React-router'
import { POST1 } from '../../../../components/commonModules/POST.js'
class Exam extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      endSorse:''
    }
  }

  goexam () {
    let id = this.props.data.id
    browserHistory.push({
      pathname: `/examination`,
      query: {
        type:2,
        cid: id,
        tid:this.props.data.tid,
        cname:this.props.data.name,
        chapterName:'期末考试'
      }
    })
  }
  componentWillMount () {
    let id = this.props.data.id
    let data = `cid=${id}`
    POST1('/user/getScore.action', data, (re) => {
      var arr = re.data.filter((arr) => arr.type == 4)
      this.setState({ endSorse:arr[0].score })
    })
  }
  render () {
    return (
      <div className='exam-detail'>
        <div className='status_header'>
          <span className='exam-type' >期末考试</span>
          {this.state.endSorse == null
          ? <a style={{ textDecoration: 'none' }} onClick={() => this.goexam()}>
            <span className='status_tag'>开始考试</span>
          </a> :
          <span className='status_tag'>最终成绩:{this.state.endSorse}分</span>}
        </div>
        <div className='status_body'>
          <p>考试时长：120分钟</p>
          <p>考试总分：100分</p>
          <p>批改方式：老师批改</p>
          <p>考试题型：主观题</p>
          <p>所占权重：总成绩的25%（本次得分，乘以0.25纳入总成绩）</p>
          <p style={{ color:'red' }}><b>本次答卷将计入最终成绩，请确认所有章节试题和课程学习已完成!</b></p>
        </div>
      </div>
    )
  }
}
export default Exam
