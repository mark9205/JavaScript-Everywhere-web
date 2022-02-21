import React, { useState } from 'react';
import styled from 'styled-components';
import Button from './Button';

const Wrapper = styled.div`
    height: 100%;
`;
const Form = styled.form`
    height: 100%;
`;

const TextArea = styled.textarea`
    height: 90%;
    width: 100%;
`;

const NoteForm = props => {
    //устанавл-м сост-е формы по умолч-ю
    const [value, setValue] = useState({ content: props.content || '' });

    //обновл-м это сост-е при вводе польз-м данных
    const onChange = event => {
        setValue({
            ...value,
            [event.target.name]: event.target.value
        });
    };

    return (
        <Wrapper>
            <Form
                onSubmit={event => {
                    event.preventDefault();
                    props.action({
                        variables: {
                            ...value
                        }
                    });
                }}
            >
                <TextArea
                    required
                    type="text"
                    name="content"
                    placeholder="Note Content"
                    value={value.content}
                    onChange={onChange}
                />
                {/*когда польз-ль отправляет форму передаем ее данные в мутацию*/}
                <Button type="submit">save note</Button>
            </Form>
        </Wrapper>
    );
};

export default NoteForm;
