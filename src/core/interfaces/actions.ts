import { ErrorInfo } from 'react';

export class EmptyAction {
  constructor(public readonly type: string) {}
}

// tslint:disable-next-line: max-classes-per-file
export class PayloadAction<T> extends EmptyAction {
  constructor(public readonly type: string, public readonly payload: T) {
    super(type);
  }
}

// tslint:disable-next-line: max-classes-per-file
export class FailureAction extends EmptyAction {
  constructor(type: string, public readonly payload: ErrorInfo) {
    super(type);
  }
}

export type ApplicationAction = PayloadAction<any> | FailureAction | EmptyAction;
