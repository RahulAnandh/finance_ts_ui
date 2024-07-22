import React, { useEffect } from "react";
import {
  DatePicker,
  Drawer,
  Form,
  Input,
  Select,
  Row,
  Col,
  Button,
  GetProps,
} from "antd";
import dayjs from "dayjs";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import {
  setTagFormActive,
  getUsershardwareTeam,
  createTag,
} from "../../features/tag/tagSlice";
const TagForm: React.FC = () => {
  const tag = useAppSelector((state) => state.tag);
  const dispatch = useAppDispatch();
  const [form] = Form.useForm();
  useEffect(() => {
    dispatch(getUsershardwareTeam());
  }, []);
  const onFinish = (values: any) => {
    dispatch(
      createTag({
        hwTagId: values.hwTagId,
        madeBy: values.madeBy,
        madeDate: dayjs(values.madeDate).format("YYYY-MM-DD"),
        testedBy: values.testedBy,
        testedDate: dayjs(values.testedDate).format("YYYY-MM-DD"),
      })
    );
  };
  type RangePickerProps = GetProps<typeof DatePicker.RangePicker>;

  const disabledDate: RangePickerProps["disabledDate"] = (current) => {
    return current && current > dayjs().endOf("day");
  };
  return (
    <>
      <Drawer
        title="Create Tag"
        onClose={() => dispatch(setTagFormActive(false))}
        open={tag.tag_form_active}
        maskClosable={false}
      >
        <Form
          form={form}
          name="validateOnly"
          layout="vertical"
          autoComplete="off"
          onFinish={onFinish}
        >
          <Form.Item name="hwTagId" label="Tag ID" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item name="madeBy" label="Made By" rules={[{ required: true }]}>
            <Select
              showSearch
              placeholder="Select a person"
              optionFilterProp="label"
              options={
                tag.hardware_team_list &&
                tag.hardware_team_list.map((dta) => {
                  return { value: dta.id, label: dta.name };
                })
              }
              loading={tag.loading_hardware_team_list}
            />
          </Form.Item>

          <Row gutter={24}>
            <Col>
              <Form.Item
                name="madeDate"
                label="Made Date"
                rules={[{ required: true }]}
              >
                <DatePicker disabledDate={disabledDate} />
              </Form.Item>
            </Col>
            <Col>
              <Form.Item
                name="testedDate"
                label="Tested Date"
                rules={[{ required: true }]}
              >
                <DatePicker disabledDate={disabledDate} />
              </Form.Item>
            </Col>
          </Row>
          <Form.Item
            name="testedBy"
            label="Tested By"
            rules={[{ required: true }]}
          >
            <Select
              showSearch
              placeholder="Select a person"
              optionFilterProp="label"
              options={
                tag.hardware_team_list &&
                tag.hardware_team_list.map((dta) => {
                  return { value: dta.id, label: dta.name };
                })
              }
              loading={tag.loading_hardware_team_list}
            />
          </Form.Item>
          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              style={{ width: "100%" }}
              loading={tag.loading_create_tag}
            >
              Create
            </Button>
          </Form.Item>
        </Form>
      </Drawer>
    </>
  );
};

export default TagForm;
