import React from "react";
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
