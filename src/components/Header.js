import React from 'react';
import logo from './../img/logo.svg';
import styled from 'styled-components';
import { useQuery, gql } from '@apollo/client';
import { Link, withRouter } from 'react-router-dom';
import ButtonAsLink from './ButtonAsLink';
import { GET_ME, IS_LOGGED_IN } from '../gql/query';

const HeaderBar = styled.header`
    width: 100%;
    padding: 0.5em 1em;
    display: flex;
    height: 64px;
    position: fixed;
    align-items: center;
    border-color: #fff;
    box-shadow: 0 0 5px rgba(0, 0, 0, 0.25);
    z-index: 1;
`;
const LogoText = styled.h1`
    margin: 0;
    padding: 0;
    display: inline;
`;
const UserState = styled.div`
    margin-left: auto;
`;

const Header = props => {
    //хук запроса для проверки сост-я авториз-и польз-ля
    const { data, client } = useQuery(IS_LOGGED_IN);

    return (
        <HeaderBar>
            <img src={logo} alt="Notedly logo" height="40" />
            <LogoText>Notedly</LogoText>
            {/*если авторизован - покажем logout, если нет - signin/signup*/}
            <UserState>
                {data.isLoggedIn
                    ? <ButtonAsLink onClick={()=> {
                        //удаляем токен
                        localStorage.removeItem('token')
                        //очищаем кэш прилож-я
                        client.resetStore()
                        //обновялем локальное сост-е
                        client.writeData({data: {isLoggedIn: false}})
                        //перенапр-м польз-ля на дом-ю страницу
                        props.history.push('/');
                    }}>Log Out</ButtonAsLink>
                    : <p>
                        (<Link to={'/signin'}>Sign In</Link> or{' '}
                         <Link to={'/signup'}>Sign Up</Link>
                        )
                    </p>
                }
            </UserState>
        </HeaderBar>
    );
};

export default withRouter(Header) ;
