import React, { Component } from 'react'
import { Input, Row, Col, Button, Select, DatePicker, Card,message } from 'antd'
import { POST1, POSTJSON } from '../../../components/commonModules/POST'
import moment from 'moment'
const Option = Select.Option

const { TextArea } = Input

const { RangePicker } = DatePicker

export default class SectionInfo extends Component {
  constructor (props) {
    super(props)
    this.state = {
      data: null,
      disable: true
    }
  }

  componentDidMount () {
    // 拿到cid获取课程信息
    let cid = this.props.cid
    let data = `id=${cid}`
    POST1('/getDClass.action', data, re => {
      if (re.status === 1) {        
        var data = re.data.list[0]
        this.setState({ data: data })
      }
    })
  }
  onSave () {
    var v = this.state.disable
    var dataSet = this.state.data
    if (v == true) {
      this.setState({ disable: !v })
    } else { // 保存
      // TODO:发送网络请求保存内容
      var data = `id=${dataSet.id}&name=${dataSet.name}&level=${dataSet.level}&pblic=${2}&info=${dataSet.info}&know=${dataSet.know}&gain=${dataSet.gain}&startDate=${moment(dataSet.startDate).format('YYYY-MM-DD HH:mm:ss')}&endDate=${moment(dataSet.endDate).format('YYYY-MM-DD HH:mm:ss')}`
      POST1('/admin/updateDClass.action', data, (re) => {
        if (re.status==1){
          this.setState({ disable: !v })
          message.success('保存成功')
        }else{
          message.error('出现错，误请重试')
        }
      })
      
    }
  }
  onChangeData (type, v) {
    var data = this.state.data
    data[type] = v
    this.setState({ data: data })
  }
  onChangeDate (date) {
    var data = this.state.data
    data.startDate = date[0].valueOf()
    data.endDate = date[1].valueOf()
    this.setState({ data: data })
  }
  render () {
    var disable = this.state.disable
    var data = this.state.data
    if (!data) {
      return <div />
    }
    return (
      <Card title='课程基本信息' extra={(<Button onClick={() => { this.onSave() }}>{this.state.disable ? '编辑' : '保存'}</Button>)}>
        <Row className='editor_row'>
          <Col span={4}>
            <h3 style={{ paddingLeft: 10 }}>课程名称：</h3>
          </Col>
          <Col span={8}><Input
            size='large'
            value={data.name || ''}
            placeholder='Course Name'
            disabled={disable}
            style={{ cursor: 'default' }}
            onChange={(v) => { this.onChangeData('name', v.target.value) }}
          />
          </Col>
        </Row>
        <Row>
          <Col span={4}>
            <h3 style={{ paddingLeft: 10 }}>起止时间：</h3>
          </Col>
          <Col span={8}>
            <RangePicker style={{ marginTop: 10, marginLeft: 10 }}
              disabled={disable}
              value={[moment(data.startDate), moment(data.endDate)]}
              onChange={(re) => { this.onChangeDate(re) }}
              renderExtraFooter={() => 'extra footer'}
            />
          </Col>
        </Row>
        <Row style={{ marginTop: 10, paddingLeft: 10 }}>
          <Col span={3}><h3>难度：</h3></Col>
          <Col span={5}>
            <Select
              defaultValue={'1'}
              value={`${data.level}`}
              style={{ width: 150, cursor: 'default' }}
              onChange={(v) => { this.onChangeData('level', v) }}
              disabled={disable}>
              <Option value={'1'}>简单</Option>
              <Option value={'2'}>中等</Option>
              <Option value={'3'}>难</Option>
            </Select>
          </Col>
         
        </Row>
        <div>
          <h3 style={{ paddingLeft: 10, marginTop: 10 }}>简介：</h3>
          <TextArea
            placeholder={data.info}
            disabled={disable}
            style={{ cursor: 'default' }}
            className='sectionInput'
            onChange={(v) => { this.onChangeData('info', v.target.value) }}
            autosize={{ minRows: 2, maxRows: 6 }}
          />
        </div>
        <Row>
          <Col span={12}><h3>课程须知：</h3>
            <TextArea
              placeholder={data.know}
              disabled={disable}
              onChange={(v) => { this.onChangeData('know', v.target.value) }}
              style={{ cursor: 'default', width: '90%' }}
              className='sectionInput'
              autosize={{ minRows: 2, maxRows: 4 }}
            /></Col>
          <Col span={12}><h3>课程收获：</h3>
            <TextArea
              placeholder={data.gain}
              disabled={disable}
              style={{ cursor: 'default', width: '90%' }}
              onChange={(v) => { this.onChangeData('gain', v.target.value) }}
              className='sectionInput'
              autosize={{ minRows: 2, maxRows: 4 }}
            /></Col>
        </Row>
      </Card>
    )
  }
}
