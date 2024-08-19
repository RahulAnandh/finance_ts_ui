import React, { useEffect, useState } from "react";
import type { TableProps } from "antd";
import { Form, Input, Popconfirm, Table, Typography, Divider } from "antd";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { updateBank, undoDeleteBank } from "../../features/bank/bankSlice";
interface DataType {
  id: string;
  ifsc: string;
  acc_no: string;
  bank_name: string;
  branch: string;
  acc_hol: string;
  acc_type: string;
  town: string;
  city: string;
  district: string;
  bank_state: string;
}

interface EditableCellProps extends React.HTMLAttributes<HTMLElement> {
  editing: boolean;
  dataIndex: string;
  title: any;
  inputType: "select" | "text" | "date";
  record: DataType;
  index: number;
}

const NonDeployedBanks: React.FC = () => {
  const bank = useAppSelector((state) => state.bank);
  const dispatch = useAppDispatch();
  const [form] = Form.useForm();
  const [data, setData] = useState(bank.bank_list.deleted);
  const [editingKey, setEditingKey] = useState("");

  useEffect(() => {
    setData(bank.bank_list.deleted);
  }, [bank.bank_list]);
  const isEditing = (record: DataType) => record.id === editingKey;

  const edit = (record: Partial<DataType>) => {
    form.setFieldsValue({
      bank_id: record.id,
      ifsc: record.ifsc,
      acc_no: record.acc_no,
      bank_name: record.bank_name,
      branch: record.branch,
      acc_hol: record.acc_hol,
      acc_type: record.acc_type,
      town: record.town,
      city: record.city,
      district: record.district,
      bank_state: record.bank_state,
    });
    setEditingKey(record.id);
  };

  const undoDeleteFunction = (record: Partial<DataType>) => {
    dispatch(undoDeleteBank(record.id));
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
          updateBank({
            id: item.id,
            ifsc: row.ifsc,
            acc_no: row.acc_no,
            bank_name: row.bank_name,
            branch: row.branch,
            acc_hol: row.acc_hol,
            acc_type: row.acc_type,
            town: row.town,
            city: row.city,
            district: row.district,
            bank_state: row.bank_state,
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
      title: "Bank Id",
      dataIndex: "id",
      width: 100,
      editable: false,
    },
    {
      title: "IFSC Code",
      dataIndex: "ifsc",
      width: 100,
      editable: true,
    },
    {
      title: "Account No",
      dataIndex: "acc_no",
      width: 150,
      editable: true,
    },
    {
      title: "Bank Name",
      dataIndex: "bank_name",
      width: 100,
      editable: true,
    },
    {
      title: "Branch",
      dataIndex: "branch",
      width: 100,
      editable: true,
    },
    {
      title: "Account Hol",
      dataIndex: "acc_hol",
      width: 150,
      editable: true,
    },
    {
      title: "Account Type",
      dataIndex: "acc_type",
      width: 100,
      editable: true,
    },
    {
      title: "Town",
      dataIndex: "town",
      width: 100,
      editable: true,
    },
    {
      title: "City",
      dataIndex: "city",
      width: 100,
      editable: true,
    },
    {
      title: "District",
      dataIndex: "district",
      width: 100,
      editable: true,
    },
    {
      title: "State",
      dataIndex: "bank_state",
      width: 100,
      editable: true,
    },
    {
      title: "operation",
      dataIndex: "operation",
      // fixed: "right",
      width: 150,
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
                title="Sure to Undo Delete?"
                onConfirm={() => undoDeleteFunction(record)}
              >
                <a>Deploy</a>
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
        loading={bank.loading_bank_list}
        size="small"
        scroll={{ x: 1300 }}
      />
    </Form>
  );
};

export default NonDeployedBanks;
