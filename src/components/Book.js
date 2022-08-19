import BookShelfChanger from './BookShelfChanger';

const Book = ({ book, onChangeShelf, books }) => {
    return (
        <div className='book'>
            <div className='book-top'>
                {book.imageLinks !== undefined ? (
                    <div
                        className='book-cover'
                        style={{
                            width: 128,
                            height: 193,
                            backgroundImage: `url("${book.imageLinks.thumbnail}")`,
                        }}></div>
                ) : (
                    ''
                )}

                <BookShelfChanger
                    book={book}
                    onChangeShelf={onChangeShelf}
                    books={books}
                />
            </div>
            <div className='book-title'>{book.title}</div>
            <div className='book-authors'>
                <ul style={{ listStyle: 'none', padding: 0 }}>
                    {book.authors
                        ? book.authors.map((autor) => {
                              return (
                                  <li key={autor} style={{ padding: 0 }}>
                                      {autor}
                                  </li>
                              );
                          })
                        : []}
                </ul>
            </div>
        </div>
    );
};

export default Book;
