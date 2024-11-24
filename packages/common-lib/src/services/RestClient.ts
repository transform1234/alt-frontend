import axios from 'axios'

export async function get(url: string, headers: any = {}) {
  if (sessionStorage.getItem('token') != undefined) {
    headers = {
      ...headers,
      Authorization: 'Bearer ' + sessionStorage.getItem('token')
    }
  }
  return await axios.get(url, {
    ...headers,
    headers: { ...headers?.headers, 'Access-Control-Allow-Origin': '*' }
  })
}

export async function post(url: string, body: any, headers: any = {}) {
  if (sessionStorage.getItem('token') != undefined) {
    headers = {
      ...headers,
      Authorization: 'Bearer ' + sessionStorage.getItem('token')
    }
  }
  return await axios.post(url, body, {
    ...headers,
    headers: { ...headers?.headers, 'Access-Control-Allow-Origin': '*' }
  })
}

export async function update(url: string, body: any, headers: any = {}) {
  if (sessionStorage.getItem('token') != undefined) {
    headers = {
      ...headers,
      Authorization: 'Bearer ' + sessionStorage.getItem('token')
    }
  }
  return await axios.put(url, body, {
    ...headers,
    headers: { ...headers?.headers, 'Access-Control-Allow-Origin': '*' }
  })
}

export async function distory(url: string, body: any, headers: any = {}) {
  if (sessionStorage.getItem('token') != undefined) {
    headers = {
      ...headers,
      Authorization: 'Bearer ' + sessionStorage.getItem('token')
    }
  }
  return await axios.delete(url, {
    ...headers,
    headers: { ...headers?.headers, 'Access-Control-Allow-Origin': '*' },
    data: body
  })
}

// get State data
export const getState = async (header = {}) => {
  let headers = {
    Authorization: 'Bearer ' + sessionStorage.getItem('token'),
    ContentType: 'application/json',
    Accept: 'application/json',
    ...header,
  };

  try {
    const result = await get(
      'https://alt-palooza.uniteframework.io/api/v1/student/getStatesList',
      { headers }
    );
    
    if (result?.data) {
      return result.data; 
    } else {
      return [];
    }
  } catch (error) {
    console.error('Error fetching states:', error);
    return [];
  }
};