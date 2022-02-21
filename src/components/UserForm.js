import React, { useState } from 'react';
import styled from 'styled-components';
import Button from './Button';

const Wrapper = styled.div`
    border: 1px solid #fff;
    max-width: 500px;
    padding: 1em;
    margin: 0 auto;
`;
const Form = styled.form`
    label,
    input {
        display: block;
        line-height: 2em;
    }
    input {
        width: 100%;
        margin-bottom: 1em;
    }
`;

const UserForm = props => {
    //устанавл-м сост-е формы по умолч-ю
    const [values, setValues] = useState();

    //обновл-м сост-е при вводе польз-м данных
    const onChange = event => {
        setValues({
            ...values,
            [event.target.name]: event.target.value
        });
    };

    return (
        <Wrapper>
            {/*отображаем соотв-й заголовок формы*/}
            {props.formType === 'signUp' ? <h2>Sign Up</h2> : <h2>Sign In</h2>}
            {/*когда польз-ль отправляет форму передаем ее данные в мутацию*/}
            <Form
                onSubmit={event => {
                    event.preventDefault();
                    props.action({
                        variables: {
                            ...values
                        }
                    });
                }}
            >
                {props.formType === 'signUp' && (
                    <React.Fragment>
                        <label htmlFor="username:">Username</label>
                        <input
                            type="text"
                            required
                            id="username"
                            name="username"
                            placeholder="username"
                            onChange={onChange}
                        />
                        <label htmlFor="email:">Email</label>
                        <input
                            type="email"
                            required
                            id="email"
                            name="email"
                            placeholder="email"
                            onChange={onChange}
                        />
                        <label htmlFor="password:">Password</label>
                        <input
                            type="password"
                            required
                            id="password"
                            name="password"
                            placeholder="password"
                            onChange={onChange}
                        />
                        <Button type="submit">Submit</Button>
                    </React.Fragment>
                )}
                {props.formType === 'signIn' && (
                    <React.Fragment>
                        <label htmlFor="email:">Email</label>
                        <input
                            type="email"
                            required
                            id="email"
                            name="email"
                            placeholder="email"
                            onChange={onChange}
                        />
                        <label htmlFor="password:">Password</label>
                        <input
                            type="password"
                            required
                            id="password"
                            name="password"
                            placeholder="password"
                            onChange={onChange}
                        />
                        <Button type="submit">Submit</Button>
                    </React.Fragment>
                )}
            </Form>
        </Wrapper>
    );
};

export default UserForm;
