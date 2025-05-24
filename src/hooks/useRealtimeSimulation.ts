'use client';

import { useState, useEffect, useCallback } from 'react';

export interface SimulationEvent {
  id: string;
  type: 'impression' | 'click' | 'conversion' | 'attribution' | 'earning';
  timestamp: number;
  data: {
    campaignId?: string;
    campaignName?: string;
    assetId?: string;
    assetName?: string;
    value?: number;
    dsp?: string;
    location?: string;
    device?: string;
  };
}

interface SimulationConfig {
  eventsPerSecond: number;
  campaigns: string[];
  assets: string[];
  dsps: string[];
  locations: string[];
  devices: string[];
}

const defaultConfig: SimulationConfig = {
  eventsPerSecond: 2,
  campaigns: [
    'Nike Summer Fitness',
    'Nike Fall Collection',
    'Adidas Performance',
    'Under Armour Training',
    'Lululemon Yoga'
  ],
  assets: [
    'Fitness Enthusiasts',
    'Purchase Intent Signals',
    'Location Data',
    'Demographic Insights',
    'Weather Context'
  ],
  dsps: ['Precise', 'Google DV360', 'Amazon DSP', 'The Trade Desk', 'Meta'],
  locations: ['New York', 'Los Angeles', 'Chicago', 'Miami', 'Seattle'],
  devices: ['Mobile', 'Desktop', 'Tablet', 'CTV', 'Audio']
};

export function useRealtimeSimulation(config: Partial<SimulationConfig> = {}) {
  const [events, setEvents] = useState<SimulationEvent[]>([]);
  const [isRunning, setIsRunning] = useState(true);
  const [stats, setStats] = useState({
    totalImpressions: 0,
    totalClicks: 0,
    totalConversions: 0,
    totalRevenue: 0
  });

  const mergedConfig = { ...defaultConfig, ...config };

  const generateEvent = useCallback((): SimulationEvent => {
    const eventTypes: SimulationEvent['type'][] = ['impression', 'click', 'conversion', 'attribution', 'earning'];
    const weights = [0.6, 0.2, 0.1, 0.05, 0.05]; // Weighted probability
    
    // Weighted random selection
    const random = Math.random();
    let cumulativeWeight = 0;
    let selectedType: SimulationEvent['type'] = 'impression';
    
    for (let i = 0; i < eventTypes.length; i++) {
      cumulativeWeight += weights[i];
      if (random <= cumulativeWeight) {
        selectedType = eventTypes[i];
        break;
      }
    }

    const campaign = mergedConfig.campaigns[Math.floor(Math.random() * mergedConfig.campaigns.length)];
    const asset = mergedConfig.assets[Math.floor(Math.random() * mergedConfig.assets.length)];
    const dsp = mergedConfig.dsps[Math.floor(Math.random() * mergedConfig.dsps.length)];
    const location = mergedConfig.locations[Math.floor(Math.random() * mergedConfig.locations.length)];
    const device = mergedConfig.devices[Math.floor(Math.random() * mergedConfig.devices.length)];

    let value = 0;
    switch (selectedType) {
      case 'impression':
        value = 0.001 + Math.random() * 0.002; // $0.001 - $0.003
        break;
      case 'click':
        value = 0.05 + Math.random() * 0.15; // $0.05 - $0.20
        break;
      case 'conversion':
        value = 10 + Math.random() * 90; // $10 - $100
        break;
      case 'attribution':
        value = 0.1 + Math.random() * 0.4; // $0.10 - $0.50
        break;
      case 'earning':
        value = 0.02 + Math.random() * 0.08; // $0.02 - $0.10
        break;
    }

    return {
      id: `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      type: selectedType,
      timestamp: Date.now(),
      data: {
        campaignId: `campaign-${Math.floor(Math.random() * 1000)}`,
        campaignName: campaign,
        assetId: `asset-${Math.floor(Math.random() * 100)}`,
        assetName: asset,
        value: Number(value.toFixed(3)),
        dsp,
        location,
        device
      }
    };
  }, [mergedConfig]);

  useEffect(() => {
    if (!isRunning) return;

    const interval = setInterval(() => {
      const newEvent = generateEvent();
      
      setEvents(prev => {
        // Keep only last 100 events
        const updated = [newEvent, ...prev].slice(0, 100);
        return updated;
      });

      // Update stats
      setStats(prev => {
        const updated = { ...prev };
        switch (newEvent.type) {
          case 'impression':
            updated.totalImpressions++;
            break;
          case 'click':
            updated.totalClicks++;
            break;
          case 'conversion':
            updated.totalConversions++;
            break;
        }
        updated.totalRevenue += newEvent.data.value || 0;
        return updated;
      });
    }, 1000 / mergedConfig.eventsPerSecond);

    return () => clearInterval(interval);
  }, [isRunning, generateEvent, mergedConfig.eventsPerSecond]);

  const pause = () => setIsRunning(false);
  const resume = () => setIsRunning(true);
  const clear = () => {
    setEvents([]);
    setStats({
      totalImpressions: 0,
      totalClicks: 0,
      totalConversions: 0,
      totalRevenue: 0
    });
  };

  return {
    events,
    stats,
    isRunning,
    pause,
    resume,
    clear
  };
}