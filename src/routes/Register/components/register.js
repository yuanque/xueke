import React from 'react'
import './register.scss'
import { Form, Input, Button, AutoComplete, message } from 'antd'
import { POST1 } from '../../../components/commonModules/POST'
import { browserHistory } from 'react-router'
const FormItem = Form.Item
const AutoCompleteOption = AutoComplete.Option

class Zhuce extends React.Component {
  state = {
    email: '',
    pass: '',
    uname: '',
    telephone: '',
    hobby: '',
    idiograph: '',
    sex: '',
    TX: '',
    visible: false,
    show: false,
    confirmDirty: false,
    autoCompleteResult: [],
    validateStatus1: '',
    blur: false,
    username:true
  };
  // form表单提交
  handleSubmit = e => {
    e.preventDefault()
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values)
      }
    })
    this.register()
  };
  handleConfirmBlur = e => {
    const value = e.target.value
    this.setState({ confirmDirty: this.state.confirmDirty || !!value })
  };
  checkPassword = (rule, value, callback) => {
    const form = this.props.form
    if (value && value !== form.getFieldValue('password')) {
      callback('两次密码不同')
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

  // 注册接口
  register () {
    let email = this.props.form.getFieldValue('email')
    let nickname = this.props.form.getFieldValue('nickname')
    let phone = this.props.form.getFieldValue('phone')
    let password = this.props.form.getFieldValue('password')
    console.log(phone)
    let data = `account=${nickname}&emil=${email}&phone=${phone}&pass=${password}`
    POST1('/register.action', data, (re) => {
      switch (re.status) {
        case 1 :
          message.success('注册成功')
          browserHistory.push('/')
          break
        case -1:
          message.error('昵称被占用')
          break
        case -2:
          message.error('邮箱已经被注册')
          break
        case -3:
          message.error('手机号已经被注册')
          break
      }
    })
  }

  render () {
    const { getFieldDecorator } = this.props.form
    const { autoCompleteResult } = this.state
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
          span: 20,
          offset: 4
        },
        sm: {
          span: 14,
          offset: 6
        }
      }
    }
    return (
      <div className='register'>
        <h1 className='bigname'>注册</h1>
        <h3 className='aa'>学 习 本 无 底，前 进 莫 徬 徨</h3>
        <Form onSubmit={this.handleSubmit}>
          <FormItem
            {...formItemLayout}
            label={<span>昵称&nbsp;</span>}
            validateStatus1={this.state.validateStatus1}
            help={this.state.validateStatus1 == 'error' ? '昵称被占用' : ''}
            hasFeedback
          >
            {getFieldDecorator('nickname', {
              rules: [{ required: true, message: '请输入你的昵称!', whitespace: true }]
            })(<Input />)}
          </FormItem>

          <FormItem {...formItemLayout} label='E-mail' hasFeedback>
            {getFieldDecorator('email', {
              rules: [
                {
                  type: 'email',
                  message: '请输入正确的E-mail'
                },
                {
                  required: true,
                  message: '请输入E-mail!'
                }
              ]
            })(<Input />)}
          </FormItem>

          <FormItem
            {...formItemLayout}
            label={<span>电话号码&nbsp;</span>}
            hasFeedback
          >
            {getFieldDecorator('phone', {
              rules: [{ required: true, message: '请输入你的电话!', whitespace: true }, { len: 11, message: '请输入正确的电话号码' }]
            })(<Input onBlur={() => this.checkphone()} />)}
          </FormItem>
          <FormItem {...formItemLayout} label='密码' hasFeedback>
            {getFieldDecorator('password', {
              rules: [
                {
                  required: true,
                  message: '请输入你的密码!'
                },
                {
                  validator: this.checkConfirm
                },
                {
                  min: 6,
                  max: 15,
                  message: '密码长度不正确!'
                }
              ]
            })(<Input type='password' onBlur={this.handleConfirmBlur}/>)}
          </FormItem>

          <FormItem {...formItemLayout} label='确认密码' hasFeedback>
            {getFieldDecorator('confirm', {
              rules: [
                {
                  required: true,
                  message: '请确认密码！'
                },
                {
                  validator: this.checkPassword
                }
              ]
            })(<Input type='password' />)}
          </FormItem>
          <FormItem {...tailFormItemLayout}>
            <Button
              type='primary'
              htmlType='submit'
              size='large'
            >
              注册
            </Button>
          </FormItem>
        </Form>
      </div>
    )
  }
}
export default Form.create()(Zhuce)
