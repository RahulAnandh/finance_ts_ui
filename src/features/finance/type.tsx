export interface FinanceState {
  finance_form_active: boolean;
  hardware_team_list: TypeHardwareTeam[];
  loading_hardware_team_list: boolean;
  loading_create_finance: boolean;
  message: TypeMessage;
  finance_list: {
    deleted: TypeFinanceList[];
    not_deleted: TypeFinanceList[];
  };
  loading_finance_list: boolean;
  loading_update_finance: boolean;
  loading_delete_finance: boolean;
}

export interface TypeHardwareTeam {
  id: string;
  name: string;
}

export interface TypeCreateFinance {
  finance_id: string;
  town: string;
  city: string;
  district: string;
  state: string;
}

export interface TypeMessage {
  message_type: "success" | "error" | "warning" | "info" | string;
  message_string: string;
}

export interface TypeFinanceList {
  id: number;
  finance_id: string;
  town: string;
  city: string;
  district: string;
  state: string;
  is_deleted: boolean;
}
