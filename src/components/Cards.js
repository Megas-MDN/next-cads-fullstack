'use client';
import React, { useEffect, useState } from 'react';
import Card from './Card';

const Cards = ({ cards, styles, user, fechData }) => {
  const [objCards, setObjCards] = useState({});

  useEffect(() => {
    const obj = cards.reduce(
      (list, card) => ({
        ...list,
        [`card-${card.userId}`]: [
          ...(list[`card-${card.userId}`] || []),
          card,
        ] || [card],
      }),
      {}
    );
    setObjCards(obj);
  }, [cards]);

  if (cards.length === 0) return <div>Loading... </div>;

  return (
    <ul className={styles['repo-list']}>
      {Object.keys(objCards).length > 0 &&
        Object.keys(objCards).map((keyCard) => (
          <li key={keyCard} className={styles.listCarrossel}>
            {objCards[keyCard].map((card) => (
              <Card
                {...{ styles, card, user, fechData }}
                key={card.id + 'uplevel'}
              />
            ))}
          </li>
        ))}
    </ul>
  );
};

export default Cards;
