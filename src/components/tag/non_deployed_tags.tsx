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
} from "antd";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { getTagList, updateTag, deleteTag } from "../../features/tag/tagSlice";
import dayjs from "dayjs";
interface DataType {
  farmId: any;
  hwTagId: any;
  madeBy: any;
  madeDate: any;
  testedBy: any;
  testedDate: any;
  testedByName: any;
  madeByName: any;
}

interface EditableCellProps extends React.HTMLAttributes<HTMLElement> {
  editing: boolean;
  dataIndex: string;
  title: any;
  inputType: "select" | "text" | "date";
  record: DataType;
  index: number;
}

const NonDeployedTags: React.FC = () => {
  const tag = useAppSelector((state) => state.tag);
  const dispatch = useAppDispatch();
  const [form] = Form.useForm();
  const [data, setData] = useState(tag.tag_list.unDeployedTagDetails);
  const [editingKey, setEditingKey] = useState("");

  useEffect(() => {
    setData(tag.tag_list.unDeployedTagDetails);
  }, [tag.tag_list]);
  const isEditing = (record: DataType) => record.hwTagId === editingKey;

  const edit = (record: Partial<DataType>) => {
    form.setFieldsValue({
      madeByName: record.madeByName,
      testedByName: record.testedByName,
      madeDate: dayjs(record.madeDate),
      testedDate: dayjs(record.testedDate),
    });
    setEditingKey(record.hwTagId);
  };
  const deleteFunction = (record: Partial<DataType>) => {
    dispatch(deleteTag(record.hwTagId));
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
      const index = newData.findIndex((item) => key === item.hwTagId);
      if (index > -1) {
        const item = newData[index];
        dispatch(
          updateTag({
            hwTagId: item.hwTagId,
            madeBy: row.madeByName,
            madeDate: dayjs(row.madeDate).format("YYYY-MM-DD"),
            testedBy: row.testedByName,
            testedDate: dayjs(row.testedDate).format("YYYY-MM-DD"),
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
      title: "ID",
      dataIndex: "hwTagId",
      width: "15%",
      editable: false,
    },
    // {
    //   title: "Farm ID",
    //   dataIndex: "farmId",
    //   width: "15%",
    //   editable: false,
    // },
    {
      title: "Made By",
      dataIndex: "madeByName",
      width: "20%",
      editable: true,
    },
    {
      title: "Made Date",
      dataIndex: "madeDate",
      width: "15%",
      editable: true,
    },
    {
      title: "Tested By",
      dataIndex: "testedByName",
      width: "15%",
      editable: true,
    },
    {
      title: "Tested Date",
      dataIndex: "testedDate",
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
              onClick={() => save(record.hwTagId)}
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
    const inputNode =
      inputType === "select" ? (
        <Select
          options={tag.hardware_team_list.map((team) => {
            return { value: team.id, label: team.name };
          })}
        />
      ) : inputType === "date" ? (
        <DatePicker />
      ) : (
        <Input />
      );

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
  //     getTagList({
  //       size: 1,
  //       page: 3,
  //       sortBy: "madeDate",
  //       order: "ASE",
  //       status: 0,
  //     })
  //   );
  // }, [tag.loading_update_tag]);
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
        loading={tag.loading_tag_list}
        size="small"
      />
    </Form>
  );
};

export default NonDeployedTags;
