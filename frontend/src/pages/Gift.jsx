import { useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { tg } from '../tg';
import AmountPicker from '../components/AmountPicker';
import UsernameDisplay from '../components/UsernameDisplay';
import { gift } from '../api';

export default function Gift() {
  const [amount, setAmount] = useState(0);
  const navigate = useNavigate();
  const [params] = useSearchParams();
  const toId = params.get('user_id');

  function confirm() {
    const fromId = tg.initDataUnsafe?.user?.id;
    if (!fromId || !toId || amount < 1) return;
    gift(fromId, parseInt(toId, 10), amount).then(res => {
      if (res.ok) navigate('/success');
      else alert(res.error);
    });
  }

  return (
    <div className="container">
      <UsernameDisplay username={toId} />
      <AmountPicker onSelect={setAmount} />
      <button className="btn" onClick={confirm}>Подарить</button>
    </div>
  );
}
