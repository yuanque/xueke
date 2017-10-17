import React, { Component, PropTypes } from 'react'
import { Button, Radio, Icon, Row, Col, Input, Select, Affix } from 'antd'
import './testEdit.scss'
import { POST1 } from '../../../components/commonModules/POST'

const RadioGroup = Radio.Group
class Test extends Component {
  constructor (props) {
    super(props)
    this.state = {
      question: [],
      tid:this.props.tid
    }
   
  }
  componentDidMount () {
    this.getData()
  }
  getData () {
    var data = `tid=${this.state.tid}`
    POST1('/user/getTestByTid.action', data, (re) => {
      if (re.status == 1) {
        this.setState({ question: re.data })
      } else {
        alert('网络错误')
      }
    })
  }
  add () {
    let tid = this.props.tid
    var dataSet = this.state.data
    var data = `title=未命名&options=["","","",""]&answer=0&score=2&tid=${tid}`
    POST1('/admin/createTest.action', data, (re) => {
      if (re.status == 1) {
        this.getData()
      }
    })
  }

  render () {
    const { question, disabled } = this.state
    let tid = this.state.tid
    return (
      <div className='question-mode1'><Row>
        <Col span={15} offset={4}>
          {question.map((item, i) => {
            return (<TestEdit item={item} ikey={i} key={i} getData={this.getData.bind(this)} />)
          })}
        </Col>
      </Row>
        <Affix>
          <Button  disabled={disabled} onClick={this.add.bind(this)}><Icon type='plus' /> 添加</Button>
        </Affix>
      </div>
    )
  }
}

export default Test

class TestEdit extends Component {
  constructor (props) {
    super(props)
    this.state = {
      data: props.item,
      disabled: true
    }
  }
  changeData (type, value) {
    var data = this.state.data
    data[type] = value
    this.setState({ data: data })
  }

  changeQues (num, value) {
    var data = this.state.data
    var option = JSON.parse(data.options)
    option[num] = value
    data.options = JSON.stringify(option)
    this.setState({ data: data })
  }
  // 每一题点击保存的时候的调用函数
  // 服务器
  save () {
    var dataSet = this.state.data
    var data = `title=${dataSet.title}&options=${dataSet.options}&answer=${dataSet.answer}&score=${dataSet.score}&id=${dataSet.id}`
    POST1('/admin/updateTest.action', data, (re) => {
      if (re.status == 1) {
        console.log('修改成功')
        this.setState({ disabled:true })
      }
    })
  }
  // 删除
  delete () {
    var dataSet = this.state.data
    var data = `id=${dataSet.id}`
    POST1('/admin/deleteTest.action', data, (re) => {
      if (re.status == 1) {
        console.log('删除成功')
        this.props.getData()
      }
    })
  }
  edit () {
    this.setState({ disabled:false })
  }
  render () {
    var item = this.state.data
    const getABCD = (idx) => (idx == 0 ? 'A' : idx == 1 ? 'B' : idx == 2 ? 'C' : 'D')
    const getanswer = (answer) => (answer == 0 ? 'A' : answer == 1 ? 'B' : answer == 2 ? 'C' : 'D')
    const ikey = this.props.ikey
    const disabled = this.state.disabled
    const optionSet = item.options ? JSON.parse(item.options) : []
    return (
      <div className='m-choiceQuestion'>
        <Row>
          <Col span={1} style={{ marginTop:-10 }}>
            <span className='ques-num'>{ikey + 1} :</span>
          </Col>
          <Col span={14}>
            {disabled == false
              ? <Input
                value={item.title}
                onChange={(e) => this.changeData('title', e.target.value)}
                className='testText'
                placeholder={item.title} />
              : <p style={{ display: 'inline-block', marginLeft: 10, fontSize:16, fontFamily:'宋体' }}>
                {item.title}({getanswer(item.answer)})
          </p>}
          </Col>
          <Col span={6} style={{ marginTop:10 }}>
            请选择分值:
            <Select value={`${item.score}`} width={80} onChange={(value) => this.changeData('score', value)} disabled={disabled}>
              <Option value='1'>1</Option>
              <Option value='2'>2</Option>
              <Option value='3'>3</Option>
              <Option value='4'>4</Option>
              <Option value='5'>5</Option>
            </Select>
            {this.state.disabled == false
            ? <Button className='sumitButton' icon='save' onClick={() => this.save()}>保存</Button>
            : <Button className='sumitButton' icon='edit' onClick={() => this.edit()}>修改</Button>}
            <Button icon='delete' className='delButton' onClick={() => { this.delete() }}>删除</Button>
          </Col>
        </Row>
        <div className='radio-check'>
          <RadioGroup
            value={item.answer}
            onChange={(e) => this.changeData('answer', e.target.value)}
            size='large'
            disabled={disabled}
          >
            {optionSet.map((itemi, ii) => {
              return (
                <div key={ii}>
                  <Radio value={ii} />{getABCD(ii)}：
                  <span className='select-detail'>
                    {disabled == false
                      ? <Input
                        onChange={(e) => this.changeQues(ii, e.target.value)}
                        className='testText'
                        placeholder={itemi} />
                      : <span style={{ fontFamily:'宋体', fontSize:14 }}>{itemi}</span>}</span>
                  <br />
                </div>
              )
            })}
          </RadioGroup>

        </div>

      </div>)
  }
}
