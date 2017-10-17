import React, { Component } from 'react'
import { Collapse } from 'antd';
import './Chapter.scss'
const Panel = Collapse.Panel;


export default class Chapter extends Component {
  constructor(props) {
    super(props);
    this.state = {
      chapter: [
        {
          icon_chapter: "第1章 常用异常集及解决方案-课程介绍 ",
          s_chapter: ["课程介绍", '课程须知'],
        },
        {
          icon_chapter: "第1章 常用异常集及解决方案-课程介绍",
          s_chapter: ["课程介绍", '课程须知'],
        },
        {
          icon_chapter: "第1章 常用异常集及解决方案-课程介绍 ",
          s_chapter: ["课程介绍", '课程须知'],
        }
      ]
    }
  }

  render() {
    const DemoBox = props => <p style={{ height: props.value, display: 'table-cell', verticalAlign: 'middle', width: 100 }}>{props.children}</p>;
    return (
      <div className='chapter'>
        <Collapse defaultActiveKey={['1']} >
          {this.state.chapter.map}
          <Panel header="This is panel header 1" key="1">
            <p>text</p>
          </Panel>
          <Panel header="This is panel header 2" key="2">
            <p>text</p>
          </Panel>
          <Panel header="This is panel header 3" key="3" disabled>
            <p>text</p>
          </Panel>
        </Collapse>
      </div>
    )
  }
}
