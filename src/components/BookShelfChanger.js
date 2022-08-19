const BookShelfChanger = ({ book, onChangeShelf, books }) => {
    const isBookInBooks = books.find((item) => item.id === book.id);
    if (isBookInBooks) {
        book.shelf = isBookInBooks.shelf;
    }
    return (
        <div className='book-shelf-changer'>
            <select
                defaultValue={
                    book.shelf ? book.shelf : book ? (book.shelf = 'none') : ''
                }
                onChange={onChangeShelf(book)}>
                <option disabled>Move to...</option>
                <option value='currentlyReading'>Currently Reading</option>
                <option value='wantToRead'>Want to Read</option>
                <option value='read'>Read</option>
                <option value='none'>None</option>
            </select>
        </div>
    );
};
export default BookShelfChanger;
