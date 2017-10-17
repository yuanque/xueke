import React from 'react'

import { Radio } from 'antd'
import { POST1 } from '../../../components/commonModules/POST'
const RadioGroup = Radio.Group
class SingleExam extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      value: -1
    }
  }

  onChange = e => {
    let num = e.target.value

    this.setState({
      value: num
    })
    var ttid = this.props.data.id
    var data = `ttid=${ttid}&answer=${num + 1}`
    POST1('/user/createAnswer.action', data,
      (re) => {
        console.log('提交成功？', re)
      })
  }

  format(num) {
    if (num == 0) {
      return 'A'
    } else if (num == 1) {
      return 'B'
    } else if (num == 2) {
      return 'C'
    } else if (num == 3) {
      return 'D'
    }
    return ''
  }
  render() {
    var data = this.props.data
    return (
      <div className='question-mode'>
        <div className='m-choiceQuestion'>
          <span className='ques-num'>{data.oNm}</span>
          <span className='m-slect'>单选</span>
          <p style={{ display: 'inline-block', marginLeft: 10 }}>
            {data.title}（{this.format(this.state.value)}）
          </p>
          <div className='radio-check'>
            <RadioGroup
              onChange={this.onChange}
              value={this.state.value}
              size='large'
            >
              {JSON.parse(data.options).map((item, i) => {
                return (
                  <div key={i}>
                    <Radio value={i}>{this.format(i)}</Radio>
                    <span className='select-detail'>{item}</span>
                    <br />
                  </div>
                )
              })}

            </RadioGroup>
          </div>
        </div>
      </div>
    )
  }
}
export default SingleExam
