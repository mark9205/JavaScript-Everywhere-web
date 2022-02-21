import React, { useEffect } from 'react';
import { useMutation, gql } from '@apollo/client';
import NoteForm from '../components/NoteForm';
import { GET_NOTES } from '../gql/query';

//gql-запрос newNote
const NEW_NOTE = gql`
    mutation newNote($content: String!) {
        newNote(content: $content) {
            id
            content
            createdAt
            favoriteCount
            favoritedBy {
                id
                username
            }
            author {
                username
                id
            }
        }
    }
`;

const NewNote = (props) => {
    useEffect(() => {
        // обновл-м заголовок док-та
        document.title = 'New Note - Notedly';
    });

    const [data, { loading, error }] = useMutation(NEW_NOTE, {
        //повторно получаем запрос GET_NOTES чтобы обновить кэш
        refetchQueries: [{query: GET_NOTES}],
        onCompleted: data => {
            //после заверш-я, перенапр-м польз-ля на страницу заметки
            props.history.push(`note/${data.newNote.id}`);
        }
    });

    return (
        <React.Fragment>
            {loading && <p>loading...</p>}
            {error && <p>error saving the note</p>}
            <NoteForm action={data}/>
        </React.Fragment>
    )
};

export default NewNote;
