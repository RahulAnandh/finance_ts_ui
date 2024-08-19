import React, { useEffect, useState } from "react";
import type { TableProps } from "antd";
import { Form, Input, Popconfirm, Table, Typography, Divider } from "antd";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import {
  updateEmployee,
  deleteEmployee,
} from "../../features/employee/employeeSlice";

interface DataType {
  id: string;
  first_name: string;
  last_name: string;
  date_of_birth: string;
  house_name: string;
  address: string;
  pin_code: string;
  state: string;
}

interface EditableCellProps extends React.HTMLAttributes<HTMLElement> {
  editing: boolean;
  dataIndex: string;
  title: any;
  inputType: "select" | "text" | "date";
  record: DataType;
  index: number;
}

const DeployedEmployees: React.FC = () => {
  const employee = useAppSelector((state) => state.employee);
  const dispatch = useAppDispatch();
  const [form] = Form.useForm();
  const [data, setData] = useState(employee.employee_list.not_deleted);
  const [editingKey, setEditingKey] = useState("");

  useEffect(() => {
    setData(employee.employee_list.not_deleted);
  }, [employee.employee_list]);
  const isEditing = (record: DataType) => record.id === editingKey;

  const edit = (record: Partial<DataType>) => {
    form.setFieldsValue({
      id: record.id,
      first_name: record.first_name,
      last_name: record.last_name,
      date_of_birth: record.date_of_birth,
      house_name: record.house_name,
      address: record.address,
      pin_code: record.pin_code,
      state: record.state,
    });
    setEditingKey(record.id);
  };
  const deleteFunction = (record: Partial<DataType>) => {
    dispatch(deleteEmployee(record.id));
    setEditingKey("");
  };
  const cancel = () => {
    setEditingKey("");
  };

  const save = async (key: React.Key) => {
    try {
      const row = (await form.validateFields()) as DataType;
      const newData = [...data];
      const index = newData.findIndex((item) => key === item.id);
      if (index > -1) {
        const item = newData[index];
        dispatch(
          updateEmployee({
            id: item.id,
            first_name: row.first_name,
            last_name: row.last_name,
            date_of_birth: row.date_of_birth,
            house_name: row.house_name,
            address: row.address,
            pin_code: row.pin_code,
            state: row.state,
          })
        );
        setEditingKey("");
      } else {
        setEditingKey("");
      }
    } catch (errInfo) {}
  };

  const columns = [
    {
      title: "Employee Id",
      dataIndex: "id",
      width: 100,
      editable: false,
    },
    {
      title: "First Name",
      dataIndex: "first_name",
      width: 100,
      editable: true,
    },
    {
      title: "Last Name",
      dataIndex: "last_name",
      width: 100,
      editable: true,
    },
    {
      title: "Date of Birth",
      dataIndex: "date_of_birth",
      width: 100,
      editable: true,
    },
    {
      title: "House/Flat",
      dataIndex: "house_name",
      width: 100,
      editable: true,
    },
    {
      title: "Address",
      dataIndex: "address",
      width: 200,
      editable: true,
    },
    {
      title: "Pin Code",
      dataIndex: "pin_code",
      width: 100,
      editable: true,
    },
    {
      title: "State",
      dataIndex: "state",
      width: 100,
      editable: true,
    },

    {
      title: "operation",
      dataIndex: "operation",
      width: 100,

      render: (_: any, record: DataType) => {
        const editable = isEditing(record);
        return editable ? (
          <span>
            <Typography.Link
              onClick={() => save(record.id)}
              style={{ marginRight: 8 }}
            >
              Save
            </Typography.Link>
            <Popconfirm title="Sure to cancel?" onConfirm={cancel}>
              <a>Cancel</a>
            </Popconfirm>
          </span>
        ) : (
          <>
            <Typography.Link
              disabled={editingKey !== ""}
              onClick={() => {
                edit(record);
              }}
            >
              Edit
            </Typography.Link>
            <Divider type="vertical" />
            <Typography.Link disabled={editingKey !== ""}>
              <Popconfirm
                title="Sure to Delete?"
                onConfirm={() => deleteFunction(record)}
              >
                <a>Delete</a>
              </Popconfirm>
            </Typography.Link>
          </>
        );
      },
    },
  ];

  const EditableCell: React.FC<React.PropsWithChildren<EditableCellProps>> = ({
    editing,
    dataIndex,
    title,
    inputType,
    record,
    index,
    children,
    ...restProps
  }) => {
    const inputNode = <Input />;

    return (
      <td {...restProps}>
        {editing ? (
          <Form.Item
            name={dataIndex}
            style={{ margin: 0 }}
            rules={[
              {
                required: true,
                message: `Please Input ${title}!`,
              },
            ]}
          >
            {inputNode}
          </Form.Item>
        ) : (
          children
        )}
      </td>
    );
  };

  const mergedColumns: TableProps["columns"] = columns.map((col) => {
    if (!col.editable) {
      return col;
    }
    return {
      ...col,
      onCell: (record: DataType) => ({
        record,
        inputType: col.dataIndex === "date_of_birth" ? "date" : "select",
        dataIndex: col.dataIndex,
        title: col.title,
        editing: isEditing(record),
      }),
    };
  });
  return (
    <Form form={form} component={false}>
      <Table
        components={{
          body: {
            cell: EditableCell,
          },
        }}
        bordered
        dataSource={data}
        columns={mergedColumns}
        rowClassName="editable-row"
        pagination={{
          onChange: cancel,
        }}
        loading={employee.loading_employee_list}
        size="small"
        scroll={{ x: 1300 }}
      />
    </Form>
  );
};

export default DeployedEmployees;
