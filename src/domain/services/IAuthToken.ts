export interface IAuthToken {
    sign(payload: object): string;
    verify(token: string): any;
}