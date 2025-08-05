// * /components/TreeSelector.tsx * //
import React from 'react';

interface TreeSelectorProps {
  selected: string;
  onChange: (value: string) => void;
}

const options = [
  {
    label: 'Infernal Bell',
    url: 'https://raw.githubusercontent.com/snuggiettv/hellclock-data-export/refs/heads/main/data/Infernal%20Bell.json',
  },
  {
    label: 'Oblivion Bell',
    url: 'https://raw.githubusercontent.com/snuggiettv/hellclock-data-export/refs/heads/main/data/Oblivion%20Bell.json',
  },
];

const TreeSelector: React.FC<TreeSelectorProps> = ({ selected, onChange }) => {
  return (
    <div style={{
      position: 'absolute',
      top: 20,
      left: 20,
      zIndex: 20,
      backgroundColor: '#0b0b0f',
      color: '#fff',
      padding: 10,
      borderRadius: 6,
      border: '1px solid #800080'
    }}>
      <label htmlFor="treeSelect" style={{ fontSize: 14, fontWeight: 'bold' }}>Select Tree:</label>
      <select
        id="treeSelect"
        value={selected}
        onChange={(e) => onChange(e.target.value)}
        style={{ marginTop: 6, width: '100%', background: '#222', color: '#fff' }}
      >
        {options.map((opt) => (
          <option key={opt.label} value={opt.url}>
            {opt.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default TreeSelector;
