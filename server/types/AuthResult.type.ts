export interface AuthResult {
  message: string;
  data: {
    user: { id: string;
        email: string;
        name: string;
        role: string
    };
    token: string;
  };
}
