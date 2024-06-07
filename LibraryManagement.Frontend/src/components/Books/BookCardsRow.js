import BookCard from "./BookCard";

const BookCardsRow = (props) => {
  const { books } = props;
  return (
    <div>
      <div>
        {books.map((book) => (
          <BookCard book={book} />
        ))}
      </div>
    </div>
  );
};
export default BookCardsRow;
