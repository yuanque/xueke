import React, { Component } from 'react';
import { Button, Icon, Row, Col } from 'antd'
import { POST1 } from '../../../components/commonModules/POST'
import './Stest.scss'

class Stest extends Component {
  constructor(props) {
    super(props)
    this.state = {
      data: [{
        id: 21,
        uid: 4,
        answer: 1,
        trueAnswer: 1,
      }, {
        id: 21,
        uid: 4,
        answer: 2,
        trueAnswer: 1,
      }],
      tdata: [{
        tid: 1,
        title: '以下有关指令以及指令执行过程的叙述中，错误的是',
        options: [
          "汇编语言和机器语言都与计算机系统结构相关",
          "汇编语言和机器语言都与计算机系统结构相关",
          "汇编语言和机器语言都与计算机系统结构相关",
          "汇编语言和机器语言都与计算机系统结构相关"],
        answer: 1,
        score: 1
      }],
      score: 0
    }
  }

  componentWillMount() {
    let uid = this.props.uid
    let tid = this.props.tid
    let n = `uid=${uid}&tid=${tid}`

    POST1('/user/getTestByTid.action', `tid=${tid}`, (re1) => {
      for (let i = 0; i < re1.data.length; i++) {
        re1.data[i].options = JSON.parse(re1.data[i].options)
        switch (re1.data[i].answer) {
          case 1:
            re1.data[i].answer = 'A'; break;
          case 2:
            re1.data[i].answer = 'B'; break;
          case 3:
            re1.data[i].answer = 'C'; break;
          case 4:
            re1.data[i].answer = 'D'; break;
        }
      }
      console.log(re1.data)
      this.setState({ tdata: re1.data })
      return tdata
    })

    POST1('/user/getAnswer.action', n, (re) => {
      console.log(re)
      this.setState({ data: re.data })
      const { data } = this.state
      for (let i = 0; i < data.length; i++) {
        data[i].answer = this.option(data[i].answer)
      }
      this.setState({ data })
    })
  }

  componentDidMount() {
    let a = this.state.data
    let b = this.state.tdata
    for (let i = 0; i < a.length; i++) {
      if (a[i].answer == a[i].trueAnswer) {
        this.state.score = this.state.score + b[i].score
      }
    }
    const { score } = this.state
    this.setState({ score })
  }

  Change() {
    this.props.change(1)
  }
  render() {

    const { data } = this.state
    console.log(this.state.tdata, this.state.score)
    return (
      <div >
        <div style={{ marginLeft: 'auto', marginRight: 'auto', width: '60%', textAlign: 'center' }}>
          <div style={{ marginTop: 10 }}>
            <span style={{ float: 'left' }}>
              <Button onClick={this.Change.bind(this)}>返回</Button>
            </span>
            <span><h1>试卷：</h1></span>
          </div>
          {this.state.tdata.map((item, i) => {
            return (
              <div className='stestBox' key={i}>
                <span>{i + 1}</span>
                <span>单选</span>
                <p style={{ display: "inline-block", marginLeft: 10 }}>{item.title} ({/*data[i].answer*/})</p>
                <div className='stestOption'>A: {item.options[0]}</div>
                <div className='stestOption'>B: {item.options[1]}</div>
                <div className='stestOption'>C: {item.options[2]}</div>
                <div className='stestOption'>D: {item.options[3]}</div>
                <div className='stestTrue' >正确答案：{item.answer}</div>
              </div>
            )
          })}
          <div style={{ marginTop: 10, marginBottom: 20, float: 'left', marginLeft: '20%' }}>
            <h2>得分：{this.state.score}</h2></div>
        </div>
      </div>
    );
  }
}

export default Stest;