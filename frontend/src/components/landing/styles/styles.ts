export const linkStyles = {
  position: "relative",
  color: "#eff6ff",
  fontSize: "1.6vh",
  fontWeight: "400",
  textDecoration: "none",
  "&::after": {
    content: '""',
    position: "absolute",
    width: "100%",
    height: "2px",
    bottom: "0",
    left: "0",
    backgroundColor: "#f97316",
    transform: "scaleX(0)",
    transition: "transform 0.3s ease",
  },
  "&:hover::after": {
    transform: "scaleX(1)",
  },
  "&:focus::after": {
    transform: "scaleX(1)",
    backgroundColor: "#f97316",
  },
  "&:focus": {
    outline: "none",
  },
};

export const buttonLogin = {
  background: "#eff6ff",
  color: "#1D4ED8",
  px: 3,
  py: 1,
  ":hover": {
    backgroundColor: "#dbeafe",
    color: "#1D4ED8",
  },
};

export const buttonRegister = {
  background: "#F97316",
  color: "white",
  px: 3,
  py: 1,
  ":hover": {
    backgroundColor: "#ea580c",
  },
};
