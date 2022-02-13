import React from 'react';
import { useQuery, gql } from '@apollo/client';
import Notefeed from '../components/NoteFeed';
import Button from '../components/Button';

//напишем gql запрос в виде переменной
const GET_NOTES = gql`
    query noteFeed($cursor: String) {
        noteFeed(cursor: $cursor) {
            cursor
            hasNextPage
            notes {
                id
                createdAt
                content
                favoriteCount
                author {
                    username
                    id
                    avatar
                }
            }
        }
    }
`;

const Home = () => {
    //хук запроса
    const { data, loading, error, fetchMore } = useQuery(GET_NOTES);
    //если данные грузятся, сообщим о загрузке
    if (loading) return <p>loading...</p>;
    //если произошел сбой загр-ки, сообщим об ош-ке
    if (error) return <p>error!</p>;
    //если данные загр-сь успешно, отобр-м их в UI
    return (
        <React.Fragment>
            <Notefeed notes={data.noteFeed.notes} />
            {data.noteFeed.hasNextPage && 
                //onClick вып-т запрос, передав в кач-ве переменной текущий
                //курсор (закладку последней загруженной заметки)
                <Button
                    onClick={() =>
                        fetchMore({
                            variables: {
                                cursor: data.noteFeed.cursor
                            },
                            updateQuery: (
                                previousQueryResult,
                                { fetchMoreResult }) => {
                                return {
                                    noteFeed: {
                                        cursor: fetchMoreResult.noteFeed.cursor,
                                        hasNextPage:
                                            fetchMoreResult.noteFeed.hasNextPage,
                                        //совмещаем новые рез-ты со старыми
                                        notes: [
                                            ...previousQueryResult.noteFeed.notes,
                                            ...fetchMoreResult.noteFeed.notes
                                        ],
                                        __typename: 'noteFeed'
                                    }
                                };
                            }
                        })
                    }
                >
                    Load More
                </Button>
            }
        </React.Fragment>
    );
};

export default Home;
