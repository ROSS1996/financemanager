export class AuthService {
  async login(email: string, password: string): Promise<{ statusCode: number, message: string }> {
    // TODO: Implement login logic
    return { statusCode: 200, message: 'Login successful' };
  }

  async register(email: string, password: string): Promise<{ statusCode: number, message: string }> {
    // TODO: Implement registration logic
    return { statusCode: 200, message: 'Registration successful' };
  }
}