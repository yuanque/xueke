import React, { Component } from 'react'
import PropTypes from 'prop-types'
import '../css/All.scss'
import { Input, Button, message, Pagination } from 'antd'
import { POST1 } from '../../../../components/commonModules/POST'
import SingleComment from './singleComment'

const { TextArea } = Input

class CommentBox extends Component {
  constructor(props) {
    super(props)
    this.state = {
      text: '',
      comment: '',
      disableco: true,
      likeCount: 0,
      updata: [],
      islike: false,
      idlist: [],
      allCount: 0
    }
  }
  componentWillMount() {
    /*
    *  cid：课程id
       pid: 节id
    * 获取给定的课程cid的评论
    */

    this.query(1)
  }
  // 查询评论
  query(pageNum) {
    var pid = this.props.pid
    var cid = this.props.cid
    if (pid == undefined) {
      var data = `cid=${cid}&pageNum=${pageNum}&pageSize=5`
    } else if (pid !== undefined) {
      var data = `pid=${pid}&pageNum=1&pageSize=5`
    } else {
      alert('网络错误')
    }
    POST1('/getComment.action', data, re => {
      if (re.status === 1) {
        this.setState({ updata: re.data.list })
        this.setState({ allCount: re.data.total })
        console.log(re.data.total)
      }
    })
  }
  onChange(e) {
    var leng = e.target.value.length
    this.setState({ text: e.target.value })
    this.setState({ disable: leng === 0 })
  }
  oncoChange(e) {
    var leng = e.target.value.length
    this.setState({ comment: e.target.value })
    this.setState({ disableco: leng === 0 })
  }
  onClickButton() {
    message.config({
      top: 300,
      duration: 2
    })
    // 向评论数组添加数据
    var text = this.state.text
    this.setState({ text: '' })
    // 向服务器发送评论内容(添加评论)
    var cid = this.props.cid
    var pid = this.props.pid
    if (pid == undefined) {
      var data = `cid=${cid}&data=${text}`
    } else if (pid != 'undefined') {
      var data = `cid=${cid}&pid=${pid}&data=${text}`
    }
    POST1('/user/createComment.action', data, re => {
      if (re.status == 1) {
        message.info('评论成功')
        this.query()
      } else {
        message.error('网络出错')
      }
    })
  }
  commentClickButton() {
    this.state.updata.unshift({ comment: this.state.comment })
    this.setState({ comment: '' })
  }
  keydown(e) {
    console.log(e.keycode)
    if (e.keyCode == 13) {
      this.onClickButton()
    }
  }
  changepage(page, pageSize) {
    this.query(page)
  }
  render() {
    const { text } = this.state
    return (
      <div className='comment-list'>
        <TextArea
          rows={4}
          placeholder='请输入评论内容...'
          value={text}
          onChange={(e) => this.onChange(e)}
          onKeyDown={(e) => { this.keydown(e) }}
        />
        <Button
          className='comment_send'
          type='submit'
          onClick={() => this.onClickButton()}
        >
          发表评论
        </Button>
        <br />

        {this.state.updata.map((item, i) => {
          return (
            <div key={i}>
              <SingleComment item={item} />
            </div>
          )
        })}
        <Pagination onChange={(page, pageSize) => { this.changepage(page, pageSize) }}
          total={this.state.allCount} pageSize={5} />
      </div>
    )
  }
}
export default CommentBox

