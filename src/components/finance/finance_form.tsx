import React, { useEffect } from "react";
import { Drawer, Form, Input, Col, Button } from "antd";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import {
  setFinanceFormActive,
  getUsershardwareTeam,
  createFinance,
} from "../../features/finance/financeSlice";
const FinanceForm: React.FC = () => {
  const finance = useAppSelector((state) => state.finance);
  const dispatch = useAppDispatch();
  const [form] = Form.useForm();
  useEffect(() => {
    dispatch(getUsershardwareTeam());
  }, []);
  const onFinish = (values: any) => {
    dispatch(
      createFinance({
        finance_id: values.finance_id,
        town: values.town,
        city: values.city,
        district: values.district,
        state: values.state,
      })
    );
  };
  return (
    <>
      <Drawer
        title="Create Finance"
        onClose={() => dispatch(setFinanceFormActive(false))}
        open={finance.finance_form_active}
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
            name="finance_id"
            label="Finance ID"
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
              loading={finance.loading_create_finance}
            >
              Create
            </Button>
          </Form.Item>
        </Form>
      </Drawer>
    </>
  );
};

export default FinanceForm;
