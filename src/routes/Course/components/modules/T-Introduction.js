import React, { Component } from 'react'
import './Chapter.scss'
import { BASE_URL } from '../../../../components/commonModules/POST'
import { browserHistory } from 'React-router'
class Tintroduction extends Component {
  constructor(props) {
    super(props)
  }
  // 点击跳转到老师页面
  tinfo() {
    browserHistory.push({
      pathname: `/pinfo`,
      query: {
        // 将课程id传入课程详情
        id: this.props.teacher.id,
        type: 1
      }
    })
  }
  render() {
    const { know, gain } = this.props.course
    const { name, head, emil } = this.props.teacher
    var knowlist = know //? JSON.parse(know) : []
    return (
      <div className='bigbox'>
        <p>讲师提示</p>
        <div className='touxiang'>
          <img className='img1' src={BASE_URL + head} width='90px' height='90px' onClick={() => this.tinfo()} />
        </div>
        <div className='name'><span onClick={() => this.tinfo()}>{name}</span><br />
          <span style={{ fontSize: 10 }}>邮箱：{emil}</span>
        </div>
        <div className='tag'>
          <div className='know'>
            <h3>课程须知</h3><br />
            <div className='child_know' style={{ marginLeft: 15, whiteSpace: 'pre-line' }}>
              {/*
                knowlist.map((item, i) => {
                  return (<div key={i}>{item}</div>)
                })
              */}
              <div >{knowlist}</div>
            </div>
          </div>
          <div className='tellyou' style={{ marginLeft: 15, whiteSpace: 'pre-line' }}>
            <h3>老师告诉你能学到什么</h3><br />
            <div className='child_tellyou'>{gain}{/*know ? JSON.parse(know).map((item, i) => {
              return (<div key={i}>{item}</div>)
            }) : ''*/}</div>
          </div>
        </div>
      </div>
    )
  }
}

export default Tintroduction
