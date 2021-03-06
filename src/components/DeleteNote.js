import React from "react";
import { useMutation } from "@apollo/client";
import { withRouter } from "react-router-dom";
import { DELETE_NOTE } from "../gql/mutation";
import { GET_MY_NOTES, GET_NOTES } from "../gql/query";
import ButtonAsLink from "./ButtonAsLink";

const DeleteNote = props => {
    const [deleteNote] = useMutation(DELETE_NOTE, {
        variables: {
            id: props.noteId
        },
        //повторно получаем запросы списка заметок чтобы обновить кэш
        refetchQueries: [{query: GET_MY_NOTES, GET_NOTES}],
        onCompleted: data => {
            props.history.push('/mynotes')
        }
    })
    return (
        <ButtonAsLink onClick={deleteNote}>
            Delete Note
        </ButtonAsLink>
    );
}

export default withRouter(DeleteNote);
