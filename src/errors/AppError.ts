class AppError {
  public readonly message: string;

  public readonly statusCode: number;

  // construtor que vai pegar uma string e retornar um status de erro utlizando o status code generico 400 caso não tenha status code informado
  constructor(message: string, statusCode = 400) {
    this.message = message;
    this.statusCode = statusCode;
  }
}

export default AppError;
