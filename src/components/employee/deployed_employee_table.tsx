import React, { useEffect, useState } from "react";
import type { TableProps } from "antd";
import {
  Form,
  Input,
  Popconfirm,
  Table,
  Typography,
  DatePicker,
  Select,
  Divider,
  GetProps,
} from "antd";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import {
  getEmployeeList,
  updateEmployee,
  deleteEmployee,
} from "../../features/employee/employeeSlice";

interface DataType {
  employee_id: string;
  town: string;
  city: string;
  district: string;
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
  const isEditing = (record: DataType) => record.employee_id === editingKey;

  const edit = (record: Partial<DataType>) => {
    form.setFieldsValue({
      employee_id: record.employee_id,
      town: record.town,
      city: record.city,
      district: record.district,
      state: record.state,
    });
    // form.setFieldsValue({
    //   madeByName: "",
    //   madeDate: "",
    //   testedByName: "",
    //   testedDate: "",
    //   ...record,
    // });
    setEditingKey(record.employee_id);
  };
  const deleteFunction = (record: Partial<DataType>) => {
    dispatch(deleteEmployee(record.employee_id));
    // form.setFieldsValue({
    //   madeByName: "",
    //   madeDate: "",
    //   testedByName: "",
    //   testedDate: "",
    //   ...record,
    // });
    setEditingKey("");
  };

  const cancel = () => {
    setEditingKey("");
  };

  const save = async (key: React.Key) => {
    try {
      const row = (await form.validateFields()) as DataType;
      const newData = [...data];
      const index = newData.findIndex((item) => key === item.employee_id);
      if (index > -1) {
        const item = newData[index];
        dispatch(
          updateEmployee({
            employee_id: item.employee_id,
            town: row.town,
            city: row.city,
            district: row.district,
            state: row.state,
          })
        );

        // newData.splice(index, 1, {
        //   ...item,
        //   ...row,
        // });
        // setData(newData);
        setEditingKey("");
      } else {
        // newData.push(row);
        // setData(newData);
        setEditingKey("");
      }
    } catch (errInfo) {}
  };

  const columns = [
    {
      title: "Employee Id",
      dataIndex: "employee_id",
      width: "15%",
      editable: false,
    },
    {
      title: "Town",
      dataIndex: "town",
      width: "15%",
      editable: true,
    },
    {
      title: "City",
      dataIndex: "city",
      width: "15%",
      editable: true,
    },
    {
      title: "District",
      dataIndex: "district",
      width: "15%",
      editable: true,
    },
    {
      title: "State",
      dataIndex: "state",
      width: "15%",
      editable: true,
    },

    {
      title: "operation",
      dataIndex: "operation",
      render: (_: any, record: DataType) => {
        const editable = isEditing(record);
        return editable ? (
          <span>
            <Typography.Link
              onClick={() => save(record.employee_id)}
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
            <Typography.Link
              disabled={editingKey !== ""}
              // onClick={() => {
              //   deleteFunction(record);
              // }}
            >
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
        inputType:
          col.dataIndex === "madeByName" || col.dataIndex === "testedByName"
            ? "select"
            : "date",
        dataIndex: col.dataIndex,
        title: col.title,
        editing: isEditing(record),
      }),
    };
  });
  // useEffect(() => {
  //   dispatch(
  //     getEndpointList({
  //       size: 1,
  //       page: 3,
  //       sortBy: "madeDate",
  //       order: "ASE",
  //       status: 0,
  //     })
  //   );
  // }, [end_point.loading_update_endpoint]);
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
      />
    </Form>
  );
};

export default DeployedEmployees;
