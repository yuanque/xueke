import React, { Component } from "react";
import "./Elapse.scss";
import { Row, Col, Card, Button, Modal } from "antd";
var moment = require('moment');

export default class Displayinfo extends Component {

  render() {
    let style = {
      display: "inline-block"
    };
    let titlestyle = {
      fontWeight: "bold",
      fontFamily: '宋体',
    }
    console.log("data" + this.props.data.account);
    let time = this.props.data.starteddate;
    let day = moment.unix(time);
    var time1 = moment(day._d).format("YYYY-MM-DD");
    return (
      <div
        style={{ background: "#ECECEC", padding: "30px" }}
        className="carddiv"
      >
        <Card
          title="个人信息"
          bordered={false}
          style={{ width: 400, fontSize: 16 }}
        >
          <Button style={{ fontFamily: "宋体" }} className="carddiv-button">
            编辑
          </Button>
          <Row>
            <p>
              <Col span={8} style={titlestyle}>
                昵称：
              </Col>
              <Col span={10} offset={3}>
                <div style={style}>{this.props.data.account}</div>
              </Col>
            </p>
            <p>
              <Col span={8} style={titlestyle}>
                性别：
              </Col>
              <Col span={10} offset={3}>
                <div style={style}>{this.props.data.sex}</div>
              </Col>
            </p>
            <p>
              <Col span={8} style={titlestyle}>
                权限：
              </Col>
              <Col span={10} offset={3}>
                <div style={style}>{this.props.data == 1 ? "学生" : this.props.data == 2 ? '老师' : "管理员"}</div>
              </Col>
            </p>
            <p>
              <Col span={8} style={titlestyle}>
                电话：
              </Col>
              <Col span={10} offset={3}>
                <div style={style}>{this.props.data.phone}</div>
              </Col>
            </p>
            <p>
              <Col span={8} style={titlestyle}>
                邮箱：
              </Col>
              <Col span={10} offset={3}>
                <div style={style}>{this.props.data.email}</div>
              </Col>
            </p>
            <p>
              <Col span={8} style={titlestyle}>
                个性签名：
              </Col>
              <Col span={10} offset={3}>
                <div style={style}>{this.props.data.sign}</div>
              </Col>

            </p>
            <p>
              <Col span={8} style={titlestyle}>
                注册时间：
              </Col>
              <Col span={10} offset={3}>
                <div style={style}>{time1}</div>
              </Col>
            </p>
          </Row>
        </Card>
      </div>
    );
  }
}
