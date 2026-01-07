export interface IDatabaseClient {
  query<T = any>(text: string, params?: any[]): Promise<{ rows: T[] }>;
}