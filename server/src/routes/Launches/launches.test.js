const request = require("supertest");
let app = require("../../app");
let {ConnectDB} = require("../../services/mongo.services");

describe("Launches API", () => {
  beforeAll( async () => {
    await ConnectDB();
  })

  describe("TEST GET /launches", () => {
    test("should response with 200 success", async () => {
      await request(app)
        .get("/launches")
        .expect(200)
        .expect("content-type", /json/);

      // expect(response.statusCode).toBe(200);
    }, 15000);
  });

  describe("TEST POST /launches", () => {
    const completeLaunchData = {
      missionName: "USS Enterprise",
      rocket: "NCC 1701-D",
      destination: "Kepler-62 f",
      launchDate: "January 4, 2028",
    };
    const IncompleteLaunchData = {
      missionName: "USS Enterprise",
      launchDate: "January 4, 2028",
    };

    const launchDataWithoutDate = {
      missionName: "USS Enterprise",
      rocket: "NCC 1701-D",
      destination: "Kepler-62 f",
    };
    const launchDataWith_Invalid_Date = {
      missionName: "USS Enterprise",
      rocket: "NCC 1701-D",
      launchDate: "adof  ",
      destination: "Kepler-62 f",
    };

    test("It should respond with 201 created", async () => {
      let response = await request(app)
        .post("/launches")
        .send(completeLaunchData)
        .expect(201)
        .expect("content-type", /json/);

      const requestDate = new Date(completeLaunchData.launchDate).valueOf();
      const responseDate = new Date(response.body.launchDate).valueOf();
      //Comparing the data that was RECEIVED vs.the data that was supposed to be Received.
      expect(responseDate).toBe(requestDate);

      expect(response.body).toMatchObject(launchDataWithoutDate);
    });

    test("It should catch missing required properties", async () => {
      let errorResponse = {
        error: "Missing required launch Data",
      };
      let response = await request(app)
        .post("/launches")
        .send(IncompleteLaunchData)
        .expect(400)
        .expect("content-type", /json/);

      // COMPARING WHAT IS RECEIVED VS WHAT ACTUALLY SUPPOSED TO BE/EXPECTED.
      // expect(received).toStrictEqual(expected);
      expect(response.body).toStrictEqual(errorResponse);
    });
    test("It should catch Invalid dates", async () => {
      const response = await request(app)
        .post("/launches")
        .send(launchDataWith_Invalid_Date)
        .expect("Content-Type", /json/)
        .expect(400);

      expect(response.body).toStrictEqual({
        error: "Invalid Launch Date",
      });
    });
  });
});

const houseForSale = {
  bath: true,
  bedrooms: 4,
  kitchen: {
    amenities: ["oven", "stove", "washer"],
    area: 20,
    wallColor: "white",
  },
};
const desiredHouse = {
  bath: true,
  kitchen: {
    amenities: ["oven", "stove", "washer"],
    wallColor: expect.stringMatching(/white|yellow/),
  },
};

test("the house has my desired features", () => {
  expect(houseForSale).toMatchObject(desiredHouse);
});
