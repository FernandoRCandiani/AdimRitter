import { PieChart, Pie, Legend, Cell, BarChart, Bar, XAxis, LabelList, YAxis, Label, Tooltip } from "recharts";

const mock = [
  {
    company: "Coca",
    qtde: 5,
  },
  {
    company: "Pepsi",
    qtde: 3,
  },
];

export function Dashboard() {
  return (
    <div className="d-flex flex-column gap-2">
      <div className="row align-items-center justify-content-between gap-3">
        <div className="col d-flex justify-content-center align-items-center bg-body-tertiary shadow m-0 p-3">
          <BarChart data={mock} width={450} height={300}>
            <Bar
              barSize={40}
              name="Quantidade"
              dataKey="qtde"
              label={{ fill: "white" }}
            />
            <XAxis dataKey="company" fontSize={12}>
              <Label value="Empresas" position="insideBottom" offset={5} />
            </XAxis>
            <YAxis dataKey="qtde" fontSize={12}>
              <Label angle={-90} value="Quantidade" />
            </YAxis>
            <Tooltip />
          </BarChart>
        </div>
        <div className="col bg-body-tertiary shadow m-0 p-3">
          <BarChart data={mock} width={450} height={300}>
            <Bar
              barSize={40}
              name="Quantidade"
              dataKey="qtde"
              label={{ fill: "white" }}
            />
            <XAxis dataKey="company" fontSize={12}>
              <Label value="Empresas" position="insideBottom" offset={5} />
            </XAxis>
            <YAxis dataKey="qtde" fontSize={12}>
              <Label angle={-90} value="Quantidade" />
            </YAxis>
            <Tooltip />
          </BarChart>
        </div>
      </div>
    </div>
  );
}
