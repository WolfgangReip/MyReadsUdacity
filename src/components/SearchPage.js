import { Link } from 'react-router-dom';
import { useState } from 'react';
import Book from './Book';

const SearchPage = ({ books, onChangeShelf }) => {
    const [query, setQuery] = useState('');
    console.log(books);
    const updateQuery = (query) => {
        setQuery(query.trim());
    };

    const author = (book) => {
        const auth = book.authors.filter((a) =>
            a.toLowerCase().includes(query.toLowerCase())
        );
        if (auth.length > 0) {
            return true;
        } else {
            return false;
        }
    };

    const showingContacts =
        query === ''
            ? []
            : books.filter(
                  (book) =>
                      book.title.toLowerCase().includes(query.toLowerCase()) ||
                      book.industryIdentifiers[0].identifier.includes(query) ||
                      book.industryIdentifiers[1].identifier.includes(query) ||
                      author(book)
              );

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
                        onChange={(event) => updateQuery(event.target.value)}
                    />
                </div>
            </div>
            <div className='search-books-results'>
                <ol className='books-grid'>
                    {showingContacts.map((book) => {
                        return (
                            <li key={book.id}>
                                <Book
                                    book={book}
                                    onChangeShelf={onChangeShelf}
                                />
                            </li>
                        );
                    })}
                </ol>
            </div>
        </div>
    );
};

export default SearchPage;
