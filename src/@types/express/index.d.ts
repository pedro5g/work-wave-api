declare namespace Express {
  export interface Request {
    user: {
      id: string
      name: string
      role: string
    }
  }
}
