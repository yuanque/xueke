import React, { Component } from 'react'
import './searchresult.scss'
import { Row, Col, message } from 'antd'
import img1 from './img/search.png'
import CourseCard from '../../Home/components/singerModules/CourseCard.jsx'
import { POST1 } from '../../../components/commonModules/POST'
import browserHistory from 'react-router'
export default class SerachResult extends Component {
  constructor (props) {
    super(props)
    this.state = {
      searchres: [],
      searchvalue: ''
    }
    this.searchbtn = this.searchbtn.bind(this)
  }
  static propTypes = {
    location:React.PropTypes.object.isRequired
  };
  componentWillMount () {
    let value = this.props.location.query.value

    let data = `name=${value}`
    POST1('/getDClass.action', data, re => {
      if (re.status === 1) {
        console.log(re)
        this.setState({ searchres: re.data.list })
        this.refs.inputtext.value = value
      }
    })
  }
  skip (id) {
    browserHistory.push({
      pathname: `/course`,
      query: {
        id: id
      }
    })
  }
  searchbtn () {
    let value = this.refs.inputtext.value
    if (value !== '') {
      let data = `name=${value}`
      POST1('/getDClass.action', data, re => {
        if (re.status === 1) {
          this.setState({ searchres: re.data })
        }
      })
    } else {
      message.error('请输入内容')
    }
  }
  // 输入框按enter键实现搜索
  keysearch (e) {
    this.searchbtn()
  }
  render () {
    return (
      <div className='search-container'>
        <div className='search-header'>
          <div className='search-form'>
            <img src={img1} height='30px' width='30px' className='search-img' />
            <input type='text' className='search-form-ipt' ref='inputtext' onKeyPress={() => this.keysearch()} />
            <span className='search-btn' onClick={this.searchbtn}>
              搜索
            </span>
          </div>
        </div>
        <div className='search-result'>
          <h2 className='search-count'>
            共有{this.state.searchres.length}条记录
          </h2>
          <Row>
            {this.state.searchres.length === 0 ? <span style={{ fontSize:26, display:'block', marginLeft:250 }}>没有查到相关课程</span> : ''}
            {this.state.searchres.map((item, i) => {
              console.log(this.state.searchres.length)
              return (
                <Col span={7} offset={1} ket={i}>
                  <CourseCard
                    {...item}
                    skip={() => { this.skip() }}
                  />
                </Col>
              )
            })}
          </Row>
        </div>
      </div>
    )
  }
}
