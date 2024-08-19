import React, { useEffect, useState } from "react";
import type { TableProps } from "antd";
import { Form, Input, Popconfirm, Table, Typography, Divider } from "antd";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import {
  updateFinance,
  undoDeleteFinance,
} from "../../features/finance/financeSlice";
interface DataType {
  finance_id: string;
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

const NonDeployedFinances: React.FC = () => {
  const finance = useAppSelector((state) => state.finance);
  const dispatch = useAppDispatch();
  const [form] = Form.useForm();
  const [data, setData] = useState(finance.finance_list.deleted);
  const [editingKey, setEditingKey] = useState("");

  useEffect(() => {
    setData(finance.finance_list.deleted);
  }, [finance.finance_list]);
  const isEditing = (record: DataType) => record.finance_id === editingKey;

  const edit = (record: Partial<DataType>) => {
    form.setFieldsValue({
      finance_id: record.finance_id,
      town: record.town,
      city: record.city,
      district: record.district,
      state: record.state,
    });
    setEditingKey(record.finance_id);
  };

  const undoDeleteFunction = (record: Partial<DataType>) => {
    dispatch(undoDeleteFinance(record.finance_id));
    setEditingKey("");
  };

  const cancel = () => {
    setEditingKey("");
  };

  const save = async (key: React.Key) => {
    try {
      const row = (await form.validateFields()) as DataType;
      const newData = [...data];
      const index = newData.findIndex((item) => key === item.finance_id);
      if (index > -1) {
        const item = newData[index];
        dispatch(
          updateFinance({
            finance_id: item.finance_id,
            town: row.town,
            city: row.city,
            district: row.district,
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
      title: "Finance Id",
      dataIndex: "finance_id",
      width: "15%",
      editable: false,
    },

    {
      title: "Town",
      dataIndex: "town",
      width: "20%",
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
              onClick={() => save(record.finance_id)}
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
                <a>Redeploy</a>
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
        loading={finance.loading_finance_list}
        size="small"
      />
    </Form>
  );
};

export default NonDeployedFinances;
