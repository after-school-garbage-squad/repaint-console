import { rest } from "msw";

export const handlers = [
  rest.get("/admin/:adminId/event/list", (req, res, ctx) => {
    const { adminId } = req.params;
    return adminId === "admin"
      ? res(
          ctx.json({
            events: [
              {
                id: "id1",
                url: "https://www.google.com",
                name: "event1",
                beacons: [
                  {
                    serviceUUID: "serviceuuid1",
                    HWID: "hwid1",
                  },
                ],
                image_id: ["imageid"],
                contact: {
                  name: "name1",
                  email: "email1",
                  phone: "phone1",
                },
              },
              {
                id: "id1",
                url: "https://www.google.com",
                name: "event1",
                beacons: [
                  {
                    serviceUUID: "serviceuuid1",
                    HWID: "hwid1",
                  },
                ],
                image_id: ["imageid"],
                contact: {
                  name: "name1",
                  email: "email1",
                  phone: "phone1",
                },
              },
            ],
          }),
        )
      : res(
          ctx.status(401),
          ctx.json({
            error: "Unauthorized",
          }),
        );
  }),
];
