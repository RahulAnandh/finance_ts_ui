import React, { useEffect, useState } from "react";
import type { GetProp, UploadFile, UploadProps } from "antd";

import {
  DatePicker,
  Drawer,
  Form,
  Input,
  Row,
  Col,
  Button,
  Upload,
  Image,
} from "antd";
import dayjs from "dayjs";
import { PlusOutlined } from "@ant-design/icons";

import { useAppDispatch, useAppSelector } from "../../app/hooks";
import {
  setEmployeeFormActive,
  getUsershardwareTeam,
  createEmployee,
} from "../../features/employee/employeeSlice";
type FileType = Parameters<GetProp<UploadProps, "beforeUpload">>[0];

const getBase64 = (file: FileType): Promise<string> =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = (error) => reject(error);
  });
const EmployeeForm: React.FC = () => {
  const [fileList, setFileList] = useState<UploadFile[]>([]);
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState("");
  const employee = useAppSelector((state) => state.employee);
  const dispatch = useAppDispatch();
  const [form] = Form.useForm();
  useEffect(() => {
    dispatch(getUsershardwareTeam());
  }, []);
  const onFinish = (values: any) => {
    dispatch(
      createEmployee({
        first_name: values.first_name,
        last_name: values.last_name,
        date_of_birth: dayjs(values.date_of_birth).format("YYYY-MM-DD"),
        house_name: values.house_name,
        address: values.address,
        pin_code: values.pin_code,
        state: values.state,
      })
    );
  };
  const handlePreview = async (file: UploadFile) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj as FileType);
    }

    setPreviewImage(file.url || (file.preview as string));
    setPreviewOpen(true);
  };
  const uploadButton = (
    <button style={{ border: 0, background: "none" }} type="button">
      <PlusOutlined />
      <div style={{ marginTop: 8 }}>Upload</div>
    </button>
  );
  const handleChange: UploadProps["onChange"] = ({ fileList: newFileList }) =>
    setFileList(newFileList);
  return (
    <>
      <Drawer
        title="Create Employee"
        onClose={() => dispatch(setEmployeeFormActive(false))}
        open={employee.employee_form_active}
        maskClosable={false}
      >
        <Form
          form={form}
          name="validateOnly"
          layout="vertical"
          autoComplete="off"
          onFinish={onFinish}
        >
          <Col>
            <>
              <Upload
                action="https://660d2bd96ddfa2943b33731c.mockapi.io/api/upload"
                listType="picture-card"
                fileList={fileList}
                onPreview={handlePreview}
                onChange={handleChange}
              >
                {fileList.length >= 1 ? null : uploadButton}
              </Upload>
              {previewImage && (
                <Image
                  wrapperStyle={{ display: "none" }}
                  preview={{
                    visible: previewOpen,
                    onVisibleChange: (visible) => setPreviewOpen(visible),
                    afterOpenChange: (visible) =>
                      !visible && setPreviewImage(""),
                  }}
                  src={previewImage}
                />
              )}
            </>
          </Col>
          <Row>
            <Form.Item
              name="first_name"
              label="First Name"
              rules={[{ required: true }]}
              style={{ display: "inline-block", width: "calc(50% - 8px)" }}
            >
              <Input />
            </Form.Item>

            <Form.Item
              name="last_name"
              label="Last Name"
              rules={[{ required: true }]}
              style={{
                display: "inline-block",
                width: "calc(50% - 8px)",
                margin: "0 8px",
              }}
            >
              <Input />
            </Form.Item>
          </Row>
          <Col>
            <Form.Item
              name="date_of_birth"
              label="Tested Date"
              rules={[{ required: true }]}
            >
              <DatePicker />
            </Form.Item>
          </Col>
          <Col>
            <Form.Item
              name="house_name"
              label="House Name"
              rules={[{ required: true }]}
            >
              <Input />
            </Form.Item>
          </Col>

          <Col>
            <Form.Item
              name="address"
              label="Address Line"
              rules={[{ required: true }]}
            >
              <Input />
            </Form.Item>
          </Col>
          <Col>
            <Form.Item
              name="pin_code"
              label="Pin Code"
              rules={[{ required: true }]}
            >
              <Input />
            </Form.Item>
          </Col>
          <Col>
            <Form.Item name="state" label="State" rules={[{ required: true }]}>
              <Input />
            </Form.Item>
          </Col>
          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              style={{ width: "100%" }}
              loading={employee.loading_create_employee}
            >
              Create
            </Button>
          </Form.Item>
        </Form>
      </Drawer>
    </>
  );
};

export default EmployeeForm;
