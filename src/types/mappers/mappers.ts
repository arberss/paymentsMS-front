export interface IMapperProps<T> {
  data: T;
  clickedRowId?: string;
  showFooterTotal?: boolean;
}

export interface IMapperValues {
  columns: { key: string; name: string; [key: string]: any }[];
  rows: { key: string; [key: string]: any }[];
  bottomRows?: { key: string; [key: string]: any };
}
