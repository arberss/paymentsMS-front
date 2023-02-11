export interface IStatus {
  _id?: string | null;
  name: string;
  users?: number;
}

export enum StatusActionType {
  add = 'add',
  edit = 'edit',
}
