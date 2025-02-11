import { Typography, useTheme } from "@mui/material";

import DoneIcon from "@mui/icons-material/Done";
import PopularIcon from "../../assets/icons/popular.svg";
import MainTitleComponent from "../MainTitleComponent";
import { FlutterWaveButton, closePaymentModal } from 'flutterwave-react-v3';
import { useEffect, useState } from "react";
import useFetchDataUser from "../../hooks/useFetchDataUser";

interface BillingInfo {
  title: string;
  pic: string;
  subTitle?: string;
  subImg?: string;
  targets: string[];
  price: string;
}

interface Objective {
  title: string;
  description: string;
}

interface UserDetails {
  email: string;
  phone: string;
  firstName: string;
  lastName: string;
}

const Objective: Objective[] = [
  {
    title: "Maximum Loss",
    description:
      "This rule can also be called the “account stop-loss” Maximum loss is a fixed figured representing the difference between your initial account balance and current equity which can not fall below the specified value for the plan. For example, If your initial account balance is 10k and you have a max drawdown of 8%, your maximum loss value will remain at $9,200 for the duration of your challenge. If still aren't sure, watch the following video for an in depth breakdown.",
  },
  {
    title: "Maximum Daily Loss",
    description:
      "This rule can also be called “trader’s daily stop-loss”. The rule says that at any moment of the day (EE(S)T – Eastern European Summer Time), the daily equity decrease must not hit the predetermined limit. The counting formula: Current daily loss = balance at the start of the day - current equity.",
  },
  {
    title: "Maximum Loss",
    description:
      "This rule can also be called “account stop-loss”. Maximum Loss is the difference between your highest recorded balance and your current equity. Maximum loss trails your highest recorded balance (closed trades) If still aren't sure, watch the following video for an in depth breakdown.",
  },
  {
    title: "Profit Target",
    description:
      "Depending on chosen trading strategy and phase the minimum profit target to complete the phase or earn commission is set between 5-10% of the initial balance. Profit target means that a trader reaches a profit target specified in the plan of the initial account balance in the sum of closed positions. The trading period is unlimited and the profit target can be met at your leisure without any restrictions. For example: If you trade Challenge with $10,000 capital targeting a minimum of 5%, your profit target is $500. After completing the Verification period (Phase 2), the minimum profit target will be removed. You can trade your Phase 3 account as long as you do not reach the maximum loss limits or violate other rules or objectives.",
  },
  {
    title: "Minimum Trading Days",
    description:
      "To meet this objective, depending on your chosen trading strategy, you must trade for at least one day during the trading period. At least one position must be opened on each of these days. A trading day is considered any day when at least one trade is executed. If a trade is held over multiple days, the day when the trade was executed is considered as the trading day. You can proceed to the next phase without waiting.",
  },
  {
    title: "Trading Period",
    description:
      "All challenges both one and two step have unlimited trading time to complete.",
  },
];

