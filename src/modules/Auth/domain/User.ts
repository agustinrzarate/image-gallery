export interface User {
  username: string;
  password: string;
}

export const initialState: User = {
  username: '',
  password: '',
};
