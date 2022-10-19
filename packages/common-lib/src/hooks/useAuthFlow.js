import * as userRegistryService from '../services/userRegistryService'
import { useState, useEffect } from 'react'

export const useAuthFlow = () => {
  const [loggedInUser, setLoggedInUser] = useState()
  useEffect(async () => {
    const resultTeacher = await userRegistryService.getOne({}, {})
    if (resultTeacher) {
      let id = resultTeacher.id
      localStorage.setItem('id', id)
      localStorage.setItem('name', resultTeacher.name)
      localStorage.setItem('name', resultTeacher.name)
      localStorage.setItem('grade', resultTeacher.grade)
      localStorage.setItem('medium', resultTeacher.medium)
      localStorage.setItem('board', resultTeacher.board)
      setLoggedInUser(resultTeacher)
    }
  }, [])

  return loggedInUser
}
