const request = require("supertest");
const app = require("../app");

describe("Login Restaurante - TDD", () => {

  test("deve retornar erro se faltar identificação (email/cnpj)", async () => {
    const res = await request(app).post("/login/restaurante").send({
      identificacao: "",
      senha: "123"
    });
    expect(res.status).toBe(400);
  });

  test("deve retornar erro se faltar senha", async () => {
    const res = await request(app).post("/login/restaurante").send({
      user: "rest@teste.com",
      senha: ""
    });
    expect(res.status).toBe(400);
  });

  test("deve retornar erro se restaurante não estiver ativo", async () => {
    const res = await request(app).post("/login/restaurante").send({
      user: "inativo@rest.com",
      senha: "123456"
    });
    expect(res.status).toBe(401);
  });

  test("deve retornar erro se credenciais estiverem erradas", async () => {
    const res = await request(app).post("/login/restaurante").send({
      user: "rest@teste.com",
      senha: "errada"
    });
    expect(res.status).toBe(401);
  });

  test("deve logar restaurante ativo com sucesso", async () => {
    const res = await request(app).post("/login/restaurante").send({
      user: "rest@teste.com",
      senha: "123456"
    });
    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty("token");
  });

});
