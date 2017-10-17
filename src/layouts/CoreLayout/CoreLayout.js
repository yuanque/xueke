import React, { Component } from "react";
import PropTypes from "prop-types";
import Header from "../../components/Header";
import "./CoreLayout.scss";
import "../../styles/core.scss";

class CoreLayout extends Component {
  render() {
    var pathName=this.props.location.pathname;
    var show=true;
    if(pathName=='/video'){
      show=false;
    }
    return (
      <div>
        {show?<Header />:""}
        <div>
          {this.props.children}
        </div>
        <div className='footer'></div>
      </div>
    )
  }
}
CoreLayout.propTypes = {
  children: PropTypes.element.isRequired
};
 
export default CoreLayout;
