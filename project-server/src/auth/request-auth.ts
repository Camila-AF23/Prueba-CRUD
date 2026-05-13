export interface IRequestAuth extends Request {
  user: {
    id: number;
    email: string;
  };
}
