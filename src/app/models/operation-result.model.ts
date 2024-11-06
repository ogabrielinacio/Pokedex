export interface OperationResult<T> {
    isSuccess: boolean;
    value?: T; 
    errorMessage?: string; 
    code: number; 
}