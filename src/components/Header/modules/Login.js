import { Form, Icon, Input, Button, Checkbox, message } from 'antd'
import React from 'react'
import './Login.scss'
import { POST1 } from '../../commonModules/POST'
const FormItem = Form.Item

class Login extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      validateStatusname: '',
      validateStatuspass: '',
      blur: false
    }
  }
  handleSubmit = e => {
    const success = () => {
      message.success('成功登陆')
    }
    const error = () => {
      message.error('密码错误')
    }
    const error1 = () => {
      message.error('用户名不存在')
    }
    var userName = this.props.form.getFieldValue('userName')
    var password = this.props.form.getFieldValue('password')
    var remember = this.props.form.getFieldValue('remember')
    let validateStatusname = this.state.validateStatusname
    e.preventDefault()
    this.props.form.validateFields((err, values) => {
      if (!err) {
        let data = `account=${userName}&pass=${password}`
        if ((validateStatusname = 'success')) {
          POST1('/login.action', data, re => {
            if (re.status === -2) {
              this.setState({ validateStatuspass: 'error' })
              error1()
            } else if (re.status === 1) {
              this.setState({ validateStatuspass: 'success' })
              if (remember) {
                console.log(remember)
                localStorage.setItem('userName', userName)
                localStorage.setItem('password', password)
              } else {
                localStorage.clear()
              }
              success()
              this.props.setModal2Visible(false)
              this.props.logintrue()
            } else if (re.status === -1) {
              error()
            } else {
              alert('网络出错，请稍后再试')
            }
          })
        }
      }
    })
  };
  onFocus (num) {
    if (num === 2) {
      this.props.changefocus(2)
    } else if (num === 3) {
      this.props.changefocus(3)
    } else {
      this.props.changefocus(1)
    }
  }
  // 用户名的检测
  onBlur (num) {
    const error1 = () => {
      message.error('用户名不存在')
    }
    let userName = this.props.form.getFieldValue('userName')
    let data = `account=${userName}&pass=111111}`
    this.props.changefocus(1)
    POST1('/login.action', data, re => {
      if (re.status === -2) {
        // 用户不存在
        this.setState({ validateStatusname: 'error' })
        console.log(this.state.validateStatusname)
      } else if (re.status === -1) {
        // 密码错误
        this.setState({ validateStatusname: 'success' })
      }
    })
  }
  render () {
    const { getFieldDecorator } = this.props.form
    return (
      <div className='LoginFrom'>
        <Form onSubmit={this.handleSubmit} className='login-form'>
          <FormItem validateStatus={this.state.validateStatusname} hasFeedback>
            {getFieldDecorator('userName', {
              rules: [{ required: true, message: '用户名不能为空' }],
              initialValue:localStorage.getItem('username')
            })(
              <Input
                onFocus={this.onFocus.bind(this, 2)}
                onBlur={this.onBlur.bind(this)}
                prefix={<Icon type='user' style={{ fontSize: 13 }} />}
                placeholder='输入账号邮箱或手机'
              />
            )}
          </FormItem>

          <FormItem validateStatus={this.state.validateStatuspass} hasFeedback>
            {getFieldDecorator('password', {
              rules: [
                { required: true, message: '请输入密码!' },
                { min: 6, max: 15, message: '密码长度不正确' }
              ],
              initialValue:localStorage.getItem('password')
            })(
              <Input
                onFocus={this.onFocus.bind(this, 3)}
                onBlur={this.onBlur.bind(this, 1)}
                prefix={<Icon type='lock' style={{ fontSize: 13 }} />}
                type='password'
                placeholder='密码长度为6到16位'
              />
            )}
          </FormItem>
          <FormItem>
            {getFieldDecorator('remember', {
              valuePropName: 'checked',
              initialValue: true
            })(<Checkbox>记住密码</Checkbox>)}
            <br />
            <Button
              type='primary'
              htmlType='submit'
              className='login-form-button'
            >
              登 录
            </Button>
          </FormItem>
        </Form>
      </div>
    )
  }
}

export default Form.create()(Login)
