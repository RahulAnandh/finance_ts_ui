import React from "react";
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
