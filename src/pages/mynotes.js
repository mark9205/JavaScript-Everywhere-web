import React, { useEffect } from 'react';
import { GET_MY_NOTES } from '../gql/query';
import { useQuery, gql } from '@apollo/client';
import Notefeed from '../components/NoteFeed';

const Mynotes = () => {
    useEffect(() => {
        //обновляем заголовок документа
        document.title = 'My notes - notedly';
    });

    const { loading, error, data } = useQuery(GET_MY_NOTES);
    //если данные грузятся, сообщим о загрузке
    if (loading) return <p>loading...</p>;
    //если произошел сбой загр-ки, сообщим об ош-ке
    if (error) return <p>Note not found!</p>;
    //если данные загр-сь успешно и содержат заметки, отобр-м их в UI
    //если данные загр-сь успешно но заметок нет - No notes yet
    if (data.me.notes.length !== 0) {
        return <Notefeed notes={data.me.notes} />;
    } else {
        return <p>No notes yet</p>;
    }
};

export default Mynotes;
