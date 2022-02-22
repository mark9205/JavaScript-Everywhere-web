import React from 'react';
import { useMutation, useQuery } from '@apollo/client';
import NoteForm from '../components/NoteForm';
import { GET_NOTE, GET_ME } from '../gql/query';
import { EDIT_NOTE } from '../gql/mutation';

const EditNote = props => {
    //сохран-м id из url в виде переменной
    const id = props.match.params.id;
    //запраш-м хук, передав знач-е id в кач-ве переменной
    const { loading, error, data } = useQuery(GET_NOTE, { variables: { id } });
    const { data: userdata } = useQuery(GET_ME);
    //мутация на обновление заметки
    const [editNote] = useMutation(EDIT_NOTE, {
        variables: {
            id
        },
        onCompleted: () => {
            props.history.push(`/note/${id}`);
        }
    });
    //если данные грузятся, сообщим о загрузке
    if (loading) return <p>loading...</p>;
    //если произошел сбой загр-ки, сообщим об ош-ке
    if (error) return <p>Note not found!</p>;
    //если текущий польз-ль - не автор заметки - сообщаем об этом
    if (userdata.me.id !== data.note.author.id) {
        return <p>You dont have access to edit this note</p>;
    }
    //если данные загр-сь успешно, отобр-м их в UI
    return <NoteForm content={data.note.content} action={editNote}/>;
};

export default EditNote;
