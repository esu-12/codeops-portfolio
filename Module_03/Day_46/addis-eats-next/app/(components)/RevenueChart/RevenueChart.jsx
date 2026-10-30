// app/(components)/RevenueChart/RevenueChart.jsx
"use client";

import {
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

import "./RevenueChart.css";

const etb = (value) =>
  new Intl.NumberFormat("en-ET", {
    style: "currency",
    currency: "ETB",
    maximumFractionDigits: 0,
  }).format(Number(value) || 0);

const dateLabel = (value) =>
  new Date(`${value}T12:00:00`).toLocaleDateString("en-ET", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });

export default function RevenueChart({
  data = [],
  ordersOverTime = [],
}) {
  return (
    <div className="revenue-chart">
      <h3>Revenue by neighbourhood (ETB)</h3>

      {data.length === 0 ||
      data.every((item) => item.revenue === 0) ? (
        <p role="status">
          No revenue data is available yet.
        </p>
      ) : (
        <div className="chart-frame">
          <ResponsiveContainer width="100%" height={300}>
            <BarChart
              data={data}
              margin={{ top: 16, right: 20, left: 10, bottom: 8 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="area" />
              <YAxis width={100} tickFormatter={etb} />
              <Tooltip
                formatter={(value) => [etb(value), "Revenue"]}
              />
              <Bar
                dataKey="revenue"
                fill="#1B4D8E"
                name="Revenue"
                radius={[4, 4, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      )}

      <section
        className="orders-over-time"
        aria-labelledby="orders-over-time-heading"
      >
        <h3 id="orders-over-time-heading">
          Orders per day — available recorded dates
        </h3>
        <p>Unit: orders per day</p>

        {ordersOverTime.length === 0 ? (
          <p role="status">
            No order history is available yet.
          </p>
        ) : (
          <>
            <div
              className="chart-frame"
              role="img"
              aria-label="Line chart showing the number of orders per day. The same data is available in the table below."
            >
              <ResponsiveContainer width="100%" height={300}>
                <LineChart
                  data={ordersOverTime}
                  margin={{ top: 16, right: 20, left: 10, bottom: 8 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis
                    dataKey="date"
                    tickFormatter={dateLabel}
                  />
                  <YAxis
                    allowDecimals={false}
                    width={45}
                  />
                  <Tooltip
                    labelFormatter={dateLabel}
                    formatter={(value) => [
                      `${value} orders`,
                      "Orders per day",
                    ]}
                  />
                  <Line
                    type="monotone"
                    dataKey="count"
                    name="Orders per day"
                    stroke="#7B1E1E"
                    strokeWidth={3}
                    dot
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>

            <div className="chart-data-table">
              <table>
                <caption>
                  Daily order counts — the data shown in the line chart
                </caption>
                <thead>
                  <tr>
                    <th scope="col">Date</th>
                    <th scope="col">Orders per day</th>
                  </tr>
                </thead>
                <tbody>
                  {ordersOverTime.map(({ date, count }) => (
                    <tr key={date}>
                      <td>
                        <time dateTime={date}>
                          {dateLabel(date)}
                        </time>
                      </td>
                      <td>{count}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </>
        )}
      </section>
    </div>
  );
}
