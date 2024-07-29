import React from "react";
import { Table } from "antd";
import type { TableColumnsType, TableProps } from "antd";
import { Card } from "antd";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import DeployedFinances from "./deployed_finance_table";
import NonDeployedFinances from "./non_deployed_finance_table";

const FinanceTable: React.FC = () => {
  return (
    <>
      <DeployedFinances />
      <NonDeployedFinances />
    </>
  );
};

export default FinanceTable;
