import useAuth from '../../hooks/useAuth'
import { Redirect, Stack } from 'expo-router'
import React from 'react'

export default function AuthLayout() {
  const { user } = useAuth()

  if (user) {
    return <Redirect href={"/(home)/(tabs)"} />
  }

  return (
    <Stack screenOptions={{
        headerShown: false,
      }}/>
  )
}