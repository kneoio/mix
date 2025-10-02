export interface ApiFormResponse<T = unknown> {
  docData: T;
  actions: unknown[];
}

export interface ApiViewPageResponse<T = unknown> {
  actions: { caption: string }[];
  viewData: ViewData<T>;
}

export interface ViewData<T = unknown> {
  count: number;
  pageNum: number;
  maxPage: number;
  pageSize: number;
  entries: T[];
}
