const request = require("supertest");
const app = require("../app");

describe("Login Cliente - TDD", () => {

  test("deve retornar erro se faltar identificação (email/cpf)", async () => {
    const res = await request(app).post("/login/cliente").send({
      user: "",
      senha: "123"
    });
    expect(res.status).toBe(400);
  });

  test("deve retornar erro se faltar senha", async () => {
    const res = await request(app).post("/login/cliente").send({
      user: "cliente@teste.com",
      senha: ""
    });
    expect(res.status).toBe(400);
  });

  test("deve retornar erro se cliente não estiver ativo", async () => {
    const res = await request(app).post("/login/cliente").send({
      user: "inativo@cliente.com",
      senha: "123456"
    });
    expect(res.status).toBe(401);
  });

  test("deve retornar erro se credenciais estiverem erradas", async () => {
    const res = await request(app).post("/login/cliente").send({
      user: "cliente@teste.com",
      senha: "errada"
    });
    expect(res.status).toBe(401);
  });

  test("deve logar cliente ativo com sucesso", async () => {
    const res = await request(app).post("/login/cliente").send({
      user: "cliente@teste.com",
      senha: "123456"
    });
    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty("token");
  });

});
