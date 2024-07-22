import { MobileOutlined, UserOutlined } from "@ant-design/icons";
import { Button, Checkbox, Form, Input, GetProp } from "antd";
import React, { useState } from "react";
import "./index.css";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import {
  loginPost,
  checkNumberExist,
  setLoginType,
  otpVerification,
} from "../../features/user/userSlice";
import type { OTPProps } from "antd/es/input/OTP";
const UserNamePasswordLogin: React.FC = () => {
  const [mobile_number, setMobileNumber] = useState("");
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.user);
  const onFinish = (values: any) => {
    setMobileNumber(values.mobile);
    dispatch(checkNumberExist({ mobile: values }));
  };
  const onChange: GetProp<typeof Input.OTP, "onChange"> = (text) => {
    dispatch(otpVerification({ mobile: mobile_number, otp: text }));
  };
  const sharedProps: OTPProps = {
    onChange,
  };
  return (
    <div className="login-container">
      <Form
        name="normal_login"
        className="login-form"
        initialValues={{ remember: true }}
        onFinish={onFinish}
      >
        <Form.Item
          name="mobile"
          rules={[
            { required: true, message: "Please input your Mobile Number!" },
          ]}
        >
          <Input
            prefix={<MobileOutlined className="site-form-item-icon" />}
            placeholder="Mobile Number"
            maxLength={10}
          />
        </Form.Item>

        {user.otp_status !== true && (
          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              className="login-form-button"
              loading={user.loading}
            >
              Send OTP
            </Button>
          </Form.Item>
        )}
        {user.otp_status === true && (
          <div>
            <Form.Item>
              <Input.OTP
                formatter={(str) => str.toUpperCase()}
                {...sharedProps}
              />
            </Form.Item>
          </div>
        )}
        {/* {user.otp_status === false && (
          <Button
            type="primary"
            className="login-form-button"
            onClick={() => {
              dispatch(setLoginType("credentials"));
            }}
          >
            Log in With Credintials
          </Button>
        )} */}
      </Form>
    </div>
  );
};

export default UserNamePasswordLogin;
