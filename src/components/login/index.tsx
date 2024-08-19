import React, { useEffect } from "react";

import UserNamePasswordLogin from "./uname_pword_login";
import MobileLogin from "./mobile_login";
import LoginImage from "../../assets/hardware.png";
import { message, Card, Tabs } from "antd";

import LayoutIndex from "../layout";

import { useAppSelector } from "../../app/hooks";
import "./index.css";
const LoginIndex: React.FC = () => {
  const [messageApi, contextHolder] = message.useMessage();

  const user = useAppSelector((state) => state.user);
  useEffect(() => {
    messageApi.open({
      // type: user.message.message_type,
      content: user.message.message_string,
    });
  }, [user.message]);

  return (
    <div className="login_page">
      {contextHolder}
      {user.is_logged_in !== true && (
        <>
          <img
            src={LoginImage}
            className="login_page_image"
            style={{ height: "100vh" }}
          ></img>
          <div className="login_page_form">
            <Card className="login_form_card">
              <Tabs
                items={[
                  {
                    key: "1",
                    label: "Mobile",
                    children: <MobileLogin />,
                  },
                  {
                    key: "2",
                    label: "Credentials",
                    children: <UserNamePasswordLogin />,
                  },
                ]}
                centered
              ></Tabs>
            </Card>
          </div>
        </>
      )}
      {user.is_logged_in == true && <LayoutIndex />}
    </div>
  );
};

export default LoginIndex;
