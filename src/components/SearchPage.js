import { Link } from 'react-router-dom';
import { useState } from 'react';
import Book from './Book';
import * as BooksAPI from '../utils/BooksAPI';

const SearchPage = ({ books, onChangeShelf }) => {
    const [searching, setSearching] = useState(false);
    const [message, setMessage] = useState(null);
    const [query, setQuery] = useState('');
    const [searchResults, setSearchResults] = useState([]);

    const searchMovies = async (e) => {
        e.preventDefault();
        setQuery(e.target.value);
        setSearching(true);

        try {
            const response = await BooksAPI.search(query);
            if (response.error === 'empty query') {
                setSearchResults(['']);
                setSearching(false);
            }
            setMessage(null);
            setSearchResults(response);
            setSearching(false);
        } catch (err) {
            setMessage('An unexpected error occured.');
            setSearching(false);
        }
    };
    return (
        <div className='search-books'>
            <div className='search-books-bar'>
                <Link className='close-search' to='/'>
                    Close
                </Link>
                <div className='search-books-input-wrapper'>
                    <input
                        type='text'
                        placeholder='Search by title, author, or ISBN'
                        value={query}
                        onChange={searchMovies}
                    />
                </div>
            </div>
            <div className='search-books-results'>
                <ol className='books-grid'>
                    {searching && !message ? (
                        <span>loading...</span>
                    ) : message ? (
                        <div> {message}</div>
                    ) : searchResults.error !== 'empty query' ? (
                        searchResults.map((book) => {
                            return (
                                <li key={book.id}>
                                    <Book
                                        book={book}
                                        onChangeShelf={onChangeShelf}
                                        books={books}
                                    />
                                </li>
                            );
                        })
                    ) : (
                        <span> Nothing matchs your query</span>
                    )}
                </ol>
            </div>
        </div>
    );
};

export default SearchPage;
