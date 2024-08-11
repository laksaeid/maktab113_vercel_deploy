/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import * as React from "react";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import { useSearchParams } from "react-router-dom";

export default function PaginationControlled({ count }) {
  const [searchParams, setSearchParams] = useSearchParams();
  const [page, setPage] = React.useState(+searchParams.get("page") || 1);
  const handleChange = (event, value) => {
    setPage(value);
    if (searchParams.get("search")) {
      setSearchParams({ page: value, search: searchParams.get("search") });
    } else {
      setSearchParams({ page: value });
    }
  };

  return (
    <Stack spacing={2}>
      <Pagination
        variant="outlined"
        count={count}
        page={page}
        onChange={handleChange}
      />
    </Stack>
  );
}
