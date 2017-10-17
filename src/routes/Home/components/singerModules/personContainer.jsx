import React from "react";
import img1 from "../../img/myheader.jpg";
import "./personContainer.scss";

export default class Myinfo extends React.Component {
  render() {
    let header = {
      display: "inline-block",
      borderRadius: "50%",
      marginLeft: 60,
      marginTop: 10
    };
    return (
      <div className="myinfo">
        <img src={img1} height="50px" width="50px" style={header} />
        <h3 style={{ textAlign: "center" }}>channingbree</h3>
        <div className="course1 courseRecent1">
          <a href="">
            <span>中国古代建筑艺术</span>
          </a>
        </div>
        <div className="course1 courseRecent2">
          <a href="">
            <span>中国古代建筑艺术</span>
          </a>
        </div>
        <div className="course1 courseRecent3">
          <a href="">
            <span>中国古代建筑艺术</span>
          </a>
        </div>
        <div className="mycourse-btn">
          <a href="#">
            <span>我的课程</span>
          </a>
        </div>
      </div>
    );
  }
}
