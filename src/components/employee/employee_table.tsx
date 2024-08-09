import React from "react";
import { Table } from "antd";
import type { TableColumnsType, TableProps } from "antd";
import { Card } from "antd";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import DeployedEmployees from "./deployed_employee_table";
import NonDeployedEmployees from "./non_deployed_employee_table";

const EmployeeTable: React.FC = () => {
  return (
    <>
      <DeployedEmployees />
      <NonDeployedEmployees />
    </>
  );
};

export default EmployeeTable;
