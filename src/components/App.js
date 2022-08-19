import '../css/App.css';
import { useState, useEffect } from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import * as BooksAPI from '../utils/BooksAPI';
import SearchPage from './SearchPage';
import Bookshelf from './Bookshelf';

function App() {
    const [books, setBooks] = useState([]);

    const changeShelf = (book) => {
        return function (e) {
            const isBookInBooks = books.find((item) => item.id === book.id);

            if (isBookInBooks) {
                setBooks((books) =>
                    books.map((item) => {
                        if (item.id === book.id) {
                            BooksAPI.update(item, e.target.value);
                            return { ...item, shelf: e.target.value };
                        }
                        return item;
                    })
                );
            } else {
                book.shelf = e.target.value;
                BooksAPI.update(book, e.target.value);
                setBooks([...books, book]);
            }
        };
    };

    useEffect(() => {
        const getContacts = async () => {
            const res = await BooksAPI.getAll();
            setBooks(res);
        };
        getContacts();
    }, []);

    return (
        <Routes>
            <Route
                exact
                path='/'
                element={
                    <div className='app'>
                        <div className='list-books'>
                            <div className='list-books-title'>
                                <h1>My Reads</h1>
                            </div>
                            <div className='list-books-content'>
                                <div>
                                    <Bookshelf
                                        shelfName={[
                                            'Currently Reading',
                                            'currentlyReading',
                                        ]}
                                        books={books}
                                        onChangeShelf={changeShelf}
                                    />
                                    <Bookshelf
                                        shelfName={[
                                            'Want to Read',
                                            'wantToRead',
                                        ]}
                                        books={books}
                                        onChangeShelf={changeShelf}
                                    />
                                    <Bookshelf
                                        shelfName={['Read', 'read']}
                                        books={books}
                                        onChangeShelf={changeShelf}
                                    />
                                </div>
                            </div>
                            <Link className='open-search' to='/search'>
                                <span>Add a book</span>
                            </Link>
                        </div>
                    </div>
                }
            />
            <Route
                exact
                path='/search'
                element={
                    <SearchPage books={books} onChangeShelf={changeShelf} />
                }
            />
        </Routes>
    );
}

export default App;
