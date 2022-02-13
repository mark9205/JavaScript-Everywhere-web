import React from 'react';
//импорт-м завис-ти graph-ql
import { useQuery, gql } from '@apollo/client';
//импорт-м комп-т Note
import Note from '../components/Note';

//напишем gql запрос note, принимающий переменную id
const GET_NOTE = gql`
    query note($id: ID!) {
        note(id: $id) {
            id
            createdAt
            content
            favoriteCount
            author {
                username
                id
                avatar
            }
        }
    }
`;

const NotePage = props => {
    //сохран-м id из url в виду переменной
    const id = props.match.params.id;
    //запраш-м хук, передав знач-е id в кач-ве переменной
    const { loading, error, data } = useQuery(GET_NOTE, { variables: { id } });
    //если данные грузятся, сообщим о загрузке
    if (loading) return <p>loading...</p>;
    //если произошел сбой загр-ки, сообщим об ош-ке
    if (error) return <p>Note not found!</p>;
    //если данные загр-сь успешно, отобр-м их в UI
    return <Note note={data.note} />;
};

export default NotePage;
