import React from 'react'
import "./admin.scss"
import ChartBox from '../../components/chartBox/chartBox'
import {
  chartBoxRevenue,
  chartBoxResumes,
  chartBoxUser,
  chartBoxSharedResumes
} from "./data";

export default function Admin() {
  return (
    <div className='home'>
      <div className='box box1'><ChartBox values={{...chartBoxUser}}/></div>
      <div className='box box2'><ChartBox values={{...chartBoxRevenue}}/></div>
      <div className='box box3'><ChartBox values={{...chartBoxResumes}}/></div>
      <div className='box box4'><ChartBox values={{...chartBoxSharedResumes}}/></div>
    </div>
  )
}
