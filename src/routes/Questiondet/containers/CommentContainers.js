import { connect } from 'react-redux'
import { plus } from './../modules/Comment'

import Comment from './../components/Comment'

const mapDispatchtoProps = {
  plus
}

const mapStateToProps = (state) => ({
  Comment: state.Comment
})

export default connect(mapStateToProps, mapDispatchtoProps)(Comment)
