import React, { Component } from 'react'
import '../css/modifyinfo.scss'
import { Row, Col, Button, Form, Input, Upload, Icon, Select, Tooltip, Radio, DatePicker, message } from 'antd'
import { POST1, BASE_URL, POSTFile } from '../../../../components/commonModules/POST'
var moment = require('moment')
const FormItem = Form.Item
const RadioGroup = Radio.Group

class Modifyinfo extends Component {
  constructor(props) {
    super(props)
    this.state = {
      disstate: true,
      confirmDirty: false,
      autoCompleteResult: [],
      fileList: [],
      uploading: false,
      field: []
    }
  }

  changevalue() {
    this.setState({ disstate: !this.state.disstate })
  }
  changepass() {
    this.props.changepass(2)
  }

  // 表单提交的回调
  handleSubmit = e => {
    e.preventDefault()
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values)
      }
    })
    const { nickname, phone, realname, sex, sign, classInfo } = this.props.form.getFieldsValue()
    var data = `account=${nickname}&phone=${phone}&name=${realname}&sex=${sex}&sign=${sign}&classInfo=${classInfo}`
    POST1('/user/updateUserInfo.action', data, (re) => {
      if (re.status == 1) {
        message.success('更新成功')
      }
    })
  };

  handleConfirmBlur = e => {
    const value = e.target.value
    this.setState({ confirmDirty: this.state.confirmDirty || !!value })
  };
  checkPassword = (rule, value, callback) => {
    const form = this.props.form
    if (value && value !== form.getFieldValue('password')) {
      callback('Two passwords that you enter is inconsistent!')
    } else {
      callback()
    }
  };

  checkConfirm = (rule, value, callback) => {
    const form = this.props.form
    if (value && this.state.confirmDirty) {
      form.validateFields(['confirm'], { force: true })
    }
    callback()
  };

  // 点击上传头像后的回调
  handleUpload = () => {
    const success = () => {
      message.success('上传成功')
    }
    const error = () => {
      message.error('网络出错')
    }
    const { fileList } = this.state
    const formData = new FormData()
    console.log('fileList', fileList)
    formData.append('file', fileList[0], fileList[0].name)
    this.setState({
      uploading: true
    })
    POSTFile('/user/updateHeader.action', formData, (re) => {
      if (re.status == 1) {
        success()
        this.setState({ uploading: false })
      } else {
        this.setState({
          uploading: false
        })
        error()
      }
    })
  }
  render() {
    const { getFieldDecorator } = this.props.form
    const { autoCompleteResult } = this.state
    const { uploading } = this.state
    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 6 }
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 14 }
      }
    }
    const tailFormItemLayout = {
      wrapperCol: {
        xs: {
          span: 24,
          offset: 0
        },
        sm: {
          span: 14,
          offset: 6
        }
      }
    }

    const prefixSelector = getFieldDecorator('prefix', {
      initialValue: '86'
    })(
      <Select style={{ width: 60 }}>
        <Option value='86'>+86</Option>
        <Option value='87'>+87</Option>
      </Select>
      )

    const websiteOptions = autoCompleteResult.map(website =>
      <AutoCompleteOption key={website}>
        {website}
      </AutoCompleteOption>
    )
    const props = {
      action: `${BASE_URL}/user/updateHeader.action`,
      onRemove: (file) => {
        this.setState(({ fileList }) => {
          const index = fileList.indexOf(file)
          const newFileList = fileList.slice()
          newFileList.splice(index, 1)
          return {
            fileList: newFileList
          }
        })
      },
      beforeUpload: (file) => {
        this.setState(({ fileList }) => ({
          fileList: [...fileList, file]
        }))
        return false
      },
      fileList: this.state.fileList
    }
    const { account, sex, sign, name, startData, phone, emil, classInfo, birthday } = this.props.pinfo
    return (
      <div className='modifyinfo'>
        <Row>
          <Col span={4}>
            <Upload {...props}>
              <Button>
                <Icon type='upload' /> 上传头像
            </Button>
            </Upload>
            <Button
              className='upload-demo-start'
              type='primary'
              onClick={this.handleUpload}
              disabled={this.state.fileList.length === 0}
              loading={uploading}
              style={{ display: 'inline-block', marginTop: 10, marginLeft: 3 }}
            >
              {uploading ? 'Uploading' : 'Start Upload'}
            </Button>
          </Col>
          <Col span={15} offset={1}>
            <div className='container' />
            <Form onSubmit={this.handleSubmit}>
              <FormItem
                {...formItemLayout}
                label={
                  <span>
                    昵称&nbsp;
                    <Tooltip title='输入一个有意思的昵称吧！'>
                      <Icon type='question-circle-o' />
                    </Tooltip>
                  </span>
                }
                hasFeedback
              >
                {getFieldDecorator('nickname', {
                  rules: [
                    {
                      required: true,
                      message: '请输入你的昵称!',
                      whitespace: true
                    }
                  ],
                  initialValue: account
                })(<Input disabled={this.state.disstate} />)}
              </FormItem>

              <FormItem {...formItemLayout} label='邮箱' hasFeedback>
                {getFieldDecorator('email', {
                  initialValue: emil
                })(
                  <Input disabled={this.state.disstate} />
                  )}

              </FormItem><FormItem {...formItemLayout} label='手机' hasFeedback>
                {getFieldDecorator('phone', {

                  initialValue: phone
                })(
                  <Input disabled={this.state.disstate} />
                  )}
              </FormItem>

              <FormItem {...formItemLayout} label='真实姓名' hasFeedback>
                {getFieldDecorator('realname', {
                  initialValue: name
                })(<Input disabled={this.state.disstate} />)}
              </FormItem>

              <FormItem {...formItemLayout} label='班级'>
                {getFieldDecorator('classInfo', {
                  initialValue: classInfo
                })(
                  <Input
                    style={{ width: '100%' }}
                    disabled={this.state.disstate}
                  />
                  )}
              </FormItem>

              <FormItem {...formItemLayout} label='性别'>
                {getFieldDecorator('sex', {
                  initialValue: sex
                })(
                  <RadioGroup
                    style={{ float: 'left' }}
                    disabled={this.state.disstate}
                  >
                    <Radio value={2}>男</Radio>
                    <Radio value={1}>女</Radio>
                    <Radio value={0}>保密</Radio>
                  </RadioGroup>
                  )}
              </FormItem>
              <FormItem {...formItemLayout} label='个人签名' hasFeedback>
                {getFieldDecorator('sign', {
                  initialValue: sign
                })(
                  <Input disabled={this.state.disstate} />
                  )}
              </FormItem>

              <FormItem {...formItemLayout} label='注册时间'>
                {getFieldDecorator(
                  'date-picker1', {
                    rules: [
                      {
                        type: 'object',
                        required: true,
                        message: 'Please select time!'
                      }
                    ],
                    initialValue: moment(startData)
                  }
                )(<DatePicker disabled />)}
              </FormItem>
              <FormItem {...tailFormItemLayout}>
                <Button
                  type='primary'
                  htmlType='submit'
                  onClick={this.changevalue.bind(this)}
                >
                  更改
                </Button>
              </FormItem>
            </Form>
          </Col>
          <Col span={3} offset={1}>
            <Button
              type='primary'
              icon='edit'
              size='large'
              onClick={this.changevalue.bind(this)}
            >
              编辑信息
            </Button>
            <Button
              type='primary'
              icon='edit'
              size='large'
              style={{ display: 'inline-block', marginTop: 15 }}
              onClick={this.changepass.bind(this)}
            >
              修改密码
            </Button>
          </Col>
        </Row>
      </div>
    )
  }
}
export default Form.create()(Modifyinfo)
