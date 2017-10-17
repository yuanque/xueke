import React, { Component, PropTypes } from 'react'
import { Table, Button, Icon, Input, Row, Col } from 'antd'
import { POST1 } from '../../../components/commonModules/POST'
import Stest from './Stest'
import moment from 'moment'

class List extends Component {
  constructor(props) {
    super(props)
    this.state = {
      filterDropdownVisible: false,
      data: [],
      data1: [],
      searchText: '',
      filtered: false,
      page: 1,
      uid: 1
    }
  }

  componentDidMount() {
    let n = `cid=${this.props.cid}`
    POST1('/admin/getScores.action', n, (re) => {
      console.log(re)
      var arr = re.data.filter((arr) => arr.type == 4)
      console.log(arr)
      this.setState({ data: arr })
    })
  }

  onInputChange = () => {
    this.setState({ searchText: e.target.value })
  }

  detial(num, uid) {
    this.setState({
      page: num,
      uid: uid
    })
  }
  changePage() {
    this.props.Change(1)
  }
  onSearch = () => {
    const { searchText } = this.state
    const reg = new RegExp(searchText, 'gi')
    this.setState({
      filterDropdownVisible: false,
      filtered: !!searchText,
      data: data.map((record) => {
        const match = record.courseName.match(reg)
        if (!match) {
          return null
        }
        return {
          ...record,
          name: (
            <span>
              {record.courseName.split(reg).map((text, i) => (
                i > 0 ? [<span className='highlight'>{match[0]}</span>, text] : text
              ))}
            </span>
          )
        }
      }).filter(record => !!record)
    })
  }

  render() {
    const columns = [{
      title: '姓名',
      dataIndex: 'user.account',
      key: 'user.account',
      render: (text, record, key) => <div>
        {text}
      </div>,
      filterIcon: <Icon type='search' style={{ color: this.state.filtered ? '#108ee9' : '#aaa' }} />,
      filterDropdownVisible: this.state.filterDropdownVisible,
      onFilterDropdownVisibleChange: (visible) => {
        this.setState({
          filterDropdownVisible: visible
        }, () => this.searchInput.focus())
      }
    }, {
      title: '期末成绩',
      dataIndex: 'score',
      key: 'score'
    }, {
      title: '考试时间',
      dataIndex: 'startedDate',
      key: 'startedDate',
      render: (re) => (moment(re).format('YYYY-MM-DD')),
    }
    ]
    return (
      <div>
        {this.state.page == 1
          ? <div>
            <Row><Col span={3}><h2 style={{ marginTop: 20, marginLeft: 20 }}>学生成绩列表：</h2></Col>
              <Col span={1}><Button style={{ marginTop: 20 }} onClick={this.changePage.bind(this)}><Icon type='rollback' /></Button></Col></Row>
            <Table style={{ padding: 50 }} columns={columns} dataSource={this.state.data} />
          </div>
          : <Stest uid={this.state.uid} tid={this.props.tid} change={this.detial.bind(this)} />}
      </div>
    )
  }
}

export default List