const Challenges = () => {
  const theme = useTheme();
  const [amount, setAmount] = useState<string>("55");
  const {data: data_fetch}=useFetchDataUser();
  const [userDetails, setUserDetails] = useState<UserDetails>({
    email: "",
    phone: "",
    firstName: "",
    lastName: "",
  });

  useEffect(() => {
    if(data_fetch){
      setUserDetails(data_fetch);
      console.log(data_fetch);
    }
  }, [data_fetch]);
  const config = {
    public_key: 'FLWPUBK_TEST-df7b74fb65b9aa50ed8e92e3058c3dea-X',
    tx_ref: Date.now().toString(),
    amount: parseFloat(amount.replace("$", "")),
    currency: 'USD',
    payment_options: 'card,mobilemoney,ussd',
    customer: {
      email: userDetails.email,
      phone_number:  userDetails?.phone || '0325589654',
      name: userDetails.firstName + " " + userDetails.lastName,
    },
    customizations: {
      title: 'Wealth funded',
      description: 'Challenge '+ amount,
      logo: 'https://wealthfunding.co/assets/logo-d43ffcc9.svg',
    },
  };

  const fwConfig = {
    ...config,
    text: 'Get Started',
    callback: (response: any) => {
      console.log(response);
      closePaymentModal(); // Fermer le modal de paiement après un paiement réussi
    },
    onClose: () => {},
  };

  const data: BillingInfo[] = [
    {
      title: "Challenge $10k",
      pic: "/Icons/silverImg.svg",
      targets: [
        "Profit target 12%",
        "Total Allowed Drawdown 8%",
        "Max Daily Loss 4%",
        "Premium Features",
        "50 Integrations",
      ],
      price: "$107",
    },
    {
      title: "Challenge $25k",
      subTitle: "Popular",
      subImg: PopularIcon,
      pic: "/Icons/goldImg.svg",
      targets: [
        "Profit target 12%",
        "Total Allowed Drawdown 8%",
        "Max Daily Loss 4%",
        "Premium Features",
        "50 Integrations",
      ],
      price: "$207",
    },
    {
      title: "Challenge $50k",
      pic: "/Icons/diamondImg.svg",
      targets: [
        "Profit target 12%",
        "Total Allowed Drawdown 8%",
        "Max Daily Loss 4%",
        "Premium Features",
        "50 Integrations",
      ],
      price: "$307",
    },
  ];
  return (
    <div className="mx-4 md:mx-6 lg:mx-10 min-h-[100vh]">
      <MainTitleComponent
        Image="/Icons/challengesIconActive.svg"
        title="Challenges"
        rules={false}
      />
      <div className="flex items-center justify-center mx-4 pt-20 xl:pt-32 md:mx-6 lg:mx-10">
        <div className="flex flex-wrap justify-center gap-8">
          {data.map((item, index) => (
            <div
              key={index}
              className={`w-full md:w-[309px] lg:w-[285px] 2xl:w-[309px] rounded-2xl 
             bg-[#212330] pb-3 md:pb-6 px-3 md:px-6 text-center break-words ${item.title === "Challenge $25k" ? "my-12" : "mb-20 mt-12"
                } ${item.title === "Challenge $50k" ? " whitespace-nowrap" : ""}`}
                onMouseOver={() => {
                  setAmount(item.price);
                }}
            >
              <div className="flex items-center justify-center">
                <div className="w-20 bg-[#222228] h-20 pl-3 mt-[-40px] rounded-full overflow-hidden flex items-center justify-center">
                  <img className="!w-32 !h-32 object-cover mt-3" src={item?.pic} alt="" />
                </div>
              </div>

              <Typography
                sx={{
                  fontFamily: "Poppins",
                  color: item.title === "Challenge $25k" ? "#00BE64" : "white",
                  fontSize: { xs: 24, md: 30 },
                  pt: 3,
                }}
              >
                {item.title}
              </Typography>
              <div className="flex justify-center items-center gap-2">
                <Typography
                  sx={{
                    fontFamily: "Poppins",
                    color: "#00BE64",
                    fontSize: { xs: 14, md: 16 },
                  }}
                >
                  {item.subTitle}
                </Typography>
                <img className="" src={item?.subImg} alt="" />
              </div>
              <hr className="h-px my-8 bg-[#404047] border-[#404047]" />
              {item.targets.map((target, targetIndex) => (
                <div key={targetIndex} className="flex items-center gap-4 mt-5">
                  <DoneIcon sx={{ color: "#00BE64", fontSize: 14 }} />
                  <Typography
                    sx={{
                      color: theme.palette.mode === "light" ? "black" : "white",
                      fontFamily: "Poppins",
                      fontWeight: 400,
                      fontSize: 14,
                    }}
                  >
                    {target}
                  </Typography>
                </div>
              ))}

              <hr className="h-px my-8  bg-[#404047] border-[#404047]" />
              <div className="flex justify-between items-center gap-12 mt-6">
                <Typography
                  sx={{
                    fontFamily: "Poppins",
                    color: "white",
                    fontSize: { xs: 24, md: 30 },
                  }}
                >
                  {item?.price}
                </Typography>{" "}
                {/* <button> */}
                  <FlutterWaveButton
                    {...fwConfig}
                    className={`text-[#171717] font-medium text-sm font-[Poppins] cursor-pointer w-full h-10 rounded-[6px] ${item.title === "Challenge $25k"
                    ? "bg-[#00BE64]"
                    : "bg-[#00BE64]"
                    }`}
                  >
                    Get Started
                  </FlutterWaveButton>
                  
                {/* </button> */}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Challenges;
