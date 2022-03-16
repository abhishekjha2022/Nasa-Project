const request = require("supertest");
const app = require("../app");

describe("Test GET /launches", () => {
  test("It should respond with 200 success", async () => {
    const response = await request(app)
      .get("/launches")
      .expect(200)
      .expect("Content-Type", /json/);
  });
});

describe("Text POST / launches", () => {
  const completeLaunchData = {
    mission: "Mars colonize",
    rocket: "NCC 1701-D",
    target: "Kepler-186 f",
    launchDate: "June 14 2030",
  };

  const launchDataWithoutDate = {
    mission: "Mars colonize",
    rocket: "NCC 1701-D",
    target: "Kepler-186 f",
  };

  const invalidLaunchDate = {
    mission: "Mars colonize",
    rocket: "NCC 1701-D",
    target: "Kepler-186 f",
    launchDate: "hello",
  };

  test("It should response with 201 created", async () => {
    const response = await request(app)
      .post("/launches")
      .send(completeLaunchData)
      .expect("Content-Type", /json/)
      .expect(201);

    const requestDate = new Date(completeLaunchData.launchDate).valueOf();
    const responseDate = new Date(response.body.launchDate).valueOf();

    expect(responseDate).toBe(requestDate);
    expect(response.body).toMatchObject(launchDataWithoutDate);
  });

  test("It should catch missing requires properties", async () => {
    const response = await request(app)
      .post("/launches")
      .send(launchDataWithoutDate)
      .expect("Content-Type", /json/)
      .expect(400);
    expect(response.body).toStrictEqual({
      error: "Missing required information",
    });
  });
  test("It should catch invalid date", async () => {
    const response = await request(app)
      .post("/launches")
      .send(invalidLaunchDate)
      .expect("Content-Type", /json/)
      .expect(400);
    expect(response.body).toStrictEqual({
      error: "Invalid date type",
    });
  });
});
