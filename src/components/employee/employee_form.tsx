import React, { useEffect } from "react";
import {
  DatePicker,
  Drawer,
  Form,
  Input,
  Select,
  Row,
  Col,
  Button,
  GetProps,
} from "antd";
import dayjs from "dayjs";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import {
  setEmployeeFormActive,
  getUsershardwareTeam,
  createEmployee,
} from "../../features/employee/employeeSlice";
const EmployeeForm: React.FC = () => {
  const employee = useAppSelector((state) => state.employee);
  const dispatch = useAppDispatch();
  const [form] = Form.useForm();
  useEffect(() => {
    dispatch(getUsershardwareTeam());
  }, []);
  const onFinish = (values: any) => {
    console.log("1---A", values);
    dispatch(
      createEmployee({
        employee_id: values.employee_id,
        town: values.town,
        city: values.city,
        district: values.district,
        state: values.state,
      })
    );
  };
  type RangePickerProps = GetProps<typeof DatePicker.RangePicker>;

  const disabledDate: RangePickerProps["disabledDate"] = (current) => {
    return current && current > dayjs().endOf("day");
  };
  return (
    <>
      <Drawer
        title="Create Employee"
        onClose={() => dispatch(setEmployeeFormActive(false))}
        open={employee.employee_form_active}
        maskClosable={false}
      >
        <Form
          form={form}
          name="validateOnly"
          layout="vertical"
          autoComplete="off"
          onFinish={onFinish}
        >
          <Form.Item
            name="employee_id"
            label="Employee ID"
            rules={[{ required: true }]}
          >
            <Input />
          </Form.Item>

          <Col>
            <Form.Item name="town" label="Town" rules={[{ required: true }]}>
              <Input />
            </Form.Item>
          </Col>
          <Col>
            <Form.Item name="city" label="City" rules={[{ required: true }]}>
              <Input />
            </Form.Item>
          </Col>
          <Col>
            <Form.Item
              name="district"
              label="District"
              rules={[{ required: true }]}
            >
              <Input />
            </Form.Item>
          </Col>
          <Col>
            <Form.Item name="state" label="State" rules={[{ required: true }]}>
              <Input />
            </Form.Item>
          </Col>
          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              style={{ width: "100%" }}
              loading={employee.loading_create_employee}
            >
              Create
            </Button>
          </Form.Item>
        </Form>
      </Drawer>
    </>
  );
};

export default EmployeeForm;
