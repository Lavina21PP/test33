"use client";
import * as React from "react";
import Button from "@mui/material/Button";
import { style } from "@mui/system";

export default function DisableElevation({
  text,
}: {
  text: string;
}) {

  return (
    <div>
      <Button
        sx={{ textTransform: "none", backgroundColor: 'transparent', borderRadius: '0', padding: '0.5rem' }}
        variant="contained"
        className="w-full h-full"
        disableElevation
        type="submit"
      >
        {text}
      </Button>
    </div>
  );
}

