export interface IPaginatedResponse {
  page: number;
  total_pages: number;
  total_results: number;
  results: Array<any>;
}