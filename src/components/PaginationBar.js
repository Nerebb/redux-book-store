import React from "react";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import { useDispatch } from "react-redux";
import useDevice from "../hooks/useDevice";

const PaginationBar = ({ pageNum, setPageNum, totalPageNum }) => {
  const dispatch = useDispatch();
  const isMobile = useDevice(600);
  const handleChange = (value) => {
    dispatch(setPageNum(value));
  };
  return (
    <Stack spacing={2}>
      <Pagination
        count={totalPageNum}
        page={pageNum}
        onChange={handleChange}
        siblingCount={isMobile ? 0 : 1}
        showFirstButton={isMobile ? false : true}
        showLastButton={isMobile ? false : true}
        size={isMobile ? "small" : "medium"}
        sx={{
          maxWidth: { md: "450px", xs: 1 },
        }}
      />
    </Stack>
  );
};

export default PaginationBar;
