"use client";

import { useState } from "react";
import { 
  LineChart, 
  Line, 
  AreaChart, 
  Area,
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  Legend 
} from "recharts";
import { Calendar } from "lucide-react";

// Generate mock data for the last 30 days
const generateMockData = () => {
  const data = [];
  const today = new Date();
  
  for (let i = 29; i >= 0; i--) {
    const date = new Date(today);
    date.setDate(date.getDate() - i);
    
    // Simulate growing earnings with some variance
    const baseEarnings = 1200 + (29 - i) * 30; // Growing trend
    const variance = Math.random() * 400 - 200; // +/- $200 variance
    const earnings = Math.max(baseEarnings + variance, 800);
    
    data.push({
      date: date.toLocaleDateString("en-US", { month: "short", day: "numeric" }),
      earnings: Math.round(earnings),
      impressions: Math.floor(earnings * 8.5 + Math.random() * 1000),
    });
  }
  
  return data;
};

const mockData = generateMockData();

export default function EarningsChart() {
  const [timeRange, setTimeRange] = useState("30d");
  const [chartType, setChartType] = useState<"earnings" | "impressions">("earnings");

  const timeRanges = [
    { value: "7d", label: "7 days" },
    { value: "30d", label: "30 days" },
    { value: "90d", label: "90 days" },
  ];

  const getDataForRange = () => {
    switch (timeRange) {
      case "7d":
        return mockData.slice(-7);
      case "30d":
        return mockData;
      case "90d":
        // For 90 days, we'd generate more data
        return mockData;
      default:
        return mockData;
    }
  };

  const data = getDataForRange();

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-3 rounded-lg shadow-lg border border-silk-gray">
          <p className="text-sm font-medium text-dark-gray mb-2">{label}</p>
          {payload.map((entry: any, index: number) => (
            <p key={index} className="text-sm" style={{ color: entry.color }}>
              {entry.name}: {entry.name === "Earnings" ? `$${entry.value}` : entry.value.toLocaleString()}
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-silk-gray p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-xl font-semibold text-dark-gray">Earnings Overview</h2>
          <p className="text-sm text-medium-gray">Track your revenue growth over time</p>
        </div>
        
        <div className="flex items-center gap-4">
          <div className="flex bg-light-gray rounded-lg p-1">
            <button
              onClick={() => setChartType("earnings")}
              className={`px-3 py-1 rounded text-sm font-medium transition-colors ${
                chartType === "earnings" 
                  ? "bg-white text-dark-gray shadow-sm" 
                  : "text-medium-gray hover:text-dark-gray"
              }`}
            >
              Revenue
            </button>
            <button
              onClick={() => setChartType("impressions")}
              className={`px-3 py-1 rounded text-sm font-medium transition-colors ${
                chartType === "impressions" 
                  ? "bg-white text-dark-gray shadow-sm" 
                  : "text-medium-gray hover:text-dark-gray"
              }`}
            >
              Impressions
            </button>
          </div>
          
          <div className="flex items-center gap-2 border-l border-silk-gray pl-4">
            <Calendar size={16} className="text-medium-gray" />
            <select
              value={timeRange}
              onChange={(e) => setTimeRange(e.target.value)}
              className="text-sm border border-silk-gray rounded-lg px-3 py-1 focus:ring-2 focus:ring-brand-green focus:border-transparent"
            >
              {timeRanges.map((range) => (
                <option key={range.value} value={range.value}>
                  {range.label}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          {chartType === "earnings" ? (
            <AreaChart data={data} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
              <defs>
                <linearGradient id="colorEarnings" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#1DB954" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="#1DB954" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#E5E5E7" />
              <XAxis 
                dataKey="date" 
                stroke="#86868B"
                style={{ fontSize: "12px" }}
              />
              <YAxis 
                stroke="#86868B"
                style={{ fontSize: "12px" }}
                tickFormatter={(value) => `$${value}`}
              />
              <Tooltip content={<CustomTooltip />} />
              <Area 
                type="monotone" 
                dataKey="earnings" 
                stroke="#1DB954" 
                strokeWidth={2}
                fillOpacity={1} 
                fill="url(#colorEarnings)" 
                name="Earnings"
              />
            </AreaChart>
          ) : (
            <LineChart data={data} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#E5E5E7" />
              <XAxis 
                dataKey="date" 
                stroke="#86868B"
                style={{ fontSize: "12px" }}
              />
              <YAxis 
                stroke="#86868B"
                style={{ fontSize: "12px" }}
                tickFormatter={(value) => value.toLocaleString()}
              />
              <Tooltip content={<CustomTooltip />} />
              <Line 
                type="monotone" 
                dataKey="impressions" 
                stroke="#7B4FFF" 
                strokeWidth={2}
                dot={{ fill: "#7B4FFF", r: 4 }}
                activeDot={{ r: 6 }}
                name="Impressions"
              />
            </LineChart>
          )}
        </ResponsiveContainer>
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-3 gap-4 mt-6 pt-6 border-t border-silk-gray">
        <div>
          <p className="text-sm text-medium-gray mb-1">Total Earnings</p>
          <p className="text-2xl font-bold text-dark-gray">
            ${data.reduce((sum, d) => sum + d.earnings, 0).toLocaleString()}
          </p>
          <p className="text-xs text-brand-green">+23.5% vs previous period</p>
        </div>
        <div>
          <p className="text-sm text-medium-gray mb-1">Avg Daily</p>
          <p className="text-2xl font-bold text-dark-gray">
            ${Math.round(data.reduce((sum, d) => sum + d.earnings, 0) / data.length).toLocaleString()}
          </p>
          <p className="text-xs text-medium-gray">Steady growth</p>
        </div>
        <div>
          <p className="text-sm text-medium-gray mb-1">Best Day</p>
          <p className="text-2xl font-bold text-dark-gray">
            ${Math.max(...data.map(d => d.earnings)).toLocaleString()}
          </p>
          <p className="text-xs text-medium-gray">
            {data.find(d => d.earnings === Math.max(...data.map(d => d.earnings)))?.date}
          </p>
        </div>
      </div>
    </div>
  );
}