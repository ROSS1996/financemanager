import React from "react";
import { RiHome4Line } from "react-icons/ri";
import { AiOutlineThunderbolt, AiOutlineDollar } from "react-icons/ai";
import {
  MdAttachMoney,
  MdAccountBalance,
  MdDirectionsBus,
} from "react-icons/md";
import {
  FaPercent,
  FaFilm,
  FaMusic,
  FaBook,
  FaGamepad,
  FaEllipsisH,
  FaShoppingCart,
  FaPlusCircle,
  FaHandHoldingUsd,
  FaChartLine,
  FaDollarSign,
  FaBriefcase,
  FaWarehouse,
  FaGem,
  FaHandshake,
} from "react-icons/fa";
import { BsGeoAlt } from "react-icons/bs";
import { GiKnifeFork } from "react-icons/gi";
import {
  RiUserReceivedFill,
  RiUserSharedFill,
  RiMoneyDollarCircleLine,
  RiBankFill,
  RiBuilding2Fill,
} from "react-icons/ri";

interface Props {
  category: string;
  className: string;
}

const Icons = ({ category, className }: Props) => {
  const fixed = category.toLowerCase();
  switch (fixed) {
    case "food":
      return <GiKnifeFork className={className} />;
    case "shopping":
      return <FaShoppingCart className={className} />;
    case "travel":
      return <BsGeoAlt className={className} />;
    case "received":
      return <RiUserReceivedFill className={className} />;
    case "paid":
      return <RiUserSharedFill className={className} />;
    case "account":
      return <MdAccountBalance className={className} />;
    case "housing":
    case "house":
      return <RiHome4Line className={className} />;
    case "transport":
    case "transportation":
      return <MdDirectionsBus className={className} />;
    case "utilities":
      return <AiOutlineThunderbolt className={className} />;
    case "taxes":
      return <MdAttachMoney className={className} />;
    case "interest rates":
      return <FaPercent className={className} />;
    case "movies":
      return <FaFilm className={className} />;
    case "music":
      return <FaMusic className={className} />;
    case "books":
      return <FaBook className={className} />;
    case "games":
      return <FaGamepad className={className} />;
    case "salary":
      return <RiMoneyDollarCircleLine className={className} />;
    case "wages":
      return <FaHandHoldingUsd className={className} />;
    case "bonuses":
      return <FaPlusCircle className={className} />;
    case "commissions":
      return <FaHandshake className={className} />;
    case "stocks":
      return <FaChartLine className={className} />;
    case "bonds":
      return <RiBankFill className={className} />;
    case "real estate":
      return <RiBuilding2Fill className={className} />;
    case "dividends":
      return <MdAttachMoney className={className} />;
    case "interest":
      return <AiOutlineThunderbolt className={className} />;
    case "sales":
      return <FaDollarSign className={className} />;
    case "services":
      return <FaBriefcase className={className} />;
    case "rent":
      return <FaWarehouse className={className} />;
    case "royalties":
      return <FaGem className={className} />;
    case "other":
      return <FaEllipsisH className={className} />;
    case "money":
    default:
      return <AiOutlineDollar className={className} />;
  }
};

export default Icons;
