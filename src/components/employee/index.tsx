import React, { useEffect } from "react";
import { Button, message } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import {
  setEmployeeFormActive,
  getEmployeeList,
} from "../../features/employee/employeeSlice";
import EmployeeForm from "./employee_form";
import EmployeeTable from "./employee_table";

const EmployeeIndex: React.FC = () => {
  const dispatch = useAppDispatch();
  const [messageApi, contextHolder] = message.useMessage();

  const employee = useAppSelector((state) => state.employee);
  useEffect(() => {
    messageApi.open({
      content: employee.message.message_string,
    });
  }, [employee.message]);
  useEffect(() => {
    dispatch(getEmployeeList());
  }, [
    employee.loading_update_employee,
    employee.loading_delete_employee,
    employee.loading_create_employee,
  ]);

  return (
    <>
      {contextHolder}
      <Button
        type="primary"
        onClick={() =>
          dispatch(setEmployeeFormActive(!employee.employee_form_active))
        }
      >
        <PlusOutlined />
        Add Employee
      </Button>
      <br />
      <br />
      <EmployeeForm />
      <EmployeeTable />
    </>
  );
};
export default EmployeeIndex;
