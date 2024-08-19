import React from "react";
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
