import React, { Component } from 'react';
import {Card,Modal,Row,Button} from 'antd'
import Test from './testEdit'
import {Passage} from './SelectEdit'
import './SelectEdit.scss'
import {POST1} from '../../../components/commonModules/POST'
class FinalExam extends Component {
  constructor(props){
    super(props);
    this.state={
      tid:0,
      visible:false,
    }
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
  componentDidMount () {
    // 拿到cid获取课程信息
    let cid = this.props.cid
    let data = `id=${cid}`
    POST1('/getDClass.action', data, re => {
      if (re.status === 1) {
        console.log(re.data)
        var data = re.data.list[0]
        this.setState({ 
          tid:data.tid
         })
      }
    })
  }
  showModal = () => {
    this.setState({visible:true})
    
  }
  render() {
    return (
      <Card title='期末试卷'  extra={<Button style={{ width:150 }}  onClick={this.showModal}>
           编辑试题</Button>}>
        <Row >
        <Modal
          title='编辑试题'
          visible={this.state.visible}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
          footer={null}
          width={'80%'}
          className='basemodal'
        >
          <Test tid={this.state.tid}  />
        </Modal>      
          
      </Row>
      </Card>
    );
  }
  }


export default FinalExam;