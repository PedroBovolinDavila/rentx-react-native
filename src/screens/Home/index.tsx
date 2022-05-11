import React from "react";
import { useNavigation } from '@react-navigation/native'
import { StatusBar } from "react-native";
import { RFValue } from "react-native-responsive-fontsize";

import { Car } from "../../components/Car";

import Logo from '../../assets/logo.svg'

import {
  Container,
  Header,
  TotalCars,
  HeaderContent,
  CarList
} from './styles'

export function Home() {
  const navigation = useNavigation()

  const carDataOne = {
    brand: "Porshe",
    name: "Panamera",
    rent: {
      period: 'Ao dia',
      price: 340
    },
    thumbnail: "https://freepikpsd.com/file/2019/10/porsche-panamera-png-5-Transparent-Images.png"
  }

  function handleCarDetails() {
    navigation.navigate('CarDetails')
  }

  return (
    <Container>
      <StatusBar
        barStyle="light-content"
        backgroundColor="transparent"
        translucent
      />

      <Header>
        <HeaderContent>
          <Logo
            width={RFValue(108)}
            height={RFValue(12)}
          />
          <TotalCars>
            Total de 12 carros
          </TotalCars>
        </HeaderContent>
      </Header>

      <CarList
        data={[1, 2, 3, 4, 5, 6, 7]}
        keyExtractor={item => String(item)}
        renderItem={({ item }) => (
          <Car data={carDataOne} onPress={handleCarDetails} />
        )}
      />

    </Container>
  )
}