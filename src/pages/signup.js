import React, { useEffect } from 'react';
import { useMutation, useApolloClient, gql } from '@apollo/client';
import UserForm from '../components/UserForm';

const SIGNUP_USER = gql`
    mutation signUp($email: String!, $username: String!, $password: String!) {
        signUp(email: $email, username: $username, password: $password)
    }
`;

const SignUp = props => {
    useEffect(() => {
        // обновл-м заголовок док-та
        document.title = 'Sign Up notedly';
    });
    //Apollo client
    const client = useApolloClient();
    //добавляем хук мутации
    const [signUp, { loading, error }] = useMutation(SIGNUP_USER, {
        onCompleted: data => {
            //сохр-м JWT в localStorage
            localStorage.setItem('token', data.signUp);
            //обновл-м локальный кэш
            client.writeData({ data: { isLoggedIn: true } });
            //перенапр-м польз-ля на дом-ю страницу
            props.history.push('/');
        }
    });

    return (
        <React.Fragment>
            <UserForm action={signUp} formType="signUp" />
            {/*если данные загр-ся, отобр-м сообщ о загрузке*/}
            {loading && <p>loading...</p>}
            {/*если error, отобр-м сообщ об errore*/}
            {error && <p>sign Up error!</p>}
        </React.Fragment>
    );
};

export default SignUp;
