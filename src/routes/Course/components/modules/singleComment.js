import React from 'react'
import moment from 'moment'
import '../css/All.scss'
import { Icon, message } from 'antd'
import { POST1, BASE_URL } from '../../../../components/commonModules/POST'
import { browserHistory } from 'React-Router'
export default class SingleComment extends React.Component {
  seeinfo () {
    browserHistory.push({
      pathname: `/pinfo`,
      query: {
        // 将课程id传入课程详情
        id: this.props.item.user.id
      }
    })
  }
  render () {
    var item = this.props.item
    return (
      <div className='comment_box' >
        <div className='tx'>
          <img src={BASE_URL + item.user.head} style={{ height: 45, width: 45 }} />
        </div>
        <h4 className='comment-title'>
          <a onClick={() => this.seeinfo()}>{item.user.account}</a>:
              </h4>
        <p className='comment-detail'>
          {item.data}
        </p>
        <Like id={item.id} likes={item.likes} />
        <h5 className='class'>
        {moment(item.startedDate).format('YYYY-MM-DD')}
        </h5>
      </div>
    )
  }
}
// 定义点赞组件
class Like extends React.Component {

  constructor (props) {
    super(props)
    this.state = {
      islike: '',
      likecount:''
    }
  }
  componentWillMount () {
    this.asklile()
  }
  // 查询点赞接口
  asklile () {
    var id = this.props.id
    var data = `id=${id}`
    POST1('/user/isLike.action', data, re => {
      this.setState({ islike:re.status, likecount:re.data })
    })
  }
  changelike () {
    const success = () => {
      message.success('点赞成功', 1.5)
    }
    var data = `id=${this.props.id}`
    POST1('/user/like.action', data, re => {
      if (re.status === 1) {
        if (this.state.islike === 0) {
          success()
        }
        this.asklile()
      } else {
        alert('发生错误，请稍后再试')
      }
    })
  }

  render () {
    return (
      <div className='zan'>
        <span onClick={() => this.changelike()}>
          <Icon
            type={this.state.islike === 0 ? 'like-o' : 'like'}
            style={{ fontSize: 18, color: '#5F9EA0' }}
          />
          ({this.state.likecount})
        </span>
      </div>
    )
  }
}
