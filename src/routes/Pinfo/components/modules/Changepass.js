import React, { Component } from "react";
import { render } from "react-dom";
import { Form, Input, Tooltip, Icon, Cascader, Select, Row, Col, Checkbox, Button, AutoComplete, message } from "antd";
import './changepass.scss';
import { POST1 } from '../../../../components/commonModules/POST';
const FormItem = Form.Item;
const Option = Select.Option;
const AutoCompleteOption = AutoComplete.Option;
class Changepass extends React.Component {
  state = {
    confirmDirty: false,
    autoCompleteResult: []
  };
  handleConfirmBlur = e => {
    const value = e.target.value;
    this.setState({ confirmDirty: this.state.confirmDirty || !!value });
  };
  checkConfirm = (rule, value, callback) => {
    const form = this.props.form;
    if (value && this.state.confirmDirty) {
      form.validateFields(["confirm"], { force: true });
    }


    callback();
  };
  checkPassword = (rule, value, callback) => {
    const form = this.props.form;
    if (value && value != form.getFieldValue("password")) {
      callback("两次密码输入不同");
    } else {
      callback();
    }
  };
  check = (rule, value, callback) => {
    const form = this.props.form;
    if (value && value == form.getFieldValue("oldpassword")) {
      callback("原密码与新密码相同");
    } else {
      callback();
    }
  };
  back() {
    this.props.changepass(1);
  }
  handleSubmit(e) {
    const error = () => {
      message.error('原密码错误');
    };
    const success = () => {
      message.success("密码修改成功");
    }
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        var valuelist = this.props.form.getFieldsValue();
        let pass = valuelist.oldpassword;
        var newPass = valuelist.newpassword;
        var data = `pass=${pass}&newPass=${newPass}`
        POST1("/user/updateUserPass.action", data, (re) => {
          if (re.status == 23) {
            error();
          } else if (re.status == 1) {
            success();
          }
        })
      }
    });
  }
  render() {
    const { getFieldDecorator } = this.props.form;
    const { autoCompleteResult } = this.state;
    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 6 }
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 14 }
      }
    };
    let style = {
      width: 500,
      border: "1px solid silver",
      borderRadius: 3,
      marginTop: 50,
      textAlign: "cenetr"
    };

    return (
      <div className="changepass">
        <div style={{ position: "relative", top: 10, left: 800 }}>
          <Button onClick={this.back.bind(this)}>返回</Button>
        </div>
        <Row>
          <Col span={10} offset={5}>
            <div className="passcontainer" style={style}>
              <h2
                style={{
                  textAlign: "center",
                  marginBottom: 20,
                  fontFamily: "宋体"
                }}
              >
                修改密码
              </h2>
              <Form onSubmit={this.handleSubmit.bind(this)} className="login-form">
                <FormItem {...formItemLayout} label="原密码" hasFeedback>
                  {getFieldDecorator("oldpassword", {
                    rules: [
                      {
                        required: true,
                        message: "Please input your password!"
                      },
                      {
                        validator: this.checkConfirm
                      },
                      {
                        min: 6,
                        max: 15,
                        message: "密码长度有错"
                      }
                    ]
                  })(<Input type="password" />)}
                </FormItem>
                <FormItem {...formItemLayout} label="新密码" hasFeedback>
                  {getFieldDecorator("newpassword", {
                    rules: [
                      {
                        required: true,
                        message: "不能为空"
                      },
                      {
                        validator: this.checkConfirm
                      },
                      {
                        validator: this.check
                      },
                      {
                        min: 6,
                        max: 15,
                        message: "密码长度有错"
                      }
                    ]
                  })(<Input type="password" />)}
                </FormItem>
                <FormItem {...formItemLayout} label="确认密码" hasFeedback>
                  {getFieldDecorator("confirm", {
                    rules: [
                      {
                        required: true,
                        message: "请确认您的密码!"
                      },
                      {
                        //validator: this.checkPassword
                      },
                      {
                        min: 6,
                        max: 15,
                        message: "密码长度有错"
                      }
                    ]
                  })(<Input type="password" onBlur={this.handleConfirmBlur} />)}
                </FormItem>
                <Button type="primary" htmlType="submit" style={{ width: 320, marginLeft: 95 }}> 修改密码</Button>
              </Form>
            </div>
          </Col>
        </Row>
      </div>
    );
  }
}
export default Form.create()(Changepass);
