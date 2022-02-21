import React, { useEffect } from 'react';
import { useQuery, gql } from '@apollo/client';
import Notefeed from '../components/NoteFeed';
import { GET_MY_FAVORITES } from '../gql/query';

const Favorites = () => {
  useEffect(() => {
    //обновляем заголовок документа
    document.title = 'Favorites - notedly';
  });

  const { loading, error, data } = useQuery(GET_MY_FAVORITES);
    //если данные грузятся, сообщим о загрузке
    if (loading) return <p>loading...</p>;
    //если произошел сбой загр-ки, сообщим об ош-ке
    if (error) return `Error! ${error.message}`;
    //если данные загр-сь успешно и содержат заметки, отобр-м их в UI
    //если данные загр-сь успешно но заметок нет - No notes yet
    if (data.me.favorites.length !== 0) {
        return <Notefeed notes={data.me.favorites} />;
    } else {
        return <p>No Favorites yet</p>;
    }
};

export default Favorites;
