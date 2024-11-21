import axios from "axios";

// Helper function to fetch each server status
const fetchServerStatus = <T extends { url: string }>(server: T) => {
  return axios.get(server.url, { timeout: 5000 }).then((response) => {
    if (response.status > 199 && response.status < 300) return server;
    else throw new Error(`Server \`${server.url}\` is offline`);
  });
};

async function findServer(servers: { url: string; priority: number }[]) {
  try {
    const serverPromises = servers.map(fetchServerStatus);

    const onlineServers = await Promise.allSettled(serverPromises);

    const online = onlineServers
      .filter((result) => result.status === "fulfilled")
      .map((result) => result.value);

    if (online.length === 0) throw new Error("No servers are online");

    // Find server with the lowest priority (higher number = lower priority)
    return online.reduce((lowestPriorityServer, currentServer) => {
      return currentServer.priority < lowestPriorityServer.priority
        ? currentServer
        : lowestPriorityServer;
    });
  } catch (err) {
    throw err; // Reject with error if no servers are online
  }
}

export { findServer };
