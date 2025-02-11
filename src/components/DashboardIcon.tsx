import { useTheme } from "@mui/material";

const DashboardIcon = () => {
  const theme = useTheme();
  return (
    <svg
      width="30"
      height="31"
      viewBox="0 0 30 31"
      fill={theme.palette.mode === "light" ? "black" : "white"}
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M11.4465 26.4584V22.625C11.4465 21.6499 12.2414 20.8577 13.2263 20.8511H16.8339C17.8234 20.8511 18.6256 21.6453 18.6256 22.625V22.625V26.4703C18.6254 27.2981 19.2928 27.9747 20.1288 27.9941H22.5339C24.9314 27.9941 26.875 26.07 26.875 23.6964V23.6964V12.7914C26.8622 11.8577 26.4193 10.9808 25.6725 10.4104L17.4472 3.85077C16.0062 2.7086 13.9578 2.7086 12.5168 3.85077L4.32753 10.4223C3.57782 10.9904 3.13423 11.8687 3.125 12.8033V23.6964C3.125 26.07 5.06859 27.9941 7.46614 27.9941H9.8712C10.7279 27.9941 11.4225 27.3066 11.4225 26.4584V26.4584"
        stroke="white"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default DashboardIcon;
