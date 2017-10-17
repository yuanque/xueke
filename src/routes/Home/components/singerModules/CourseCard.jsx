import React, { Component } from 'react'
import PropTypes from 'prop-types' // ES6
import './CourseCard.scss'
import { Button } from 'antd'

class CourseCard extends Component {
  skip() {
    this.props.skip(this.props.id)
  }
  render() {
    const colores = ['#F5675D', '#EDDC49', '#72CB6F', '#5FBDB7', '#6984E3', '#FC9C12', '#88a75f', '#5f92a7']
    const ic = Math.round(Math.random() * 7)
    return (
      <div className='card-con' >
        <div className='course-card' style={{ textDecoration: 'none' }}>
          <div className='course-wrap' style={{ backgroundColor: colores[ic] }} >
            <span><b>{this.props.name}</b></span>
          </div>
          <div className='course-body'>
            <div className='course_know' >课程简介：<br />
              {this.props.info}
            </div>
            <div className='course-card-info'><span>
              {this.props.level === 1 ? '初级 ' : this.props.level === 2 ? '中级 ' : '高级 '}
              |</span><span>{this.props.totle}人在学</span></div>
            <div className='course-bottom'>
              <Button onClick={() => { this.skip() }} style={{}}>立即学习</Button>
            </div>
          </div>
        </div>
      </div>
    )
  }
  // // 定义传入参数的类型

}
CourseCard.propTypes = {
  name: PropTypes.string.isRequired,
  skip: PropTypes.func.isRequired,
  know: PropTypes.string.isRequired,
  level: PropTypes.number.isRequired,
  id: PropTypes.number.isRequired
}
export default CourseCard
