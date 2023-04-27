'use client';
import React, { useEffect, useState } from 'react';

const Header = ({ styles, fetchGlobalData, user, setUser }) => {
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);

  const restoreData = async () => {
    setLoading(true);
    await fetch('/api');
    fetchGlobalData();
    setLoading(false);
  };

  const fechData = async (id) => {
    const userToLogin = await (
      await fetch('/api/login', {
        method: 'POST',
        body: JSON.stringify({ password: '123456-' + id, userId: id }),
      })
    ).json();
    window.localStorage.setItem('token', userToLogin.token);
    setUser(id);
  };

  useEffect(() => {
    fechData(1);
  }, []);

  const goLogin = () => {
    setUser(0);
    const [prefix, userId] = input.split('-');
    if (!Number.isNaN(userId) && prefix === '123456') return fechData(+userId);
    setInput('Login invalido');
  };

  const deleteAll = async () => {
    setUser(0);
    const token = window.localStorage.getItem('token');
    await (
      await fetch(`/api/posts/${user}`, {
        method: 'DELETE',
        headers: {
          authorization: token,
        },
      })
    ).json();
    fetchGlobalData();
  };

  if (loading) return <div>Carregando...</div>;

  return (
    <header className={styles.container}>
      <h1>{user === 0 ? 'Go Login' : `Logado com User ${user}`}</h1>
      <form className={styles['search-form']}>
        <div>
          <input
            className={styles['search-input']}
            type='text'
            placeholder='Digite: 123456-IdUser'
            onChange={({ target: { value } }) => setInput(value)}
            onClick={() => setInput('')}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                e.preventDefault();
                goLogin();
              }
            }}
            value={input}
          />
          <button
            type='button'
            className={styles['search-button']}
            onClick={goLogin}
          >
            Logar
          </button>
        </div>
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-around',
            width: '100%',
            padding: '10px',
          }}
        >
          <button
            type='button'
            className={styles['search-button']}
            onClick={restoreData}
          >
            Restaurar
          </button>
          {user !== 0 && (
            <button
              type='button'
              className={styles['search-button']}
              onClick={deleteAll}
            >
              Delete All
            </button>
          )}
        </div>
      </form>
    </header>
  );
};

export default Header;
