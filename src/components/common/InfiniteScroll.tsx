import { FC, ReactNode, useEffect, useRef, useState } from "react";
import classNames from "classnames";
import Loader from "./Loader";

interface Props {
  fetchData: () => Promise<void>;
  children: ReactNode;
  hasMore?: boolean;
  className?: string;
}

export const InfiniteScroll: FC<Props> = ({ fetchData, children, hasMore, className }) => {
  const [loading, setLoading] = useState<boolean>(false); // Loading state
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleIntersection: IntersectionObserverCallback = (entries) => {
      const target = entries[0];
      console.log(hasMore);
      console.log(loading);

      if (target.isIntersecting && !loading && hasMore) {
        setLoading(true);
        fetchData().finally(() => {
          setLoading(false);
        });
      }
    };

    // Create an Intersection Observer
    const observer = new IntersectionObserver(handleIntersection, {
      root: null,
      rootMargin: "0px",
      threshold: 0.1 // Adjust this threshold based on your needs
    });

    // Observe the target element
    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    // Clean up the observer when the component unmounts
    return () => observer.disconnect();
  }, [loading, fetchData, hasMore]);

  return (
    <>
      <div className={classNames(className)}>
        {/* Render your data */}
        {children}

        {/* Create a ref for the container element */}
        <div ref={containerRef} className="h-5">
          {/* Empty div to serve as the target for the Intersection Observer */}
        </div>

        {/* Optionally, display a loading indicator */}
      </div>
      {loading && (
        <div className="flex justify-center items-center">
          <Loader />
        </div>
      )}
      {!hasMore && <div>No more items</div>}
    </>
  );
};
