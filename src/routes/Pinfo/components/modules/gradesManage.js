import React from 'react';
import './gradesManage.scss'
import Course_card from '../../../Home/components/singerModules/CourseCard.jsx'
/*
	课程管理父组件<GradesManage />


*/
export default class GradesManage extends React.Component {
    render() {
        return (
            <div className="grades_manages">
                <h3 className="course_count">一共有100门课程</h3>
                <Course_card />
            </div>
        )
    }
}