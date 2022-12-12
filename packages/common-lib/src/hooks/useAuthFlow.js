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
    localStorage.setItem('section', resultUser.section)
    return resultUser
  }
  return {}
}

export const checkAuth = async () => {
  const token = localStorage.getItem('token')
  if (token) {
    const resultUser = await userRegistryService.getAuthUser()
    if (resultUser?.email) {
      return token
    } else {
      localStorage.removeItem('token')
    }
    window.location.reload()
  }
}
