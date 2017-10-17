import React from 'react'
import { Layout, Menu, Card, Icon, Row, Col, Button } from 'antd'
import './teacher.scss'
import './classManage.scss'
import Student from './Student'
import Editor from './Course_editor'
import { POST1 } from '../../../components/commonModules/POST'
import Test from './testEdit'
import moment from 'moment'

const { Header } = Layout

export default class Charge extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      change: 1,
      course: [],
      cid: '' // 定义课程id传到子组件

    }
  }
  isChange(num, num1, e) {
    e.preventDefault()
    if (num == 5) { // 添加课程
      var p = `name=未命名&level=${1}&info=""&pblic=1&know=["a"]&gain=["a"]&startDate=${moment().format('YYYY-MM-DD HH:mm:ss')}&endDate=${moment().format('YYYY-MM-DD HH:mm:ss')}&vpercent=${20}&cpercent=${20}&tpercent=${60}`
      POST1('/admin/createDClass.action', p, (re) => {
        if (re.status == 1) { // 创建成功
          var cid = re.data
          this.setState({ change: 4, cid: cid })
        }
      })
    } else {
      this.setState({ change: num })
      this.getList()
      this.setState({ cid: num1 })
    }
  }
  componentDidMount() {
    this.getList()
  }
  getList() {
    let data = ``
    POST1(`/user/getDClassByUid.action`, data, (re) => {
      if (re.status == 1) {
        this.setState({ course: re.data.list })
      } else {
        alert('网络错误，请刷新页面重试')
      }
    })
  }
  back() {
    history.go(-1)
  }
  delete(id) {
    let data = `id=${id}`
    POST1(`/admin/deleteDClass.action`, data, (re) => {
      if (re.status == 1) {
        alert('删除成功')
        this.getList()
      } else {
        alert('网络错误，请刷新页面重试')
      }
    })
  }
  render() {
    const { change } = this.state
    return (
      <Layout>
        <Header className='header'>
          <div className='logo' />
          <Menu
            theme='dark'
            mode='horizontal'
            defaultSelectedKeys={['1']}
            style={{ lineHeight: '64px', minWidth: 1235 }}
          >
            <Menu.Item key='1'><div onClick={this.isChange.bind(this, 1)}>课程管理</div></Menu.Item>
            <Menu.Item key='2'><div onClick={this.isChange.bind(this, 2)}>学生管理</div></Menu.Item>
            <Menu.Item key='4'><div className='back' onClick={this.back.bind(this)}>返回到个人中心</div></Menu.Item>
          </Menu>
        </Header>
        {change == 1
          ? <Row className='card_row'>
            {this.state.course.map((item, i) => {
              return (
                <Col className='card_col' span={6} key={i}>
                  <Card title={item.name} extra={<span><a href='#' onClick={this.isChange.bind(this, 4, item.id)}>编辑课程</a>
                    <a href='#' className='delet' style={{ marginLeft: 3 }} onClick={this.delete.bind(this, item.id)}>删除</a></span>}
                    style={{ width: '90%', height: '100%', margin: '0 auto', color: '#6A9FB5' }}>
                    <div style={{ color: 'lightgray' }}>学习人数：{item.totle}</div>
                    <div style={{ marginLeft: 5, marginTop: 5, color: 'lightgray' }}>
                      简介：<br />{item.info}</div>

                  </Card>
                </Col>
              )
            })}
            <Col span={6}>
              <div className='plus' onClick={this.isChange.bind(this, 5)}>
                <Icon type='plus' style={{ fontSize: 80 }} />
              </div>
            </Col>
          </Row>
          : change == 2 ? <Student Change={this.isChange.bind(this)} />
            : change == 4 ? <Editor Change={this.isChange.bind(this)} cid={this.state.cid} />
              : null}

      </Layout>
    )
  }
}
