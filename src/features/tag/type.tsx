export interface TagState {
  tag_form_active: boolean;
  hardware_team_list: TypeHardwareTeam[];
  loading_hardware_team_list: boolean;
  loading_create_tag: boolean;
  message: TypeMessage;
  tag_list: {
    deployedTagDetails: TypeTagList[];
    unDeployedTagDetails: TypeTagList[];
  };
  loading_tag_list: boolean;
  loading_update_tag: boolean;
  loading_delete_tag: boolean;
}

export interface TypeHardwareTeam {
  id: string;
  name: string;
}

export interface TypeCreateTag {
  hwTagId: string;
  madeBy: string;
  madeDate: string;
  testedBy: string;
  testedDate: string;
}

export interface TypeMessage {
  message_type: "success" | "error" | "warning" | "info" | string;
  message_string: string;
}

export interface TypeTagList {
  hwTagId: string;
  madeBy: string;
  madeDate: string;
  testedBy: string;
  testedDate: string;
  farmId: string;
  testedByName: string;
  madeByName: string;
}
