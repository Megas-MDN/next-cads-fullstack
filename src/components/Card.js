'use client';
import React, { useState } from 'react';

const Card = ({ styles, card, user, fechData }) => {
  const [edit, setEdit] = useState(false);
  const [input, setInput] = useState(card.title || '');
  const [text, setText] = useState(card.body || '');
  const [loading, setLoging] = useState(false);

  const handleEdit = async () => {
    const token = window.localStorage.getItem('token');

    if (edit) {
      await fetch(
        `/api/posts/${user}/${card.id}`,
        {
          method: 'PUT',
          body: JSON.stringify({ title: input, body: text }),
          headers: {
            authorization: token,
          },
        },
        { cache: 'no-store' }
      );
      setEdit(false);
      fechData();
    } else {
      setEdit(true);
    }
  };
  const handleDelete = async () => {
    const token = window.localStorage.getItem('token');
    if (edit) {
      setInput(card.title);
      setText(card.body);
      setEdit(false);
    } else {
      await fetch(
        `/api/posts/${user}/${card.id}`,
        {
          method: 'DELETE',
          headers: {
            authorization: token,
          },
        },
        { cache: 'no-store' }
      );
      setLoging(true);
      fechData();
    }
  };

  if (loading) return null;

  return (
    <div key={card.id} className={styles.card}>
      {+user === +card.userId && (
        <>
          <button
            type='button'
            className={`${styles.btnEds} ${styles['search-button']}`}
            onClick={handleEdit}
          >
            {edit ? 'Confirmar' : 'Editar'}
          </button>
          <button
            type='button'
            className={`${styles.btnEds} ${styles['search-button']} ${
              edit ? styles.editMode : ''
            }`}
            onClick={handleDelete}
          >
            {edit ? 'Cancelar' : 'Excluir'}
          </button>
        </>
      )}
      <h3>{`User ${card.userId}`}</h3>
      <h4>{`PostId ${card.id}`}</h4>
      <input
        type='text'
        disabled={!edit}
        value={input}
        onChange={({ target: { value } }) => setInput(value)}
      />
      <textarea
        type='text'
        disabled={!edit}
        value={text}
        onChange={({ target: { value } }) => setText(value)}
      />
    </div>
  );
};

export default Card;
