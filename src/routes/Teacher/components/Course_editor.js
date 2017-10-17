import React from 'react'
import './Course_editor.scss'
import Section from './Sections'
import Test from './testEdit'

export default class Editor extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      disable: true,
      page: 1
    }
  }

  testPage (num) {
    this.setState({ page: num })
  }

  Disable () {
    this.setState({ disable: !this.state.disable })
  }
  render () {
    const { disable } = this.state
    return (
      <div>
        {this.state.page == 1
          ? <div className='clearfix'>
            <Section Change={this.props.Change} Page={this.testPage.bind(this)} cid={this.props.cid} />

          </div>
          : <Test Change={this.testPage.bind(this)} />}
      </div>
    )
  }
}
