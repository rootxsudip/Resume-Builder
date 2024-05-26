import './chartBox.scss'
import { Link } from 'react-router-dom'
import { Line, LineChart, ResponsiveContainer, Tooltip } from "recharts";

export default function ChartBox({values}) {

  return (
    <div className='chartBox'>
        <div className='boxInfo'>
            <div className='title'>
                <img src={values.icon} alt='' />
                <span>{values.title}</span>
            </div>
            <h1>{values.number}</h1>
            <Link to="" style={{ color: values.color }}>View all</Link>
        </div>
        <div className='chartInfo'>
            <div className='chart'>
            <ResponsiveContainer width="99%" height="100%">
            <LineChart data={values.chartData}>
            <Tooltip
            contentStyle={{background:"transparent", border:"none"}}
            labelStyle={{display:"none"}}
            position={{x:10, y:50}}
            />
            <Line type="monotone" dataKey={values.dataKey} stroke={values.color} strokeWidth={2} dot={false} />
            </LineChart>
            </ResponsiveContainer>
            </div>
            <div className='texts'>
                <span className='percentage' style={{color: values.percentage<0 ? "Tomato" : "limegreen"}}>{values.percentage}%</span>
                <span className='duration'>this month</span>
            </div>
        </div>
    </div>
  )
}
