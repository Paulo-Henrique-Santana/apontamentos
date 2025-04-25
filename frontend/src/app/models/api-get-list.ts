export interface ApiGetList<T> {
  items: T[];
  hasNext: boolean;
  total: number;
}