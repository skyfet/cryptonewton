import { useState } from 'react';

const PRESETS = [50, 150, 250, 500, 1000, 2500];

export default function AmountPicker({ onSelect }) {
  const [custom, setCustom] = useState('');
  const [selected, setSelected] = useState(null);

  function choose(amount) {
    setSelected(amount);
    setCustom('');
    onSelect(amount);
  }

  return (
    <div>
      <div className="amounts">
        {PRESETS.map(a => (
          <div
            key={a}
            className={`amount ${selected === a ? 'selected' : ''}`}
            onClick={() => choose(a)}
          >
            {a}
          </div>
        ))}
        <div
          className={`amount ${selected === 'custom' ? 'selected' : ''}`}
          onClick={() => choose('custom')}
        >
          Ввести
        </div>
      </div>
      {selected === 'custom' && (
        <input
          type="number"
          value={custom}
          onChange={e => {
            setCustom(e.target.value);
            onSelect(parseInt(e.target.value, 10) || 0);
          }}
          min="1"
          max="250000"
        />
      )}
    </div>
  );
}
