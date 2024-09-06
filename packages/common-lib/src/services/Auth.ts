import axios from 'axios'

export function fetchToken(
  authUrl: string,
  username: string,
  password: string
): Promise<any> {
  const params = new URLSearchParams()
  params.append('client_id', 'hasura-app')
  params.append('username', username)
  params.append('password', password)
  params.append('grant_type', 'password')
  params.append('client_secret', '9ca6e96d-f72e-4208-91f4-a2d8e681f767')

  const config = {
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      'Access-Control-Allow-Origin': '*'
    }
  }

  return axios.post(authUrl, params, config).catch((e) => e)
}
