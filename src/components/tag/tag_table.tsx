import React from "react";
import { Table } from "antd";
import type { TableColumnsType, TableProps } from "antd";
import { Card } from "antd";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import DeployedTags from "./deployed_tag";
import NonDeployedTags from "./non_deployed_tags";

const TagTable: React.FC = () => {
  return (
    <>
      <DeployedTags />
      <NonDeployedTags />
    </>
  );
};

export default TagTable;
