import React, { useEffect } from "react";
import { Button, message } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { setTagFormActive, getTagList } from "../../features/tag/tagSlice";
import TagForm from "./tag_form";
import TagTable from "./tag_table";

const TagIndex: React.FC = () => {
  const dispatch = useAppDispatch();
  const [messageApi, contextHolder] = message.useMessage();

  const tag = useAppSelector((state) => state.tag);
  useEffect(() => {
    messageApi.open({
      type: tag.message.message_type,
      content: tag.message.message_string,
    });
  }, [tag.message]);
  useEffect(() => {
    dispatch(getTagList());
  }, [tag.loading_update_tag, tag.loading_delete_tag, tag.loading_create_tag]);

  return (
    <>
      {contextHolder}
      <Button
        type="primary"
        onClick={() => dispatch(setTagFormActive(!tag.tag_form_active))}
      >
        <PlusOutlined />
        Add Tag
      </Button>
      <br />
      <br />
      <TagForm />
      <TagTable />
    </>
  );
};
export default TagIndex;
