import { Styles } from "../../types";

export const styles: Styles = {
  link: {
    a: {
      color: (theme) => theme.palette.grey[600],
      textDecoration: "none",
      fontSize: "1rem",
      "&.is-selected": {
        color: (theme) => theme.palette.secondary.main,
      },
    },
  },
};
