import { Server } from '@/types/server';

async function fetchServers(): Promise<Server[]> {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/servers`, {
    cache: 'no-store',
  });
  if (!response.ok) {
    throw new Error('Failed to fetch servers');
  }
  return response.json();
}

export default async function HomePage() {
  let servers: Server[] = [];
  let error: string | null = null;

  try {
    servers = await fetchServers();
    console.log(servers);
  } catch (err) {
    error = err instanceof Error ? err.message : 'Error fetching servers';
  }

  return (
    <>
      <h1>Server List</h1>
      {error ? (
        <p>{error}</p>
      ) : servers.length === 0 ? (
        <p>No servers.</p>
      ) : (
        <ul>
          {servers.map((server) => (
            <li key={server.id}>{server.name}</li>
          ))}
        </ul>
      )}
    </>
  );
}
