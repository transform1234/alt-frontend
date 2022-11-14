import * as userRegistryService from '../services/userRegistryService'
import { useState, useEffect } from 'react'

export const useAuthFlow = () => {
  const [loggedInUser, setLoggedInUser] = useState()
  useEffect(async () => {
    setLoggedInUser(await getAuthUser())
  }, [])

  return loggedInUser
}

export const getAuthUser = async () => {
  const resultUser = await userRegistryService.getOne()
  if (resultUser) {
    let id = resultUser.id
    localStorage.setItem('id', id)
    localStorage.setItem('name', resultUser.name)
    localStorage.setItem('grade', resultUser.grade)
    localStorage.setItem('medium', resultUser.medium)
    localStorage.setItem('board', resultUser.board)
    return resultUser
  }
  return {}
}
