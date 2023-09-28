import { useEffect, useState } from "react";
import { PieChart, Pie, Legend, Cell, BarChart, Bar, XAxis, LabelList, YAxis, Tooltip, CartesianGrid, Sector, Text } from "recharts";

import { Dash } from "../../componentes/Dash";

import { COLORS } from "../../constants";
import { fetchAvgMissionGeneral, fetchAvgTroubleCompanies, fetchGeneralRanking, fetchUserCertificates } from '../../services/fetches';

import './style.css';

export function Dashboard() {
  const [avgMissionGeneral, setAvgMissionGeneral] = useState([]);
  const [groupByAvgMissionGeneral, setGroupByAvgMissionGeneral] = useState('name');
  const [avgTroubleCompanies, setAvgTroubleCompanies] = useState([]);
  const [groupByAvgTroubleCompanies, setGroupByAvgTroubleCompanies] = useState('name');
  const [userCertificates, setUserCertificates] = useState([]);
  const [activeIndex, setActiveIndex] = useState(0);
  const [generalRanking, setGeneralRanking] = useState([]);

  useEffect(() => {
    fetchAvgMissionGeneral(groupByAvgMissionGeneral)
      .then(response => setAvgMissionGeneral(response));
  }, [groupByAvgMissionGeneral]);

  useEffect(() => {
    fetchAvgTroubleCompanies(groupByAvgTroubleCompanies)
      .then(response => setAvgTroubleCompanies(response));
  }, [groupByAvgTroubleCompanies]);

  useEffect(() => {
    fetchUserCertificates()
      .then(response => setUserCertificates(response));
  }, []);

  useEffect(() => {
    fetchGeneralRanking()
      .then(response => setGeneralRanking(response));
  }, []);

  const renderActiveShape = (props) => {
    const RADIAN = Math.PI / 180;
    const { cx, cy, midAngle, innerRadius, outerRadius, cornerRadius, startAngle, endAngle, fill, payload, percent, value } = props;
    const sin = Math.sin(-RADIAN * midAngle);
    const cos = Math.cos(-RADIAN * midAngle);
    const sx = cx + (outerRadius + 10) * cos;
    const sy = cy + (outerRadius + 10) * sin;
    const mx = cx + (outerRadius + 30) * cos;
    const my = cy + (outerRadius + 30) * sin;
    const ex = mx + (cos >= 0 ? 1 : -1) * 22;
    const ey = my;
    const textAnchor = cos >= 0 ? 'start' : 'end';

    return (
      <g>
        <Sector
          cx={cx}
          cy={cy}
          innerRadius={innerRadius}
          outerRadius={outerRadius}
          startAngle={startAngle}
          endAngle={endAngle}
          cornerRadius={cornerRadius}
          fill={fill}
        />
        <Sector
          cx={cx}
          cy={cy}
          startAngle={startAngle}
          endAngle={endAngle}
          innerRadius={outerRadius + 6}
          outerRadius={outerRadius + 10}
          cornerRadius={cornerRadius}
          fill={fill}
        />
        <path d={`M${sx},${sy}L${mx},${my}L${ex},${ey}`} stroke={fill} fill="none" />
        <text x={ex + (cos >= 0 ? 1 : -1) * 12} y={ey} textAnchor={textAnchor} fill="#333">{`${payload.company}: ${value}`}</text>
        <text x={ex + (cos >= 0 ? 1 : -1) * 12} y={ey} dy={18} textAnchor={textAnchor} fill="#999">{`${(percent * 100).toFixed(2)}%`}</text>
      </g>
    );
  };

  const LegendWithValues = ({ payload }) => {
    return (
      <ul style={{ listStyle: "none" }}>
        {payload?.map((item, i) => (
          <li key={i} className="d-flex align-items-center gap-1">
            <span style={{ background: item.color, width: 20, height: 20, borderRadius: "50%" }} />
            {item.value} - {item.payload.value} ({(item.payload.percent * 100).toFixed(2)}%)
          </li>
        ))}
      </ul>
    );
  };

  const CustomTick = (props) => {
    const { x, y, payload } = props;

    return (
      <Text x={x + 5} y={y + 25} width={10} textAnchor="middle" fill="#666" fontSize={12} angle={-35} orientation={"top"}>
        {payload.value}
      </Text>
    );
  };

  return (
    <div className="row">
      <div className="col-12">
        <div className="dashboard">
          <Dash title="Ranking geral">
            <BarChart data={generalRanking} width={600} height={400} margin={{ top: 20, bottom: 40 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#aaa" />
              <XAxis dataKey="name" fontSize={12} interval={0} label={{ value: "Usuários", dy: 40, fill: "#000" }} stroke="#222" tick={<CustomTick />} />
              <YAxis fontSize={13} allowDataOverflow dataKey={v => parseInt(v.level)} type="number" label={{ value: "Nível", angle: -90, fill: "#000" }} />
              <Tooltip position={{ y: 0 }} />
              <Bar barSize={40} name="Nível" dataKey="level" fill="#007CC3">
                <LabelList position="inside" offset={30} angle={90} fill="#fff" fontSize={13} />
              </Bar>
            </BarChart>
          </Dash>

          <Dash title="Total de certificados emitidos">
            <PieChart width={700} height={400} margin={{ top: 20, bottom: 40 }}>
              <Pie data={userCertificates}
                nameKey="company"
                dataKey="qtde"
                activeIndex={activeIndex}
                activeShape={renderActiveShape}
                cy={175}
                cx={250}
                innerRadius={50}
                outerRadius={100}
                paddingAngle={4}
                cornerRadius={4}
                onMouseEnter={(_, i) => setActiveIndex(i)}
              >
                {userCertificates.map((entry, index) => <Cell key={index} fill={COLORS[index % COLORS.length]} />)}
              </Pie>
              <Legend align="right" layout="vertical" verticalAlign="middle" content={LegendWithValues} />
            </PieChart>
          </Dash>

          <Dash
            title="Média de pontos por missão"
            filter={groupByAvgMissionGeneral}
            setFilter={setGroupByAvgMissionGeneral}
          >
            <BarChart data={avgMissionGeneral} width={600} height={400} margin={{ top: 20, bottom: 40 }}>
              <Legend />
              <CartesianGrid strokeDasharray="3 3" stroke="#aaa" />
              <XAxis dataKey={groupByAvgMissionGeneral === "name" ? "name" : "company"} fontSize={12} interval={0} stroke="#222" />
              <YAxis fontSize={12} allowDecimals dataKey={v => parseInt(v.avg)} type="number" domain={[0, 100]} />
              <Tooltip position={{ y: 0 }} />
              <Bar barSize={40} name="Média" dataKey="avg" isAnimationActive={false} fill="#377B2B">
                <LabelList position="inside" offset={30} angle={90} fill="#fff" fontSize={13} />
              </Bar>
            </BarChart>
          </Dash>

          <Dash
            title="Total de problemas resolvidos"
            filter={groupByAvgTroubleCompanies}
            setFilter={setGroupByAvgTroubleCompanies}
          >
            <BarChart data={avgTroubleCompanies} width={600} height={400} margin={{ top: 20, bottom: 40 }}>
              <Legend />
              <CartesianGrid strokeDasharray="3 3" stroke="#aaa" />
              <XAxis dataKey={groupByAvgTroubleCompanies === "name" ? "name" : "company"} fontSize={12} interval={0} stroke="#222" />
              <YAxis fontSize={12} dataKey={v => parseInt(v.qtde)} type="number" />
              <Tooltip position={{ y: 0 }} />
              <Bar barSize={40} name="Quantidade" dataKey="qtde" isAnimationActive={false} fill="#6251A3">
                <LabelList position="inside" offset={30} angle={90} fill="#fff" fontSize={13} />
              </Bar>
            </BarChart>
          </Dash>
        </div>
      </div>
    </div>
  );
}
