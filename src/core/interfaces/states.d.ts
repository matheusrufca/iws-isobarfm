import { ErrorInfo } from './error';
import { Nullable } from '../models/types';

export interface PageState {
  isLoading: boolean;
  resources: any;
}

export interface ApiResource<T> {
  data: Nullable<T>;
  error: boolean;
  errorData: Nullable<ErrorInfo>;
}
