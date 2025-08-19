export interface SnackBarData {
  message: string,
  type: SnackBarType
}

export enum SnackBarType {
  SUCCESS = 'success',
  ERROR = 'error',
}