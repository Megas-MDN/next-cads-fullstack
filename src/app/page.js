'use client';
import { useEffect, useState } from 'react';
import styles from './page.module.css';
import Cards from '@/components/Cards';
import Header from '@/components/Header';

export default function Home() {
  const [cards, setCards] = useState([]);
  const [user, setUser] = useState(0);

  const fechData = async () => {
    const data = await (await fetch('/api/posts')).json();
    setCards(data);
  };

  useEffect(() => {
    fechData();
  }, []);

  return (
    <>
      <Header {...{ styles, fetchGlobalData: fechData, user, setUser }} />
      <Cards {...{ styles, cards, user, fechData }} />
    </>
  );
}
