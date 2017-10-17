import React, { Component, PropTypes } from 'react'
import { Button, Radio, Icon, Row, Col, Input } from 'antd'
import './TestEdit.scss'

const RadioGroup = Radio.Group

const { TextArea } = Input
class TestEdit extends Component {
  constructor(props) {
    super(props)
    this.state = {
      question: [{
        title: '以下有关指令以及指令执行过程的叙述中，错误的是',
        optionA: '汇编语言和机器语言都与计算机系统结构相关',
        optionB: '汇编语言和机器语言都与计算机系统结构相关',
        optionC: '汇编语言和机器语言都与计算机系统结构相关',
        optionD: '汇编语言和机器语言都与计算机系统结构相关',
        value: 1,
        correct: 'A '
      }],
      disabled: true
    }
  }
  add() {
    let { question } = this.state
    let arr = {
      title: '',
      optionA: '',
      optionB: '',
      optionC: '',
      optionD: '',
      value: 1,
      correct: ' '
    }
    question = question.concat(arr)
    this.setState({ question })
  }
  remove(i) {
    let { question } = this.state
    question.splice(i, 1)
    this.setState({ question })
  }
  toEdit() {
    this.setState({ disabled: !this.state.disabled })
  }

  changeQues(i, option, value) {
    let { question } = this.state
    switch (option) {
      case 0:
        question[i].title = value
        this.setState({ question })
        break
      case 1:
        question[i].optionA = value
        this.setState({ question })
        break
      case 2:
        question[i].optionB = value
        this.setState({ question })
        break
      case 3:
        question[i].optionC = value
        this.setState({ question })
        break
      case 4:
        question[i].optionD = value
        this.setState({ question })
        break
    }
    console.log(question)
  }

  onChange = (val, i) => {
    let num = val
    let { question } = this.state
    // console.log("radio checked", e.target.value);
    if (num == 1) {
      question[i].correct = 'A'
      this.setState({ question })
    } else if (num == 2) {
      question[i].correct = 'B'
      this.setState({ question })
    } else if (num == 3) {
      question[i].correct = 'C'
      this.setState({ question })
    } else if (num == 4) {
      question[i].correct = 'D'
      this.setState({ question })
    }
    question[i].value = num
    this.setState({ question })
  };

  back() {
    this.props.Change(4)
  }
  render() {
    const { question, disabled } = this.state

    return (
      <div className='question-mode'><Row>
        <Col span={4} offset={1} push={15}>
          <span><Button style={{ marginTop: 20 }} onClick={this.toEdit.bind(this)}><Icon type='edit' /></Button></span>
          <span style={{ marginLeft: 10 }}><Button onClick={this.back.bind(this)}
            style={{ marginTop: 20 }} ><Icon type='rollback' /></Button></span>
        </Col>

        <Col span={15} pull={5}>
          {question.map((item, i) => {
            return (
              <div className='m-choiceQuestion' key={i}>
                <span className='ques-num'>{i + 1}</span>
                <span className='m-slect'>单选</span>
                {disabled == false
                  ? <TextArea
                    onChange={(e) => this.changeQues(i, 0, e.target.value)}
                    className='testText'
                    placeholder={item.title}
                    autosize={{ minRows: 1, maxRows: 4 }} />
                  : <p style={{ display: 'inline-block', marginLeft: 10 }}>
                    {item.title}（{item.correct}）
          </p>}
                <div className='radio-check'>
                  <RadioGroup
                    defaultValue={item.value}
                    onChange={(e) => this.onChange(e.target.value, i)}
                    size='large'
                    disabled={disabled}
                  >
                    <Radio value={1}>A</Radio>
                    <span className='select-detail'>
                      {disabled == false
                        ? <TextArea
                          onChange={(e) => this.changeQues(i, 1, e.target.value)}
                          className='testText'
                          placeholder={item.optionA}
                          autosize={{ minRows: 1, maxRows: 3 }} />
                        : <span>{item.optionA}</span>}</span>
                    <br />
                    <Radio value={2}>B</Radio>
                    <span className='select-detail'>
                      {disabled == false
                        ? <TextArea
                          onChange={(e) => this.changeQues(i, 2, e.target.value)}
                          className='testText'
                          placeholder={item.optionB}
                          autosize={{ minRows: 1, maxRows: 3 }} />
                        : <span>{item.optionB}</span>}</span>
                    <br />
                    <Radio value={3}>C</Radio>
                    <span className='select-detail'>
                      {disabled == false
                        ? <TextArea
                          onChange={(e) => this.changeQues(i, 3, e.target.value)}
                          className='testText'
                          placeholder={item.optionC}
                          autosize={{ minRows: 1, maxRows: 3 }} />
                        : <span>{item.optionC}</span>}</span>
                    <br />
                    <Radio value={4}>D</Radio>
                    <span className='select-detail'>
                      {disabled == false
                        ? <TextArea
                          onChange={(e) => this.changeQues(i, 4, e.target.value)}
                          className='testText'
                          placeholder={item.optionD}
                          autosize={{ minRows: 1, maxRows: 3 }} />
                        : <span>{item.optionD}</span>}</span>
                    <br />
                  </RadioGroup>
                </div>
                {question.length > 1
                  ? <Button disabled={disabled} onClick={this.remove.bind(this, i)} style={{ float: 'right', marginTop: -30, marginRight: 100, border: 'none' }}><Icon type='delete' /></Button>
                  : null}
              </div>)
          })}</Col>
      </Row>
        <Button className='testButton' disabled={disabled} onClick={this.add.bind(this)}><Icon type='plus' /> 添加</Button>
        <Button className='testButton' style={{ marginRight: 20 }} type='submit'>保存</Button>
      </div>
    )
  }
}

export default TestEdit
