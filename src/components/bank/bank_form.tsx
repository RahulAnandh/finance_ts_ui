import React, { useEffect } from "react";
import { Drawer, Form, Input, Col, Button } from "antd";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import {
  setBankFormActive,
  getUsershardwareTeam,
  createBank,
} from "../../features/bank/bankSlice";
const BankForm: React.FC = () => {
  const bank = useAppSelector((state) => state.bank);
  const dispatch = useAppDispatch();
  const [form] = Form.useForm();
  useEffect(() => {
    dispatch(getUsershardwareTeam());
  }, []);
  const onFinish = (values: any) => {
    dispatch(
      createBank({
        acc_no: values.acc_no,
        bank_name: values.bank_name,
        ifsc: values.ifsc,
        branch: values.branch,
        acc_hol: values.acc_hol,
        acc_type: values.acc_type,
        town: values.town,
        city: values.city,
        district: values.district,
        bank_state: values.bank_state,
      })
    );
  };
  return (
    <>
      <Drawer
        title="Create Bank"
        onClose={() => dispatch(setBankFormActive(false))}
        open={bank.bank_form_active}
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
            name="acc_no"
            label="Account No"
            rules={[{ required: true }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="bank_name"
            label="Bank Name"
            rules={[{ required: true }]}
          >
            <Input />
          </Form.Item>
          <Col>
            <Form.Item
              name="ifsc"
              label="IFSC Code"
              rules={[{ required: true }]}
            >
              <Input />
            </Form.Item>
          </Col>
          <Col>
            <Form.Item
              name="branch"
              label="Branch"
              rules={[{ required: true }]}
            >
              <Input />
            </Form.Item>
          </Col>
          <Col>
            <Form.Item
              name="acc_hol"
              label="Account Holder"
              rules={[{ required: true }]}
            >
              <Input />
            </Form.Item>
          </Col>
          <Col>
            <Form.Item
              name="acc_type"
              label="Account Type"
              rules={[{ required: true }]}
            >
              <Input />
            </Form.Item>
          </Col>
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
            <Form.Item
              name="bank_state"
              label="State"
              rules={[{ required: true }]}
            >
              <Input />
            </Form.Item>
          </Col>
          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              style={{ width: "100%" }}
              loading={bank.loading_create_bank}
            >
              Create
            </Button>
          </Form.Item>
        </Form>
      </Drawer>
    </>
  );
};

export default BankForm;
