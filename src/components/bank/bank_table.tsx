import React from "react";
import { Table } from "antd";
import type { TableColumnsType, TableProps } from "antd";
import { Card } from "antd";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import DeployedBanks from "./deployed_bank_table";
import NonDeployedBanks from "./non_deployed_bank_table";

const BankTable: React.FC = () => {
  return (
    <>
      <DeployedBanks />
      <NonDeployedBanks />
    </>
  );
};

export default BankTable;
