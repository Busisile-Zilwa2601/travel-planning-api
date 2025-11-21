import { gql } from "apollo-server";
import { server } from "../src/server";

describe("Health Check Query", () => {
    afterAll(async () => {
        await server.stop();
        jest.resetAllMocks();
    });

    it("runs a health check query", async () => {
        const results = await server.executeOperation({
            query: gql`
                query {
                    test(bool: false)
                }
            `,
        });
        expect(results).toBeTruthy();
    });
});