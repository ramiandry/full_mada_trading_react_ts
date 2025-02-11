import { InputAdornment, TextField, Typography, useTheme } from "@mui/material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import HeaderSearchIcon from "../../assets/icons/HeaderSearchIcon";
import Pagination from "../Pagination";
import { useEffect, useState } from "react";
import useFetchAccountById from "../../hooks/useFetchAccountById";
const columns: GridColDef[] = [
  {
    field: "accountId",
    headerName: "Account ID",
    width: 150,
    editable: false,
  },
  {
    field: "accountName",
    headerName: "Name",
    width: 350,
    editable: false,
  },
  {
    field: "type",
    headerName: "Type",
    width: 150,
    editable: false,
  },
  {
    field: "currency",
    headerName: "Currency",
    width: 150,
    editable: false,
  },
  
  {
    field: "balance",
    headerName: "Balance",
    width: 150,
    editable: false,
  },
  {
    field: "status",
    headerName: "Status",
    width: 150,
    editable: false,
  },
  /*
  {
    field: "volume",
    headerName: "Volume",
    type: "number",
    width: 110,
    editable: false,
  },
  {
    field: "profit",
    headerName: "Profit",
    type: "number",
    width: 150,
    editable: false,
  },*/
];

/**const rows = [
  {
    id: 1,
    openTime: "Open Time 1",
    openPrice: 100.5,
    closePrice: 105.2,
    date: "2023-01-01",
    position: 35,
    symbol: "XYZ",
    volume: 1000,
    profit: 200,
  },
  {
    id: 2,
    openTime: "Open Time 2",
    openPrice: 150.2,
    closePrice: 155.7,
    date: "2023-01-02",
    position: 42,
    symbol: "ABC",
    volume: 1500,
    profit: 300,
  },
  // Add more rows as needed
];*/

const Accounts = () => {
  const theme = useTheme();
  const [accounts, setAccounts] = useState([]);
  const {data}=useFetchAccountById();

  useEffect(() => {
    if (data) {
      setAccounts(data.data); // Mettre à jour les données utilisateur
    }
  }, [data]); // Reagir uniquement lorsque "data" change
  console.log(data);
  return (
    <>
      <div className=" rounded-[8px]">
        <div className="flex justify-between items-center mb-5">
          <Typography
            sx={{
              fontSize: 24,
              color: theme.palette.mode === "light" ? "black" : "white",
            }}
          >
            Closed Trades
          </Typography>

          <TextField
            placeholder="Search"
            size="small"
            sx={{
              "& .MuiOutlinedInput-root": {
                color: theme.palette.mode === "light" ? "000000" : "#dedede",
                border: "none",

                borderColor: "none",
                fontSize: 16,
                fontFamily: "Montserrat",

                height: 44,

                "& fieldset": {
                  borderColor:
                    theme.palette.mode === "light" ? "black" : "gray",
                  borderRadius: "10px",
                  color: "black",
                },
              },

              "& input::placeholder": {
                color: theme.palette.mode === "light" ? "#000000" : "white",

                fontSize: "18px",
                fontWeight: 400,
                fontFamily: "Montserrat",
              },
            }}
            //   onChange={handleChange}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <HeaderSearchIcon />
                </InputAdornment>
              ),
            }}
          />
        </div>
        <DataGrid
          sx={{
            border: "none",
            ".MuiDataGrid-cell": {
              border: "none",
              color: "white",
              bgcolor: "#212330",
              fontSize: "14px",
              fontFamily: "Montserrat",
              fontWeight: 500,
            },
            ".MuiDataGrid-columnHeaders": {
              color: "white",
              bgcolor: "#212330",
              fontSize: "14px",
              fontFamily: "Montserrat",
              fontWeight: 500,
              borderRadius: "8px",
            },
            ".MuiDataGrid-row": {},
          }}
          rows={accounts}
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          getRowId={(row: any) => {
            return row?.accountId;
          }}
          columns={columns}
          hideFooter
          // checkboxSelection
          // disableRowSelectionOnClick
        />
      </div>
      <Pagination />
    </>
  );
};

export default Accounts;
