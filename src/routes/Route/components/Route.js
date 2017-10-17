import React, { Component } from 'react'
import './Route.scss'
import { Button } from 'antd';
import { browserHistory,Link } from 'react-router'

class Route extends Component {
  constructor(props) {
    super(props)

  }
  render() {
    return (
      <div className='card-container'>
      <a href="" className='course-card' style={{ textDecoration: 'none' }}>
        <div className='course-wrap'>
          <span>java</span>
        </div>
        <div className="course-body">
          <h3 className="course-card-name">HTML+CSS基础课程</h3>
          <p title="HTML+CSS基础教程8小时带领大家步步深入学习标签用法和意义">HTML+CSS基础教程8小时带领大家步步深入学习标签用法和意义</p>
          <div className="course-bottom">
            <Button >立即学习</Button>
						</div>   
        </div>
      </a>
      </div>
    )
  }
}
export default Route
