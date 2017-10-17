import React, { Component } from 'react'
import { Collapse, Radio, Icon } from 'antd'
import './Chapter.scss'
import { POST1, BASE_URL } from '../../../../components/commonModules/POST'
import { browserHistory } from 'React-router'
const Panel = Collapse.Panel

export default class Chapter extends Component {
  constructor(props) {
    super(props)
    this.state = {
      chapter: [],
    }
  }
  // 查询章信息
  componentWillMount() {
    var cid = this.props.id
    var data = `cid=${cid}`
    POST1(`/getChapterByCid.action`, data, re => {
      if (re.status == 1) {
        this.setState({ chapter: re.data })
      }
    })
  }

  render() {
    var cid = this.props.id
    return (
      <div className='chapter'>
        <Collapse style={{ borderLeft: 'none' }}>
          {this.state.chapter.map((item, i) => {
            return (
              <Panel style={{ border: 'none' }} header={item.name} key={i} >
                <Passage id={item.id} cid={cid} cname={this.props.cname} chapterName={this.state.chapter[i].name} />
              </Panel>
            )
          })}
        </Collapse>
      </div>
    )
  }
}
class Passage extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      passage: [],
      passageid: '',
      cid: ''
    }
  }

  // 通过章id获取节信息
  componentWillMount() {
    var id = this.props.id
    this.setState({ cid: id })
    var data = `id=${id}`
    POST1(`/getPassageByChId.action`, data, re => {
      if (re.status == 1) {
        this.setState({ passage: re.data, passageid: re.data.id })
      }
    })
  }
  // 向节视屏界面发送数据（节id）
  changeRadio(type, num) {
    if (type == 1) {
      var cid = this.props.cid
      browserHistory.push({
        pathname: '/video',
        query: {
          passageid: this.state.passage[num].data,
          num: num + 1,
          cid: cid,
          cname: this.props.cname
        }
      })
    } else if (type == 2) {
      var data = `id=${this.state.passage[num].data}`
      POST1('/user/getFile.action', data, (re) => {
        if (re.status == 1) {
          let location = re.data.location
          location=location.substring(0,location.length-5);
          window.open(BASE_URL + location+'.pdf', '_blank')

        }
      })
    } else {
      browserHistory.push({
        pathname: '/examination',
        query: {
          type: 1,
          cid: this.state.passage[num].data,
          cname: this.props.cname,
          chapterName: this.props.chapterName,
          tid: this.state.passage[num].id
        }
      })
    }
  }

  render() {
    const Style1 = {
      display: 'inine-block',
      marginLeft: 20,
      position: 'relative',
      top: 8,
      borderRaduis: 3
    }
    const Style2 = {
      textDecoration: 'none',
      display: 'inline-block',
      marginLeft: 15,
      width: '80%'
    }
    const getIcn = (i) => {
      return i == 1 ? 'pause-circle-o' : i == 2 ? 'download' : 'download'
    }
    return (
      <div style={Style2} >
        {this.state.passage.map((item1, i) => {
          const itemIcon = getIcn(item1.type)
          return (
            <div key={i} style={{ textDecoration: 'none', display: 'block', marginBottom: 5 }}
              className='passage-detail' onClick={() => { this.changeRadio(item1.type, i) }}>
              <Icon type='info-circle-o' style={{ position: 'relative', top: 10 }} />
              <span>
                <span style={Style1}>{item1.name}</span>
                <Icon type={itemIcon} style={{ float: 'right', marginRight: 30, position: 'relative', top: 13 }} />
              </span>
            </div>
          )
        }
        )}
      </div>
    )
  }
}
