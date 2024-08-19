import React, { useState } from "react";
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  DashboardOutlined,
  UserOutlined,
  LogoutOutlined,
  BankOutlined,
  UsergroupAddOutlined,
  PayCircleOutlined,
} from "@ant-design/icons";
import { Button, Layout, Menu, theme, Avatar, Dropdown, Space } from "antd";
import "./index.css";
import { Routes, Route, useNavigate } from "react-router-dom";
import Tagindex from "../tag";
import DashboardIndex from "../dashboard";
import FinanceIndex from "../finance";
import BankIndex from "../bank";
import EmployeeIndex from "../employee";
import type { MenuProps } from "antd";
import NoPage from "../no_page";
import { useAppDispatch } from "../../app/hooks";
import { setIsLoggedIn } from "../../features/user/userSlice";

const { Header, Sider, Content } = Layout;

const LayoutIndex: React.FC = () => {
  const [collapsed, setCollapsed] = useState(false);

  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
  const navigate = useNavigate();

  const selectMenu = (menu: any) => {
    navigate(menu.key);
  };
  const items: MenuProps["items"] = [
    {
      label: (
        <div>
          <UserOutlined /> Profile
        </div>
      ),
      key: "1",
    },
    {
      type: "divider",
    },
    {
      label: (
        <div
          onClick={() => {
            sessionStorage.clear();
            dispatch(setIsLoggedIn(false));
          }}
        >
          <LogoutOutlined /> Logout
        </div>
      ),
      key: "3",
    },
  ];
  const dispatch = useAppDispatch();
  return (
    <Layout className="user_layout">
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <div className="demo-logo-vertical" />
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={["1"]}
          onSelect={selectMenu}
          items={[
            {
              key: "dashboard",
              icon: <DashboardOutlined />,
              label: "Dashboard",
            },
            {
              key: "finance",
              icon: <PayCircleOutlined />,
              label: "Finance",
              children: [
                {
                  key: "finance/finance",
                  icon: <PayCircleOutlined />,
                  label: "finance",
                },
              ],
            },
            {
              key: "bank",
              icon: <BankOutlined />,
              label: "Bank",
              children: [
                {
                  key: "bank/bank",
                  icon: <BankOutlined />,
                  label: "Bank",
                },
              ],
            },
            {
              key: "employee",
              icon: <UsergroupAddOutlined />,
              label: "Employee",
              children: [
                {
                  key: "employee/employee",
                  icon: <UsergroupAddOutlined />,
                  label: "Employee",
                },
              ],
            },
          ]}
        />
      </Sider>
      <Layout>
        <Header style={{ padding: 0, background: colorBgContainer }}>
          <Button
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => setCollapsed(!collapsed)}
            style={{
              fontSize: "16px",
              width: 64,
              height: 64,
            }}
          />
          <Dropdown
            menu={{ items }}
            trigger={["click"]}
            className="user_avatar"
          >
            <a onClick={(e) => e.preventDefault()}>
              <Space>
                <Avatar size={28} icon={<UserOutlined />} />
                {sessionStorage.getItem("user_role")}
              </Space>
            </a>
          </Dropdown>
        </Header>
        <Content
          style={{
            margin: "24px 16px",
            padding: 24,
            minHeight: 280,
            background: colorBgContainer,
            borderRadius: borderRadiusLG,
          }}
        >
          <Routes>
            <Route path="/" element={<DashboardIndex />} />
            <Route index element={<DashboardIndex />} />
            <Route path="/dashboard" element={<DashboardIndex />} />
            <Route path="/hardware/tag" element={<Tagindex />} />
            <Route path="/finance/finance" element={<FinanceIndex />} />
            <Route path="/bank/bank" element={<BankIndex />} />
            <Route path="/employee/employee" element={<EmployeeIndex />} />

            <Route path="*" element={<NoPage />} />
          </Routes>
        </Content>
      </Layout>
    </Layout>
  );
};
export default LayoutIndex;
