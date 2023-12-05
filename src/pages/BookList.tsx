import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { NavLink } from "react-router-dom";
import { toast } from "react-toastify";
import axios, { CancelTokenSource } from "axios";
import BookItem from "components/book/BookItem";
import { InfiniteScroll } from "components/common/InfiniteScroll";
import NecktieSearchInput from "components/common/SearchInput";
import useDebounceValue from "hooks/useDebounceValue";
import { Book } from "types/Book";
import { PaginatedResult } from "types/Common";

const PAGE_LIMIT = 20;
const FIELDS = ["key", "title", "author_name", "publish_year", "isbn", "lccn"];

const BookList = () => {
  const [books, setBooks] = useState<Book[]>([]);
  const [numFound, setNumFound] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const debouncedSearchTerm = useDebounceValue(searchTerm, 500);
  const cancelToken = useRef<CancelTokenSource | undefined>(undefined);
  const pageIndex = useRef<number>(1);

  const hasMore = useMemo(() => books.length < numFound, [books.length, numFound]);

  const fetchBooks = useCallback(async () => {
    if (typeof cancelToken.current != typeof undefined) {
      cancelToken.current?.cancel();
    }

    // Save the cancel token for the current request
    cancelToken.current = axios.CancelToken.source();

    const response = await axios.get<PaginatedResult<Book[]>>(
      `https://openlibrary.org/search.json?page=${
        pageIndex.current ?? 1
      }&limit=${PAGE_LIMIT}&fields=${FIELDS}${
        debouncedSearchTerm.length ? `&title=${debouncedSearchTerm}` : "&title=*"
      }`,
      {
        cancelToken: cancelToken.current?.token
      }
    );

    if (!response?.data) {
      return;
    }

    setBooks((prevState) => [...prevState, ...response.data.docs]);
    setNumFound(response.data.numFound);

    if (hasMore) {
      pageIndex.current = pageIndex.current + 1;
    }
  }, [debouncedSearchTerm, hasMore]);

  const resetFetchData = useCallback(() => {
    setBooks([]);
    pageIndex.current = 1;
  }, [setBooks]);

  useEffect(() => {
    resetFetchData();
    void fetchBooks();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedSearchTerm]);

  return (
    <div className="hero mt-3">
      <div className="hero-content w-full flex-col">
        <div className="flex justify-center mb-3">
          <NecktieSearchInput
            value={searchTerm}
            onChange={(value) => setSearchTerm(value)}
            placeholder="Search books..."
          />
        </div>

        <InfiniteScroll
          fetchData={fetchBooks}
          className="flex-row flex justify-center md:justify-start flex-wrap gap-2 md:gap-6 w-full"
          hasMore={hasMore}
        >
          {books.map((book) => (
            <NavLink
              key={book.key}
              to={`https://openlibrary.org${book.key}`}
              target="_blank"
              className="w-[175px] md:w-[225px] flex justify-center"
            >
              <BookItem
                title={book.title}
                coverId={book.cover_edition_key}
                isbn={book.isbn?.[0]}
                lccn={book.lccn?.[0]}
                authors={book.author_name}
                publishYear={book.publish_year?.[0]}
                className="animate-slideup"
                onPrimaryButtonClick={() => {
                  navigator.clipboard.writeText(`https://openlibrary.org${book.key}`);
                  toast.success("Book url copied");
                }}
              />
            </NavLink>
          ))}
        </InfiniteScroll>
      </div>
    </div>
  );
};

export default BookList;
