// * /components/TooltipCard.tsx * //
import React from 'react';


interface TooltipData {
  id: string;
  label: string;
  rank: number;
  maxRank: number;
  x: number;
  y: number;
  icon: string;
  statKey: string;
  value: number;
  isPercent: boolean;
  isNegative: boolean;
  tooltipExtra?: string;
}

const TooltipCard: React.FC<{ tooltip: TooltipData }> = ({ tooltip }) => {
  const { label, rank, maxRank, x, y, icon, value, isPercent, isNegative } = tooltip;

  const formatted = (val: number): string => {
    const symbol = isNegative && val > 0 ? '-' : val > 0 ? '+' : '';
    const number = isPercent ? `${(val * 100).toFixed(1)}%` : `${val}`;
    return `${symbol}${number}`;
  };

  const currentVal = rank * value;
  const nextVal = (rank + 1 <= maxRank) ? (rank + 1) * value : currentVal;

  return (
    <div
      style={{
        position: 'absolute',
        left: x,
        top: y,
        backgroundColor: '#0b0b0f',
        color: '#e0d8c2',
        padding: 20,
        border: '1px solid #3a2a40',
        borderRadius: 12,
        width: 260,
        zIndex: 1000,
        fontFamily: 'Georgia, serif',
        boxShadow: '0 0 6px #2e103a',
      }}
    >
      <div
        style={{
          fontSize: 22,
          fontWeight: 'bold',
          marginBottom: 6,
          textAlign: 'center',
          borderBottom: '1px solid #444',
          paddingBottom: 4,
        }}
      >
        {label}
      </div>

      <div style={{ textAlign: 'center', fontSize: 20, color: '#aaa', marginBottom: 16 }}>
        ({rank} / {maxRank})
      </div>

      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <div
          style={{
            width: 64,
            height: 64,
            backgroundColor: '#111',
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 0 6px #332244',
            marginBottom: 16,
          }}
        >
          <img src={`${import.meta.env.BASE_URL}/components/icons/${icon}`} alt={label} style={{ width: 110, height: 110 }} />
        </div>
      </div>

      <div
        style={{
          background: '#1a151f',
          padding: 10,
          borderRadius: 6,
          textAlign: 'center',
          fontSize: 18,
          border: '1px solid #333',
          marginBottom: 6,
        }}
      >
        <div>Current: {formatted(currentVal)}</div>
        {rank < maxRank && (
          <div style={{ marginTop: 8 }}>Next: {formatted(nextVal)}</div>
        )}
      </div>

      {tooltip.tooltipExtra && (
        <div style={{ marginTop: 10, textAlign: 'center', fontSize: 12, fontStyle: 'italic', color: '#999' }}>
          {tooltip.tooltipExtra}
        </div>
      )}
    </div>
  );
};

export default TooltipCard;
