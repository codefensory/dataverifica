import { Button, HStack } from "@chakra-ui/react";
import { FC, useEffect, useState } from "react";

type PaginationProps = {
  currentPage: number;
  totalPages: number;
  onChange: (page: number) => void;
};

export const Pagination: FC<PaginationProps> = (props) => {
  let { currentPage, totalPages, onChange } = props;

  const [lastTotalPages, setLastTotalPages] = useState(totalPages);

  useEffect(() => {
    if (totalPages !== 0) {
      setLastTotalPages(totalPages);
    }
  }, [totalPages, setLastTotalPages]);

  const limit = 4;

  let pagesArray: number[] = [];

  for (let i = 0; i < Math.min(7, lastTotalPages); i++) {
    if (currentPage <= limit) {
      pagesArray[i] = i;
    } else {
      const diff =
        Math.max(currentPage + limit - 1, lastTotalPages) - lastTotalPages;

      pagesArray[i] = i + currentPage - limit - diff;
    }
  }

  return (
    <HStack w="full" h="full" justifyContent="flex-end">
      <Button
        size="sm"
        colorScheme="gray"
        disabled={currentPage === 0}
        onClick={() => onChange(currentPage - 1)}
      >
        {"<"}
      </Button>
      {pagesArray.map((value, index) => (
        <Button
          key={"button-" + index}
          colorScheme={value === currentPage ? "primary" : "gray"}
          size="sm"
          onClick={() => onChange(value)}
        >
          {value + 1}
        </Button>
      ))}
      <Button
        size="sm"
        colorScheme="gray"
        disabled={currentPage === lastTotalPages - 1}
        onClick={() => onChange(currentPage + 1)}
      >
        {">"}
      </Button>
    </HStack>
  );
};
