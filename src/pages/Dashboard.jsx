import { useEffect, useState } from 'react';
import './Dashboard.css';

export default function Dashboard() {
  const [livros, setLivros] = useState([]);
  const [error, setError] = useState('');

  const fetchLivros = async () => {
    try {
      const token = localStorage.getItem('token');
      const res = await fetch('https://library-organizer.vercel.app/livros', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!res.ok) throw new Error('Token inválido ou expirado');
      const data = await res.json();
      setLivros(data);
    } catch (err) {
      setError(err.message);
    }
  };

  useEffect(() => {
    fetchLivros();
  }, []);

  return (
    <div className="dashboard">
      <h1>📚 Minha Biblioteca</h1>
      {error && <p className="error">{error}</p>}
      {!error && (
        <div className="livros-list">
          {livros.map((livro) => (
            <div className="livro-card" key={livro._id}>
              <h3>{livro.titulo}</h3>
              <p><strong>Autor:</strong> {livro.autor}</p>
              <p><strong>Gênero:</strong> {livro.genero || 'N/A'}</p>
              <p><strong>Lido:</strong> {livro.lido ? 'Sim' : 'Não'}</p>
              <p><strong>Local:</strong> {livro.local || 'Não informado'}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
