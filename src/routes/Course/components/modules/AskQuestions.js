import React from 'react'
import { Button, Modal, Input } from 'antd'
import { POST } from '../../../../components/commonModules/POST'
const TextArea = Input

class AskQuestion extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      title: '',
      detail: ''
    }
  }

  changedetail(e) {
    let data = e.target.value
    this.setState({ detail: data })
  }
  handleOk() {
    var text = this.state.detail
    var cid = this.props.cid
    var data = `data=${text}`
    this.props.handleOk()
    POST('/user/createQuestion.action', data, re => {
      if (re.status == 1) {
      }
    })
  }

  render() {
    const { visible, confirmLoading, ModalText } = this.state

    return (
      <div>
        <Modal
          title='我要提问'
          visible={this.props.visible}
          onOk={this.handleOk}
          confirmLoading={this.props.confirmLoading}
          onCancel={this.props.handleCancel}
        >
          <TextArea
            rows='6'
            placeholder='请输入问题详情'
            onChange={this.changedetail.bind(this)}
          />
        </Modal>
      </div>
    )
  }
}
export default AskQuestion
