import React from "react";
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
