export interface EmployeeState {
  employee_form_active: boolean;
  hardware_team_list: TypeHardwareTeam[];
  loading_hardware_team_list: boolean;
  loading_create_employee: boolean;
  message: TypeMessage;
  employee_list: {
    deleted: TypeEmployeeList[];
    not_deleted: TypeEmployeeList[];
  };
  loading_employee_list: boolean;
  loading_update_employee: boolean;
  loading_delete_employee: boolean;
}

export interface TypeHardwareTeam {
  id: string;
  name: string;
}

export interface TypeCreateEmployee {
  employee_id: string;
  town: string;
  city: string;
  district: string;
  state: string;
}

export interface TypeMessage {
  message_type: "success" | "error" | "warning" | "info" | string;
  message_string: string;
}

export interface TypeEmployeeList {
  id: number;
  employee_id: string;
  town: string;
  city: string;
  district: string;
  state: string;
  is_deleted: boolean;
}
