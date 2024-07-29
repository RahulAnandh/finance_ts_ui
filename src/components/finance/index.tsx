import React, { useEffect } from "react";
import { Button, message } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import {
  setFinanceFormActive,
  getFinanceList,
} from "../../features/finance/financeSlice";
import FinanceForm from "./finance_form";
import FinanceTable from "./finance_table";

const FinanceIndex: React.FC = () => {
  const dispatch = useAppDispatch();
  const [messageApi, contextHolder] = message.useMessage();

  const finance = useAppSelector((state) => state.finance);
  useEffect(() => {
    messageApi.open({
      type: finance.message.message_type,
      content: finance.message.message_string,
    });
  }, [finance.message]);
  useEffect(() => {
    dispatch(getFinanceList());
  }, [
    finance.loading_update_finance,
    finance.loading_delete_finance,
    finance.loading_create_finance,
  ]);

  return (
    <>
      {contextHolder}
      <Button
        type="primary"
        onClick={() =>
          dispatch(setFinanceFormActive(!finance.finance_form_active))
        }
      >
        <PlusOutlined />
        Add Finance
      </Button>
      <br />
      <br />
      <FinanceForm />
      <FinanceTable />
    </>
  );
};
export default FinanceIndex;
