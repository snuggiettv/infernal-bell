// * /components/SkillNode.tsx * //

import React, { useRef } from 'react';
import { Handle, Position } from 'reactflow';

interface SkillNodeProps {
  id: string;
  data: {
    label: string;
    icon: string;
    rank: number;
    maxRank: number;
    statKey: string;
    value: number;
    isPercent: boolean;
    isNegative: boolean;
    isLocked: boolean;
    onClick?: (id: string) => void;
    onRightClick?: (id: string) => void;
    onHover?: (tooltip: any) => void;
  };
}

export default function SkillNode({ id, data }: SkillNodeProps) {
  const ref = useRef<HTMLDivElement>(null);
  const { isLocked, rank, maxRank, value } = data;
  const isMaxed = rank >= maxRank;

  const showTooltip = (overrideRank = rank) => {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;

    const x = rect.right + 8;
    const y = rect.top;

    const safeRank = Math.min(overrideRank, maxRank);
    const currentValue = safeRank * value;
    const nextValue = safeRank < maxRank ? (safeRank + 1) * value : currentValue;

    data.onHover?.({
      id,
      label: data.label,
      rank: safeRank,
      maxRank,
      icon: data.icon,
      statKey: data.statKey,
      value: data.value,
      isPercent: data.isPercent,
      isNegative: data.isNegative,
      x,
      y,
    });
  };

  const handleClick = () => {
    const prevRank = rank;
    if (!isLocked && rank < maxRank) {
      data.onClick?.(id);
      if (prevRank === 0) {
        // Re-show tooltip after rank 0 → 1 change
        setTimeout(() => showTooltip(prevRank + 1), 0);
      }
    }
  };

  const handleRightClick = (e: React.MouseEvent) => {
    e.preventDefault();
    if (rank > 0) {
      data.onRightClick?.(id);
    }
  };

  const handleMouseEnter = () => showTooltip();
  const handleMouseLeave = () => data.onHover?.(null);

  const filter =
    isLocked ? 'brightness(0.6) grayscale(0.8)' :
    isMaxed ? 'brightness(1.2) contrast(1.2)' :
    'invert(5%) sepia(90%) saturate(100%) hue-rotate(270deg)';

  return (
    <div
      ref={ref}
      onClick={handleClick}
      onContextMenu={handleRightClick}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{
        width: 70,
        height: 70,
        borderRadius: '50%',
        border: '2px solid #888',
        backgroundColor: isLocked ? '#111' : '#222',
        color: '#fff',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
        cursor: isLocked ? 'not-allowed' : 'pointer'
      }}
    >
      <img
        src={`/components/icons/${data.icon}`}
        alt={data.label}
        style={{
          width: '100%',
          height: '100%',
          borderRadius: '50%',
          objectFit: 'cover',
          filter,
          border:
            isMaxed ? '2px solid white' :
            !isLocked ? '2px solid #d47aff' : '2px solid #555',
          boxShadow:
            isMaxed ? '0 0 6px white' :
            !isLocked ? '0 0 4px #800080' : 'none',
        }}
      />
      {isLocked && (
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
          borderRadius: '50%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: 22,
          fontWeight: 'bold',
          color: '#aaa',
          zIndex: 3,
          pointerEvents: 'none',
        }}>🔒</div>
      )}
      <div style={{
        position: 'absolute',
        bottom: -14,
        left: '50%',
        transform: 'translateX(-50%)',
        backgroundColor: '#191420',
        padding: '2px 6px',
        borderRadius: 4,
        fontSize: 10,
        border: '1px solid #800080',
        color: '#fff',
        whiteSpace: 'nowrap',
      }}>{rank} / {maxRank}</div>
      <Handle type="source" position={Position.Top} id="a" style={{ opacity: 0, top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }} />
      <Handle type="target" position={Position.Top} id="a" style={{ opacity: 0, top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }} />
    </div>
  );
}
