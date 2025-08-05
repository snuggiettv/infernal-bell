// * /components/StatSummary.tsx * //
import React from 'react';
import { formatStatName } from '../utils/formatStatName';
import { formatStatDisplay } from '../utils/formatStatDisplay';

interface StatSummaryProps {
  statTotals: Record<string, number>;
}

const StatSummary: React.FC<StatSummaryProps> = ({ statTotals }) => {
  return (
    <div style={{
      position: 'absolute',
      bottom: 140,
      right: 20,
      backgroundColor: '#000',
      color: '#fff',
      padding: '10px 14px',
      borderRadius: 8,
      zIndex: 10,
      fontSize: 14,
      border: '2px solid #800080',
      boxShadow: '0 0 10px #800080',
      minWidth: 220,
      lineHeight: 1.6,
      fontFamily: 'monospace',
    }}>
      <div style={{ fontWeight: 'bold', fontSize: 22, marginBottom: 6 }}>
        Stat Summary
      </div>
      <div style={{ maxHeight: 280, overflowY: 'auto' }}>
        {Object.entries(statTotals).map(([stat, val], index) => (
            <div key={stat} 
              style={{ 
                backgroundColor: index % 2 === 0 ? '#15101d' : '#1d1524', 
                padding: '4px 6px', 
                borderRadius: 4 
              }} 
            >
            {formatStatName(stat)}:{' '}
                {formatStatDisplay(
                  val, 
                    stat.toLowerCase().includes('resistance') || 
                    stat.toLowerCase().includes('speed') || 
                    stat.toLowerCase().includes('gain'), 
                  val < 0
                )}
          </div>
        ))}
      </div>
      <div style={{ marginTop: 8, fontSize: 13, color: '#ccc' }}>
        Left click to increase, right click to decrease rank.
      </div>
    </div>
  );
};

export default StatSummary;
