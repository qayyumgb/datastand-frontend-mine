export interface Error {
  type: string;
  message: string;
}

export interface ValidationResult {
  isValid: boolean;
  errors?: Error[];
}
