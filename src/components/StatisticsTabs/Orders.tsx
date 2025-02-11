import { Typography, useTheme } from "@mui/material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import Pagination from "../Pagination";
import { useEffect, useState } from "react";
import useFetchAccount from "../../hooks/useFetchAccount";
import useFetchAxiosOrders from "../../hooks/useFetchAxiosOrders";
import { useAuth } from "../../hooks/useAuth";

// Définition de l'interface pour un ordre brut (non formaté)
interface Order {
  id: string;
  data?: (string | number | null)[]; // Données d'ordre, dont le type peut varier
}

// Définition de l'interface pour un ordre formaté (prêt à l'affichage)
interface FormattedOrder {
  id: string;
  symbol: string;
  quantity: string;
  side: string;
  type: string;
  status: string;
  price: string | null;
  stopLoss: string | null;
  takeProfit: string | null;
  timeInForce: string;
  createdAt: string;
  expireAt: string | null;
}

const columns: GridColDef[] = [
  {
    field: "id",
    headerName: "ID",
    width: 150,
    editable: false,
  },
  {
    field: "quantity",
    headerName: "Quantity",
    width: 100,
    editable: false,
  },
  {
    field: "side",
    headerName: "Side",
    width: 100,
    editable: false,
  },
  {
    field: "symbol",
    headerName: "Symbol",
    width: 150,
    editable: false,
  },
  {
    field: "price",
    headerName: "Price",
    width: 150,
    editable: false,
  },
  {
    field: "stopLoss",
    headerName: "Stop Loss",
    width: 150,
    editable: false,
  },
  {
    field: "takeProfit",
    headerName: "Take Profit",
    width: 150,
    editable: false,
  },
  {
    field: "createdAt",
    headerName: "Created At",
    width: 250,
  },
];

const Orders = () => {
  const theme = useTheme();
  const { account } = useAuth();
  const [formattedOrders, setFormattedOrders] = useState<FormattedOrder[]>([]);
  const { data: dataAccounts } = useFetchAccount();

  const [ordersData, setOrdersData] = useState<Order[]>([]); // Stocke les ordres

  useEffect(() => {
    const fetchAllOrders = async () => {
      try {
        if (dataAccounts?.accounts) {
          const ordersPromises = dataAccounts.accounts.map((account) =>
            useFetchAxiosOrders(account.id, account.accNum)
          );

          const allOrders = await Promise.all(ordersPromises); // Exécute toutes les requêtes en parallèle
          setOrdersData(allOrders.flat()); // Combine les données en un seul tableau
        }
      } catch (err) {
        console.error("Error fetching orders:", err);
      }
    };

    fetchAllOrders();
  }, [dataAccounts]);

  useEffect(() => {
    if (ordersData && account) {
      console.log("Account:", account);

      // Filtrer et formater les ordres
      const filteredOrders = ordersData
        .filter((el) => el.id === account.id) // Vérifie si l'ID correspond
        .flatMap((el) => el.data || []); // Combine toutes les données de `data` si disponibles

        const formattedOrders: FormattedOrder[] = filteredOrders.map((orderData) => {
          if (!orderData) {
            return null; // Si orderData est null ou vide, on ignore cet élément
          }
        
          return {
            id: orderData[0] as string,
            symbol: orderData[1] as string,
            quantity: orderData[3] ? (orderData[3] as string) : "N/A",
            side: orderData[4] ? (orderData[4] as string) : "N/A",
            type: orderData[5] ? (orderData[5] as string) : "N/A",
            status: orderData[6] ? (orderData[6] as string) : "Unknown",
            price: orderData[9] ? (orderData[9] as string) : null,
            stopLoss: orderData[17] ? (orderData[17] as string) : null,
            takeProfit: orderData[19] ? (orderData[19] as string) : null,
            timeInForce: orderData[12] ? (orderData[12] as string) : "GTC",
            createdAt: orderData[13]
              ? new Date(Number(orderData[13])).toLocaleString("en-US")
              : "Invalid Date",
            expireAt: orderData[14] ? (orderData[14] as string) : null,
          };
        }).filter((order) => order !== null); // Filtre les éléments nulls

      setFormattedOrders(formattedOrders); // Met à jour avec les ordres formatés
    }
  }, [ordersData, account]);

  return (
    <>
      <div className="p-3 md:p-6 rounded-[8px] bg-[#212330]">
        <Typography
          sx={{
            fontSize: 24,
            color: theme.palette.mode === "light" ? "black" : "white",
          }}
        >
          Closed Trades
        </Typography>

        <DataGrid
          sx={{
            "border": "none",
            ".MuiDataGrid-cell": {
              border: "none",
              color: theme.palette.mode === "light" ? "black" : "white",
              fontSize: "14px",
              fontFamily: "Montserrat",
              fontWeight: 500,
            },
            ".MuiDataGrid-columnHeaders": {
              color: theme.palette.mode === "light" ? "black" : "white",
              fontSize: "14px",
              fontFamily: "Montserrat",
              fontWeight: 500,
              borderRadius: "8px",
            },
            ".MuiDataGrid-row": {},
          }}
          rows={formattedOrders}
          getRowId={(row) => row.id}
          columns={columns}
          hideFooter
        />
      </div>
      <Pagination />
    </>
  );
};

export default Orders;
