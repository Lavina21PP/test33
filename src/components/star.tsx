import * as React from "react";
import Box from "@mui/material/Box";
import Rating from "@mui/material/Rating";

interface StartProps {
  valueStar: number | null;
  setValueStar: (value: number | null) => void;
}

export default function BasicRating({valueStar, setValueStar}: StartProps) {
  return (
    <Box sx={{ "& > legend": { mt: 2 } }}>
      <Rating
        name="simple-controlled"
        value={valueStar}
        onChange={(event, newValue) => {
          setValueStar(newValue);
        }}
        sx={{
          "& .MuiRating-iconFilled": {
            color: "#ffd700", // ดาวที่ถูกเลือก
          },
          "& .MuiRating-iconEmpty": {
            color: "#888", // ดาวว่าง
          },
          "& .MuiRating-icon": {
            fontSize: { xs: "1.5rem", md: "1.8rem" },
          },
        }}
      />
    </Box>
  );
}
