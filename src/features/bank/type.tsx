export interface BankState {
  bank_form_active: boolean;
  hardware_team_list: TypeHardwareTeam[];
  loading_hardware_team_list: boolean;
  loading_create_bank: boolean;
  message: TypeMessage;
  bank_list: {
    deleted: TypeBankList[];
    not_deleted: TypeBankList[];
  };
  loading_bank_list: boolean;
  loading_update_bank: boolean;
  loading_delete_bank: boolean;
}

export interface TypeHardwareTeam {
  id: string;
  name: string;
}

export interface TypeCreateBank {
  bank_name: string;
  acc_no: string;
  ifsc: string;
  branch: string;
  acc_hol: string;
  acc_type: string;
  town: string;
  city: string;
  district: string;
  bank_state: string;
}
export interface TypeUpdateBank {
  id: number;
  bank_name: string;
  acc_no: string;
  ifsc: string;
  branch: string;
  acc_hol: string;
  acc_type: string;
  town: string;
  city: string;
  district: string;
  bank_state: string;
}

export interface TypeMessage {
  message_type: "success" | "error" | "warning" | "info" | string;
  message_string: string;
}

export interface TypeBankList {
  id: number;
  bank_name: string;
  acc_no: string;
  ifsc: string;
  branch: string;
  acc_hol: string;
  acc_type: string;
  town: string;
  city: string;
  district: string;
  bank_state: string;
  is_deleted: boolean;
}
