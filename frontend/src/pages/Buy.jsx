import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { tg } from '../tg';
import AmountPicker from '../components/AmountPicker';
import { purchase } from '../api';

export default function Buy() {
  const [amount, setAmount] = useState(0);
  const navigate = useNavigate();

  function confirm() {
    const userId = tg.initDataUnsafe?.user?.id;
    if (!userId || amount < 1) return;
    purchase(userId, amount).then(res => {
      if (res.ok) navigate('/success');
      else alert(res.error);
    });
  }

  return (
    <div className="container">
      <AmountPicker onSelect={setAmount} />
      <button className="btn" onClick={confirm}>Купить</button>
    </div>
  );
}
