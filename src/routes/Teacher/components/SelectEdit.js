import React, { Component } from 'react'
import { Card, Col, Row, Button, Collapse, Input, Select, Upload, Icon, Modal, message, Spin } from 'antd'
import { POST1, POSTFile } from '../../../components/commonModules/POST'
import './SelectEdit.scss'
import Test from './testEdit'
const Panel = Collapse.Panel
const Option = Select.Option
export default class SelectEdit extends Component {
  constructor(props) {
    super(props)
    this.state = {
      data: [],
      disabled: ''
    }
  }
  componentDidMount = () => {
    this.getData()
  }
  getData() {
    var cid = this.props.cid
    const data = `cid=${cid}`
    POST1('/getChapterByCid.action', data, (re) => {
      if (re.status == 1) {
        this.setState({ data: re.data })
      }
    })
  }
  addCH() {
    var dataSet = this.state.data
    var data = {
      oNm: dataSet.length,
      info: 'a',
      name: '未命名',
      cid: this.props.cid
    }
    var url = '/createChapter.action'
    var p = `name=${data.name}&info=${data.info}&oNm=${data.oNm}&cid=${data.cid}`
    POST1(url, p, (re) => {
      if (re.status == 1) {
        // alert('添加成功')
        // 通知渲染
        this.getData()
        this.setState({ disabled: false })
      }
    })
  }
  changeName(i, v) {
    var data = this.state.data
    data[i].name = v
    this.setState({ data: data })
  }
  saveCH(isup, idx) {
    var url = ''
    var data = this.state.data[idx]
    url = '/updataChapter.action'
    var p = `name=${data.name}&id=${data.id}`
    POST1(url, p, (re) => {
      if (re.status == 1) {
        // alert('更新成功')
      }
    })
  }
  del(isup, i) {
    var url = '/deleteChapter.action'
    var data = this.state.data
    var p = `id=${data[i].id}`
    POST1(url, p, (re) => {
      if (re.status == 1) {
        // alert('删除成功')
        data.pop()
        this.setState({ data: data })
        this.setState({ isNew: false })
      }
    })
  }
  render() {
    const customPanelStyle = {
      background: '#f7f7f7',
      borderRadius: 4,
      marginBottom: 24,
      border: 0
    }
    return (
      <Card title='章节分布' >
        {this.state.data.map((item, i) => {
          return (
            <Card key={i} style={customPanelStyle} title={<span>第{i + 1}章
              <input className='passageInput' onBlur={() => { this.saveCH(item.id > 0, i) }} value={item.name} onChange={(v) => { this.changeName(i, v.target.value) }} /></span>}
              extra={(<span>
                <Button type='danger' onClick={() => { this.del(item.id > 0, i) }}>删除</Button>
              </span>)} >
              <Passages chid={item.id} />
            </Card>
          )
        })}
        <Row><Button onClick={(re) => { this.addCH() }}>+添加新的一章</Button></Row>
      </Card>
    )
  }
}
class Passages extends Component {
  constructor(props) {
    super(props)
    this.state = {
      data: []
    }
    this.Save = this.Save.bind(this)
  }
  componentDidMount = () => {
    this.getPassage()
  }
  getPassage() {
    var id = this.props.chid
    const data = `id=${id}`
    POST1('/getPassageByChId.action', data, (re) => {
      if (re.status == 1) {
        this.setState({ data: re.data })
      }
    })
  }
  addCH() {
    var dataSet = {
      data: 0,
      name: '未命名',
      type: 1,
      chid: this.props.chid
    }
    var data = `chid=${dataSet.chid}&data=${dataSet.data}&type=${dataSet.type}&name=${dataSet.name}`
    POST1('/admin/createPassage.action', data, (re) => {
      if (re.status == 1) {
        this.getPassage()
      }
    })
  }
  Save() {
    this.setState({ isNew: false })
  }
  render() {
    return (
      <div>
        {this.state.data.map((item, i) => {
          return (<Passage data={item} i={i} key={i} Save={this.Save} getPassage={this.getPassage.bind(this)} />)
        })}
        <Row><Button onClick={(re) => { this.addCH() }}>+新建节</Button></Row>
      </div>
    )
  }
}
class Passage extends Component {
  constructor(props) {
    super(props)
    this.state = {
      data: props.data, // 页面维护
      file: null,
      visible: false,
      tid: props.data.data,
      loading: false
    }
  }
  changeData(type, v) {
    var data = this.state.data
    if (type == 'name') {
      data[type] = v;
      this.setState({ data: data })
    } else {
      v = Number(v)
      data[type] = v
      this.setState({ data: data })
    }
  }

