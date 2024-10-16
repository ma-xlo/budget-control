// middlewares/auth.js
export function validateAuthorization(authHeader) {
    // Simula a validação de autorização, verifica se o token está presente
    if (authHeader === 'Bearer token') {
      console.log("dwandjawdba")
      return { id: 1 }; // Simula um usuário autorizado
    }
    return null; // Não autorizado
  }