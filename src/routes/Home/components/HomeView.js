import React from 'react'
import './HomeView.scss'
import { Row, Col, Carousel, Button, Pagination } from 'antd'
import { POST1 } from '../../../components/commonModules/POST'
import { browserHistory } from 'React-router'
import CourseCard from '../components/singerModules/CourseCard.jsx'
import img1 from '../img/banner1.png'
import img2 from '../img/banner2.jpg'
import img3 from '../img/banner3.jpg'
import img4 from '../img/banner4.jpg'

class HomeView extends React.Component {
  constructor(props) {
    super(props)
    this.skip = this.skip.bind(this)
    this.state = {
      courseinfo: [],
      current: 0,
      add: false,
      sub: true,
      nextcourse: [],
      allCount: 0,
      
    }
  }
  // 获取首页课程信息
  componentWillMount() {
    let data = `pageSize=9&pageNum=1`
    POST1('/getDClass.action', data, re => {
      if (re.status == 1) {
        this.setState({ allCount: re.data.total })
        this.setState({ courseinfo: re.data.list })
      }
    })
  }
  // 从主页跳转到课程详情
  skip(id) {
    browserHistory.push({
      pathname: `/course`,
      query: {
        // 将课程id传入课程详情
        id: id
      }
    })
  }

  changePage(page, pageSize) {
    console.log(page)
    var data = `pageSize=9&pageNum=${page}`
    POST1('/getDClass.action', data, (re) => {
      if (re.status == 1) {
        this.setState({ courseinfo: re.data.list })
      } else {
        alert('网络出错，请稍后再试')
      }
    })
  }

  render() {
    console.log(this.state.courseinfo)
    return (
      <div className='homepage'>
        <div className='carousel'>
          <Carousel autoplay>
            <div>
              <h3>
                <img src={img1} height='430px' width='100%' />
              </h3>
            </div>
            <div>
              <h3>
                <img src={img2} height='430px' width='100%' />
              </h3>
            </div>
            <div>
              <h3>
                <img src={img3} height='430px' width='100%' />
              </h3>
            </div>
            <div>
              <h3>
                <img src={img4} height='430px' width='100%' />
              </h3>
            </div>
          </Carousel>
        </div>
        <h2 className='title'><b style={{ color: 'gray' }}>今日推荐</b></h2>
        <div className='course-com'>
          <Row>
            {this.state.courseinfo.map((item, i) => {
              return (
                <Col span={7} offset={1} style={{ marginBottom: 20, marginLeft: 15, marginRight: 10 }} key={i}>
                  <CourseCard
                    {...item}
                    skip={this.skip}
                  />
                </Col>
              )
            })}
          </Row>
          <div style={{ textAlign: 'center' }}>
            <Pagination defaultCurrent={1} total={this.state.allCount} pageSize={9}
              onChange={(page, pageSize) => { this.changePage(page, pageSize) }} />
          </div>

        </div>
      </div>
    )
  }
}

export default HomeView
