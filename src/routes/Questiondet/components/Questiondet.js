import React, { Component } from 'react'
import './All.scss'
import { Row, Col, Icon, Input, Button, Collapse } from 'antd'
import Course_card from '../../Home/components/singerModules/CourseCard.jsx'
import { POST1 } from '../../../components/commonModules/POST'
const Panel = Collapse.Panel
import browserHistory from 'react-router'
class Questiondet extends Component {
  constructor(props) {
    super(props)
    this.state = {
      searchres: [{}]
    }
  }
  componentWillMount() {
    let value = this.props.location.query.value
    let data = `name=%${value}%`
    POST1('/getDClasses.action', data, (re) => {
      if (re.stastus === 1) {
        this.setState({ searchres: re.data })
      }
    })
  }
  skip(id) {
    browserHistory.push({
      pathname: `/course`,
      query: {
        id: id,
      }
    });
  }
  render() {
    return (
      <div className='search-res'>
        {this.state.searchres.map((item, i) => {
          <Course_card {...item} skip={this.skip.bind(this)} />
        })}
      </div>

    )
  }
}

export default Questiondet
