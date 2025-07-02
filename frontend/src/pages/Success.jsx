import { Link } from 'react-router-dom';

export default function Success() {
  return (
    <div className="container">
      <p>🎉 Успешно</p>
      <Link to="/" className="btn">На главную</Link>
    </div>
  );
}
