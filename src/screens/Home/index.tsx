import React from "react";
import { StatusBar } from "react-native";
import { RFValue } from "react-native-responsive-fontsize";

import { Car } from "../../components/Car";

import Logo from '../../assets/logo.svg'

import {
  Container,
  Header,
  TotalCars,
  HeaderContent
} from './styles'

export function Home() {
  const carDataOne = {
    brand: "Audi",
    name: "RS 5 Coupé",
    rent: {
      period: 'Ao dia',
      price: 120
    },
    thumbnail: "https://www.pngplay.com/wp-content/uploads/13/Audi-RS5-PNG-HD-Quality.png"
  }

  const carDataTwo = {
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

      <Car data={carDataOne} />
      <Car data={carDataTwo} />
    </Container>
  )
}