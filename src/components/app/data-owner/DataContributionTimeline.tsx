'use client';

import { motion } from 'framer-motion';
import { Clock, TrendingUp, Award, Users } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const timelineData = [
  {
    date: 'Jan 1',
    earnings: 8200,
    campaigns: 12,
    event: 'New Year campaigns spike'
  },
  {
    date: 'Jan 8',
    earnings: 9500,
    campaigns: 15,
  },
  {
    date: 'Jan 15',
    earnings: 11200,
    campaigns: 18,
    event: 'Premium retail data added'
  },
  {
    date: 'Jan 22',
    earnings: 10800,
    campaigns: 17,
  },
  {
    date: 'Jan 29',
    earnings: 12500,
    campaigns: 22,
    event: 'Super Bowl prep begins'
  },
  {
    date: 'Feb 5',
    earnings: 15200,
    campaigns: 28,
    event: 'Peak Super Bowl demand'
  },
  {
    date: 'Feb 12',
    earnings: 13800,
    campaigns: 25,
  }
];

export default function DataContributionTimeline() {
  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload[0]) {
      const data = timelineData.find(d => d.date === label);
      return (
        <div className="bg-white p-3 rounded-lg shadow-lg border border-light-gray">
          <p className="font-medium text-dark-gray mb-1">{label}</p>
          <p className="text-sm text-medium-gray">
            Earnings: ${payload[0].value.toLocaleString()}
          </p>
          <p className="text-sm text-medium-gray">
            Campaigns: {data?.campaigns}
          </p>
          {data?.event && (
            <p className="text-xs text-brand-green mt-1">{data.event}</p>
          )}
        </div>
      );
    }
    return null;
  };

  return (
    <div className="bg-white rounded-xl border border-light-gray p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-semibold text-dark-gray">Contribution Timeline</h3>
          <p className="text-sm text-medium-gray mt-1">Your data value over time</p>
        </div>
        <div className="flex items-center gap-4 text-sm">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-brand-green rounded-full"></div>
            <span className="text-medium-gray">Earnings</span>
          </div>
        </div>
      </div>

      {/* Chart */}
      <div className="mb-6">
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={timelineData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
            <XAxis 
              dataKey="date" 
              tick={{ fontSize: 12 }}
              stroke="#888"
            />
            <YAxis 
              tick={{ fontSize: 12 }}
              stroke="#888"
              tickFormatter={(value) => `$${(value / 1000).toFixed(0)}k`}
            />
            <Tooltip content={<CustomTooltip />} />
            <Line 
              type="monotone" 
              dataKey="earnings" 
              stroke="#33CC66" 
              strokeWidth={2}
              dot={{ r: 4, fill: '#33CC66' }}
              activeDot={{ r: 6 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Key Events */}
      <div className="space-y-3">
        <h4 className="font-medium text-dark-gray mb-3">Key Milestones</h4>
        {timelineData.filter(d => d.event).map((event, index) => (
          <motion.div
            key={event.date}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            className="flex items-start gap-3 p-3 bg-light-gray rounded-lg"
          >
            <div className="w-8 h-8 bg-brand-green/20 rounded-full flex items-center justify-center flex-shrink-0">
              <Clock className="w-4 h-4 text-brand-green" />
            </div>
            <div className="flex-1">
              <div className="flex items-center justify-between">
                <p className="font-medium text-dark-gray text-sm">{event.event}</p>
                <span className="text-xs text-medium-gray">{event.date}</span>
              </div>
              <div className="flex items-center gap-4 mt-1">
                <span className="text-xs text-medium-gray flex items-center gap-1">
                  <TrendingUp className="w-3 h-3" />
                  ${event.earnings.toLocaleString()}
                </span>
                <span className="text-xs text-medium-gray flex items-center gap-1">
                  <Users className="w-3 h-3" />
                  {event.campaigns} campaigns
                </span>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Summary Stats */}
      <div className="mt-6 grid grid-cols-3 gap-4">
        <div className="text-center p-3 bg-light-gray rounded-lg">
          <div className="text-2xl font-semibold text-dark-gray">+48%</div>
          <div className="text-xs text-medium-gray">Growth Rate</div>
        </div>
        <div className="text-center p-3 bg-light-gray rounded-lg">
          <div className="text-2xl font-semibold text-dark-gray">22</div>
          <div className="text-xs text-medium-gray">Active Campaigns</div>
        </div>
        <div className="text-center p-3 bg-light-gray rounded-lg">
          <div className="text-2xl font-semibold text-dark-gray">A+</div>
          <div className="text-xs text-medium-gray">Data Quality</div>
        </div>
      </div>
    </div>
  );
}