import Book from './Book';

const Bookshelf = ({ shelfName, books, onChangeShelf }) => {
    const [shelfTitle, shelf] = shelfName;

    return (
        <div className='bookshelf'>
            <h2 className='bookshelf-title'>{shelfTitle}</h2>
            <div className='bookshelf-books'>
                <ol className='books-grid'>
                    {books
                        .filter((book) => book.shelf === shelf)
                        .map((book) => {
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

export default Bookshelf;