  delpassage() {
    var data = `id=${this.props.data.id}`
    POST1('/admin/delPassage.action', data, (re) => {
      if (re.status == 1) {
        message.success('更新成功')
        this.props.getPassage()
      } else {
        message.error('更新失败请重试')
      }
    })
  }
  savePassage(type, value) {
    let data = this.state.data
    var p = ''
    if (type == 'name') {
      p = `name=${data.name}&id=${data.id}`
    } else {
      p = `type=${data.type}&id=${data.id}`
    }
    POST1('/admin/updatePassage.action', p, (re) => {
      if (re.status == 1) {
        message.success('更新成功')
      } else {
        message.error('更新失败，请重试')
      }
    })
  }
  uploadFile() {
    this.setState({ loading: true })
    var data = this.state.data
    var fd = new FormData()
    fd.append('file', this.state.file)
    fd.append('type', data.type)
    fd.append('pid', data.id)
    POSTFile('/admin/upFile.action', fd, (re) => {
      if (re.status == 1) {
        message.success('上传成功')
        this.setState({ loading: false })
      } else {
        message.error('上传失败，请重试')
      }
    })
  }

  showModal = () => {
    let name = this.props.data.name
    var data = `name=${name}&pid=${this.props.data.id}`
    if (this.state.data.data <= 0) {
      POST1('/admin/createTestKu.action', data, (re) => {
        if (re.status == 1) {
          this.setState({ tid: re.data })
          console.log(this.state.tid)
        } else {
          message.error('发生错误，请稍后重试')
        }
      })
    }
    this.setState({
      visible: true
    })
  }
  handleOk = (e) => {
    this.setState({
      visible: false
    })
  }
  handleCancel = (e) => {
    this.setState({
      visible: false
    })
  }
  render() {
    var item = this.state.data
    var file = this.state.file
    var i = this.props.i
    var Save = this.props.Save
    var tid = this.state.tid
    // 输入试题的弹框
    return (
      <Row className='passage'>
        <Modal
          title='编辑试题'
          visible={this.state.visible}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
          footer={null}
          width={'80%'}
          className='basemodal'
        >
          <Test tid={tid} disabled={this.state.disabled} />
        </Modal>
        <Spin spinning={this.state.loading}>
          <span>{`第${i + 1}节`}
            <input className='passageInput'
              placeholder={item.name} onChange={(v) => { this.changeData('name', v.target.value) }} onBlur={(e) => { this.savePassage('name', e.target.value) }} />
            <Select value={item.type == 1 ? '视频' : item.type == 2 ? '课件' : '测试'} style={{ width: 120 }} onChange={(v) => { this.changeData('type', v) }} onBlur={() => { this.savePassage('type') }}>
              <Option value={'1'} key={1}>视频</Option>
              <Option value={'2'} key={2}>课件</Option>
              <Option value={'3'} key={3}>测试</Option>
            </Select>
            {item.type == 3 ? <Button style={{ marginLeft: 250 }} onClick={this.showModal}>
              {this.state.data.data <= 0 ? '添加试题' : '修改试题'}</Button>
              : <input type='file' className='upload' style={{ display: 'inline-block' }}
                onChange={(re) => this.setState({ file: re.target.files[0] })} />
            }
            {item.type == 3 ? '' : <Button disabled={file == null} onClick={() => { this.uploadFile() }}>开始上传</Button>}
          </span>
          <span style={{ float: 'right' }}>
            <Button type='danger' onClick={() => this.delpassage()}>删除</Button>
          </span>
        </Spin>
      </Row>
    )
  }
}
