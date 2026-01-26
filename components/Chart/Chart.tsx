import { LineChart, XAxis, YAxis, CartesianGrid, Tooltip, Legend, Line } from 'recharts';

interface chartProps {
  data: { date: string; mood: number; }[]
}

const Chart = ({data}:chartProps) => {
  return(
    <LineChart
      style={{ width: '100%', maxWidth: '700px', maxHeight: '70vh', aspectRatio: 1.618 }}
      responsive
      data={data}
      margin={{
        top: 5,
        right: 30,
        left: 20,
        bottom: 5,
      }}
      
    >
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="date" />
      <YAxis dataKey="mood" width="auto" />
      <Tooltip />
      <Legend />
      <Line type="monotone" dataKey="mood" stroke="#8884d8" isAnimationActive={true} animationDuration={2000} />
    </LineChart>
  )
}

export default Chart;