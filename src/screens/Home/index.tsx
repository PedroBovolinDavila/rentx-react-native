import React from "react";
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
  const carDataOne = {
    brand: "Porshe",
    name: "Panamera",
    rent: {
      period: 'Ao dia',
      price: 340
    },
    thumbnail: "https://cdn.jdpower.com/ChromeImageGallery/Expanded/White/640/2016PRC010009_640/2016PRC010009_640_01.jpg"
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
        renderItem={({ item }) => <Car data={carDataOne} />}
      />

    </Container>
  )
}