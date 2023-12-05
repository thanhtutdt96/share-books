import { FC, memo, MouseEvent, useCallback, useEffect, useMemo, useState } from "react";
import { ShareIcon } from "@heroicons/react/20/solid";
import classNames from "classnames";
import bookPlaceholder from "assets/book-placeholder.png";
import { Book } from "types/Book";

interface Props {
  title: Book["title"];
  authors: Book["author_name"];
  publishYear: number;
  isbn: string;
  lccn: string;
  coverSize: string;
  className?: string;
  onPrimaryButtonClick: () => void;
}

const BookItem: FC<Props> = ({
  title,
  authors,
  publishYear,
  className,
  isbn,
  lccn,
  coverSize = "M",
  onPrimaryButtonClick
}) => {
  const [coverImageUrl, setCoverImageUrl] = useState("");

  const handleOnClick = (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();

    onPrimaryButtonClick();
  };

  const bookCoverType = useMemo(() => {
    if (isbn) {
      return `isbn/${isbn}-${coverSize}`;
    }

    if (lccn) {
      return `lccn/${lccn}-${coverSize}`;
    }

    return "";
  }, [isbn, lccn, coverSize]);

  const initBookCover = useCallback(async () => {
    if (!bookCoverType) {
      return;
    }

    setCoverImageUrl(`https://covers.openlibrary.org/b/${bookCoverType}.jpg?default=false`);
  }, [bookCoverType]);

  useEffect(() => {
    void initBookCover();
  }, [initBookCover]);

  return (
    <div
      className={classNames(
        "h-full card w-[175px] md:w-[225px] bg-base-100 border shadow-lg transition duration-300 ease-in-out" +
          "hover:cursor-pointer hover:shadow-xl hover:ring-neutral-content hover:ring-1 hover:-translate-y-0.5",
        className
      )}
    >
      <figure className="h-64">
        <img
          className="object-cover object-top w-full h-full"
          src={bookCoverType ? coverImageUrl : bookPlaceholder}
          alt={title}
          onError={({ currentTarget }) => {
            currentTarget.onerror = null;
            currentTarget.src = bookPlaceholder;
          }}
        />
      </figure>
      <div className="card-body p-3">
        <h4 className="card-title text-sm line-clamp-2">{title}</h4>
        {authors && <p className="text-xs text-gray-800 grow-0 line-clamp-2">{authors?.[0]}</p>}
        {publishYear && <p className="text-xs text-gray-500 grow-0">{publishYear}</p>}
        <div className="card-actions justify-end">
          <button className="btn btn-secondary btn-sm" onClick={handleOnClick}>
            <ShareIcon className="w-4 h-auto" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default memo(BookItem);
