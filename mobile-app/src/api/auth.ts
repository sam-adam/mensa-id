export interface LoginPayload {
  email: string;
  password: string;
  device_name: string;
}

export interface GetUserResponse {
  name: string;
  email: string;
}

export async function postLogin(payload: LoginPayload): Promise<string> {
  const apiUrl = process.env.EXPO_PUBLIC_API_URL;

  const response = await fetch(`${apiUrl}/api/sanctum/token`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: payload
  });

  if (!response.ok) {
    throw new Error('Failed to login');
  }

  return await response.json();
}

export async function getUser(token: string): Promise<GetUserResponse> {
  const apiUrl = process.env.EXPO_PUBLIC_API_URL;

  const response = await fetch(`${apiUrl}/api/user`, {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: payload
  });

  if (!response.ok) {
    throw new Error('Failed to get user');
  }

  return await response.json();
}
