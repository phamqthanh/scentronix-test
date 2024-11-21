import axios from "axios";
import { findServer } from "./find-server";
import { describe, it, vi, expect } from "vitest";

// Mock the axios module

vi.mock("axios");

describe("findServer", () => {
  it("should return the server with the lowest priority that is online", async () => {
    // Mock the axios responses
    axios.get
      .mockResolvedValueOnce({ status: 200 }) // server 1 online
      .mockResolvedValueOnce({ status: 404 }) // server 2 offline
      .mockResolvedValueOnce({ status: 200 }) // server 3 online
      .mockResolvedValueOnce({ status: 200 }); // server 4 online

    const servers = [
      { url: "http://server3.com", priority: 3 },
      { url: "http://server2.com", priority: 2 },
      { url: "http://server1.com", priority: 1 },
      { url: "http://server4.com", priority: 5 },
    ];

    const result = await findServer(servers);

    // Check that the function returns the server with the lowest priority
    expect(result.url).toBe("http://server1.com");
    expect(result.priority).toBe(1);
  });

  it("should throw an error if no servers are online", async () => {
    axios.get
      .mockResolvedValueOnce({ status: 404 }) // server 1 offline
      .mockResolvedValueOnce({ status: 404 }) // server 2 offline
      .mockResolvedValueOnce({ status: 404 }); // server 3 offline

    const servers = [
      { url: "http://server1.com", priority: 1 },
      { url: "http://server2.com", priority: 2 },
      { url: "http://server3.com", priority: 0 },
    ];

    await expect(findServer(servers)).rejects.toThrow("No servers are online");
  });
});
