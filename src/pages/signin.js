import React, { useEffect } from 'react';
import { useMutation, useApolloClient, gql } from '@apollo/client';
import UserForm from '../components/UserForm';

const SIGNIN_USER = gql`
    mutation signIn($email: String!, $password: String!) {
        signIn(email: $email, password: $password)
    }
`;

const SignIn = props => {
    useEffect(() => {
        // обновл-м заголовок док-та
        document.title = 'Sign In - Notedly';
    });
    //Apollo client
    const client = useApolloClient();
    //добавляем хук мутации
    const [signIn, { loading, error }] = useMutation(SIGNIN_USER, {
        onCompleted: data => {
            //сохр-м JWT токен в localStorage
            localStorage.setItem('token', data.signIn);
            //обновл-м локальный кэш
            client.writeData({ data: { isLoggedIn: true } });
            //перенапр-м польз-ля на дом-ю страницу
            props.history.push('/');
        }
    });

    return (
        <React.Fragment>
            <UserForm action={signIn} formType="signIn" />
            {/*если данные загр-ся, отобр-м сообщ о загрузке*/}
            {loading && <p>loading...</p>}
            {/*если error, отобр-м сообщ об errore*/}
            {error && <p>sign In error!</p>}
        </React.Fragment>
    );
};

export default SignIn;
