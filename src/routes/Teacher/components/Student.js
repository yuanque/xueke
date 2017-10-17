import React, { Component, PropTypes } from 'react'
import { Table, Button, Icon, Input } from 'antd'
import List from './List'
import { POST1 } from '../../../components/commonModules/POST'
import moment from 'moment'
class Student extends Component {

  constructor(props) {
    super(props)
    this.state = {
      filterDropdownVisible: false,
      data: [],
      searchText: '',
      filtered: false,
      page: 1,
      cid: 1,
      tid: 1
    }
  }

  componentDidMount() {
    let n = ''
    POST1('/user/getDClassByUid.action', n, (re) => {
      this.setState({ data: re.data.list })
    })
  }

  changePage(num, key) {
    this.setState({ page: num })
    if (key != null) {
      let tid = this.state.data[key.key].tid
      console.log(tid)
      let cid = this.state.data[key.key].id
      this.setState({ cid: cid })
      this.setState({ tid: tid })
    }
  }

  onInputChange = () => {
    this.setState({ searchText: e.target.value })
  }
  render() {
    console.log(this.state.data)
    const columns = [{
      title: '课程名称',
      dataIndex: 'name',
      key: 'name',
      render: (text, record, key) => <div>
        <span>{text}</span>
      </div>,
      filterDropdown: (
        <div className='custom-filter-dropdown'>
          <Input
            ref={ele => this.searchInput = ele}
            placeholder='Search name'
            value={this.state.searchText}
            onChange={this.onInputChange}
            onPressEnter={this.onSearch}
          />
          <Button type='primary' onClick={this.onSearch}>搜索</Button>
        </div>
      ),
      filterIcon: <Icon type='search' style={{ color: this.state.filtered ? '#108ee9' : '#aaa' }} />,
      filterDropdownVisible: this.state.filterDropdownVisible,
      onFilterDropdownVisibleChange: (visible) => {
        this.setState({
          filterDropdownVisible: visible
        }, () => this.searchInput.focus())
      }
    }, {
      title: '难度',
      dataIndex: 'level',
      key: 'level',
      render: (re) => (re == 1 ? '简单' : re == 2 ? '一般' : '难'),
      filters: [{
        text: '简单',
        value: 1
      }, {
        text: '一般',
        value: 2
      }, {
        text: '难',
        value: 3
      }],
      onFilter: (value, record) => record.dificulty.indexOf(value) === 0
    }, {
      title: '学习人数',
      dataIndex: 'totle',
      key: 'totle'
    }, {
      title: '结束时间',
      dataIndex: 'endDate',
      render: (re) => (moment(re).format('YYYY-MM-DD')),
      key: 'endDate'
    }, {
      title: '操作',
      key: 'option',
      render: (text, record, key) => (<span><a style={{ marginRight: 5 }} onClick={this.changePage.bind(this, 2, { key })}>查看详情</a></span>)

    }]
    return (
      <div>
        {this.state.page == 1
          ? <div>
            <h2 style={{ marginTop: 20, marginLeft: 20 }}>课程列表：</h2>
            <Table style={{ padding: 50 }} columns={columns} dataSource={this.state.data} />
          </div>
          : <List tid={this.state.tid} cid={this.state.cid} Change={this.changePage.bind(this)} />}
      </div>
    )
  }
}

export default Student
