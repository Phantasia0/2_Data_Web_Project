import React from "react";
import { Link, Typography } from "@mui/material";

const Footer = () => {
  return (
    <div className="footer">
      <Link
        href="https://blank.page/#"
        variant="body2"
        underline="none"
        target="_blank"
        color="#000"
        rel="noopener"
      >
        GreenLife
      </Link>
      <Link
        href="https://blank.page/#"
        variant="body2"
        underline="none"
        target="_blank"
        color="#000"
        rel="noopener"
      >
        About Us
      </Link>
      <Typography className="footer-greenLife" variant="body2">
        Copyright© 2023 Elice. All rights reserved
      </Typography>
    </div>
  );
};

export default Footer;
