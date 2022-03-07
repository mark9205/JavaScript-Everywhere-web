import React from 'react';
import ReactMarkdown from 'react-markdown';
import { format } from 'date-fns';
import styled from 'styled-components';
import { useQuery } from '@apollo/client';
import NoteUser from './NoteUser';
import { IS_LOGGED_IN } from '../gql/query';

const StyleNote = styled.article`
    max-width: 800px;
    margin: 0 auto;
`;

const MetaData = styled.div`
    @media (min-width: 500px) {
        display: flex;
        align-items: top;
    }
`;
const MetaInfo = styled.div`
    padding-right: 1em;
`;

const UserActions = styled.div`
    margin-left: auto;
`;

//разметка для отдельной заметки
const Note = ({ note }) => {
    const { loading, error, data } = useQuery(IS_LOGGED_IN);
    if (loading) return <p>loading...</p>;
    if (error) return <p>error !</p>;

    return (
        <StyleNote>
            <MetaData>
                <MetaInfo>
                    <img
                        src={note.author.avatar}
                        alt={`${note.author.username} avatar`}
                        height="50px"
                    />
                </MetaInfo>
                <MetaInfo>
                    <em>by </em>
                    {note.author.username} <br />
                    {format(note.createdAt, 'MMM Do YYYY')}
                    <br />
                    {note.content}
                </MetaInfo>
                {data.isLoggedIn 
                ? (
                    <UserActions>
                        <NoteUser note={note}/>
                    </UserActions>
                ) : (
                    <UserActions>
                        <em>Favorites:</em> {note.favoriteCount}
                    </UserActions>
                )}
            </MetaData>
            <ReactMarkdown source={note.content} />
        </StyleNote>
    );
};

export default Note;
