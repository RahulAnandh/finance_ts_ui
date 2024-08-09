import React, { useEffect } from "react";
import { Button, message } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { setBankFormActive, getBankList } from "../../features/bank/bankSlice";
import BankForm from "./bank_form";
import BankTable from "./bank_table";

const BankIndex: React.FC = () => {
  const dispatch = useAppDispatch();
  const [messageApi, contextHolder] = message.useMessage();

  const bank = useAppSelector((state) => state.bank);
  useEffect(() => {
    messageApi.open({
      type: bank.message.message_type,
      content: bank.message.message_string,
    });
  }, [bank.message]);
  useEffect(() => {
    dispatch(getBankList());
  }, [
    bank.loading_update_bank,
    bank.loading_delete_bank,
    bank.loading_create_bank,
  ]);

  return (
    <>
      {contextHolder}
      <Button
        type="primary"
        onClick={() => dispatch(setBankFormActive(!bank.bank_form_active))}
      >
        <PlusOutlined />
        Add Bank
      </Button>
      <br />
      <br />
      <BankForm />
      <BankTable />
    </>
  );
};
export default BankIndex;
