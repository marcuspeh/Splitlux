import React, { useEffect } from 'react'
import { Loading } from '../componments/loading'
import { ServerService } from '../service/serverService'


const LoadingUnauthenticated = ({ navigation }: any) => {

  const checkIsServerUp = async (): Promise<void> => {
    const result = await ServerService.checkServer()
    if (result.isSuccess) {
      navigation.navigate('Login')
    }
  }

  useEffect(() => {
    checkIsServerUp()
  })

  return (
    <Loading />
  )
}

export default LoadingUnauthenticated