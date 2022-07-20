import React, { useEffect } from 'react'
import { Loading } from '../componments/loading'
import { ServerService } from '../service/serverService'


const LoadingAuthenticated = ({ navigation }: any) => {
  const checkIsServerUp = async (): Promise<void> => {
    const result = await ServerService.checkServer()
    if (result.isSuccess) {
      navigation.navigate('Home')
    }
  }

  useEffect(() => {
    checkIsServerUp()
  })

  return (
    <Loading />
  )
}

export default LoadingAuthenticated