import { useNavigate } from 'react-router-dom';

export default function Welcome() {
  const navigate = useNavigate();
  return (
    <div className="container">
      <button className="btn" onClick={() => navigate('/buy')}>⭐ Купить звёзды</button>
    </div>
  );
}
