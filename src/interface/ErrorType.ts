export interface ErrorType {
  [index: number]: { serial?: string };
}

export type ErrorTypes = Array<ErrorType>;
