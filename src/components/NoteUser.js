import React from 'react';
import { useQuery } from '@apollo/client';
import { Link } from 'react-router-dom';
import { GET_ME } from '../gql/query';

const NoteUser = props => {
    const { loading, error, data } = useQuery(GET_ME);
    if (loading) return <p>loading...</p>;
    if (error) return <p>error !</p>;

    return (
        <React.Fragment>
            Favorites:{props.note.favoriteCount}
            <br />
            {data.me.id === props.note.author.id && (
                <React.Fragment>
                    <Link to={`/edit/${props.note.id}`}>Edit</Link>;
                </React.Fragment>
            )}
        </React.Fragment>
    );
};

export default NoteUser;
