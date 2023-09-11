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
<<<<<<< HEAD
  params.append('client_secret', '3282d5ac-52a5-490c-ac77-0cdcdc89e441')
=======
  params.append('client_secret', 'ae50a0a3-b1d3-4817-a474-cc0c97496018')
>>>>>>> admin

  const config = {
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      'Access-Control-Allow-Origin': '*'
    }
  }

  return axios.post(authUrl, params, config).catch((e) => e)
}
