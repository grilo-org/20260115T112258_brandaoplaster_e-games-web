import React, { HtmlHTMLAttributes, useEffect, useState } from "react";
import { useRouter } from "next/router";
import PaginationService from "@/libs/paginationservice";
import StyleButton from "@/components/shared/style-button";
import Meta from "@/dtos/meta";

type PaginationProps = HtmlHTMLAttributes<HTMLDivElement> & {
  page: number;
  total_pages: number;
}

const Pagination: React.FunctionComponent<Meta> = ({
  page,
  total_pages,
  ...rest
}: PaginationProps) => {
  const [Pagination, setPagination] = useState(["1"]);
  const router = useRouter();

  useEffect(() => {
    setPagination(PaginationService.execute(total_pages, page));
  }, [page, total_pages]);

  const handlePageClick = (page: string): void => {
    router.push(`${router.pathname}?page=${page}`);
  };

  const handleNextPageClick = (): void => {
    if (page < total_pages) {
      router.push(`${router.pathname}?page=${page + 1}`);
    }
  };

  const handlePreviusPageClick = (): void => {
    if (page > 1) {
      router.push(`${router.pathname}?page=${page - 1}`)
    }
  }

  return (
    <div className="pagination justify-content-end" {...rest}>
      <div className="pagination">
        <StyleButton
          action="<"
          type_button="blue"
          onClick={handlePreviusPageClick}
        />
        {
          Pagination.map((item, index) => (
            item === "..." ? "..." : (
              <StyleButton
                key={index}
                action={item}
                type_button="blue"
                active={page === Number(item)}
                onClick={() => handlePageClick(item)}
              />
            )
          ))
        }

        <StyleButton
          action=">"
          type_button="blue"
          onClick={handleNextPageClick}
        />
      </div>
    </div>
  )
};

export default Pagination;
