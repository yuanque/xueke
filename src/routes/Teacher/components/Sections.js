import React from 'react'
import PropTypes from 'prop-types'
import './Sections.scss'
import { Collapse, Input, Icon, Row, Col, Button, Select, Tooltip, Upload, DatePicker } from 'antd'
import { POST1 } from '../../../components/commonModules/POST'
import moment from 'moment'
import SectionInfo from './SectionInfo'
import SelectEdit from './SelectEdit'
import FinalExam from'./Final_exam'

const Panel = Collapse.Panel

const Option = Select.Option

const { TextArea } = Input

const { RangePicker } = DatePicker

function callback (key) {
  console.log(key)
}

const text = `
  A dog is a type of domesticated animal.
  Known for its loyalty and faithfulness,
  it can be found as a welcome guest in many households across the world.
`

export default class Section extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
    }
  }
  add = () => {
    const { filelist } = this.state
    let def = {
      sectionName: 'new section',
      sectionTest: '',
      part: [
        {
          doclist: [{// 课件
            uid: 1,
            name: '',
            status: '',
            url: ''
          }],
          audiolist: [{// 节视频
            uid: 1,
            name: 'xxx.mp4',
            status: 'done',
            url: ''
          }]
        }
      ]
    }
    const filelist1 = filelist.concat(def)
    this.setState({ filelist: filelist1 })
  }
  /**
   * 点击提交的回调
   */
  submit () {
    // 获取课程名
    let coursename = this.state.coursename
    // 获取课程开始和结束日期
    let startdate = this.state.startdate
    let enddate = this.state.enddate
    // 获取课程难度
    let difficulty = this.state.difficulty
    // 获取课程简介
    let info = this.state.info
    // 课程须知
    let know = this.state.know
    // 获取课程权限
    let type = this.state.public
    // 获取课程收获
    let gain = this.state.gain
    // 向后台发送课程的基本信息
    let date = `name=${coursename}&info=${info}&startDate=${startdate}
    &endDate=${enddate}&know=${know}&type=${type}&gain=${gain}&level=${difficulty}`
    POST1('/admin/createDClass.action', date, (re) => {
      if (re.status === 1) {
        console.log(re)
      }
    })
    console.log(this.state.filelist)
  }
  remove = (k) => {
    const { filelist } = this.state
    if (filelist.length === 1) {
      return
    } else {
      this.state.filelist.splice(k, 1)
      this.setState({ filelist })
    }
  }

  addPart (i) {
    let def = {
      doclist: [{
        uid: 1,
        name: 'xxx.mp4',
        status: 'done',
        url: ''
      }],
      audiolist: [{
        uid: 1,
        name: 'xxx.mp4',
        status: 'done',
        url: ''
      }]
    }

    const filelist2 = this.state.filelist[i].part.concat(def)
    this.state.filelist[i].part = filelist2
    this.setState({ filelist: this.state.filelist })
    console.log(this.state.filelist)
  }

  removePart = (k, index) => {
    const { part } = this.state.filelist[k]

    if (part.length === 1) {
      return
    } else {
      this.state.filelist[k].part.splice(index, 1)
      this.setState({ filelist: this.state.filelist })
    }
  }
  ChangeInfo (type, value) {
    var state = this.state
    state[type] = value
    this.setState({ ...state })
  }
  Disable = () => () => {
    this.setState({ disable: !this.state.disable })
  }
  back = () => () => {
    this.props.Change(1)
  }
  coursename (e) {
    this.setState({ coursename: e.target.value })
  }
  toEdit () {
    this.props.Page(2)
  }
  changedata (dateString) {
    console.log(`${dateString[0]}&${dateString[1]}`)
    this.setState({ startdate: moment(dateString[0]).format('YYYY-MM-DD') })
    this.setState({ enddate: moment(dateString[1]).format('YYYY-MM-DD') })
  }
  handleChange = ({ fileList }) => this.setState({ fileList })

  // 文件上传的回掉
  handleUpload = () => {
    const { fileList } = this.state
    const formData = new FormData()
    fileList.forEach((file) => {
      formData.append('files[]', file)
    })
    this.setState({
      uploading: true
    })
  }
  // 上传文档的方法
  handleUploaddoc () {
    const { fileList } = this.state
    const formData = new FormData()
    fileList.forEach((file) => {
      formData.append('files[]', file)
    })
    this.setState({
      uploading: true
    })
  }

  render () {
    const courseinfo = this.state.courseinfo
    const { disable, filelist } = this.state
    // 文件上传的配置
    const props = {
      action: '//jsonplaceholder.typicode.com/posts/',
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
    const { uploading } = this.state
    return (
      <div>
        <SectionInfo cid={this.props.cid} />
        <SelectEdit cid={this.props.cid} />
        <FinalExam cid={this.props.cid}/>        
       
      </div>
    )
  }

}
