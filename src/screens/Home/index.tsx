import React, { useEffect, useState } from "react";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { Ionicons } from '@expo/vector-icons'
import { useNavigation } from '@react-navigation/native'
import { StatusBar } from "react-native";
import { RFValue } from "react-native-responsive-fontsize";

import { Car } from "../../components/Car";
import { Load } from '../../components/Load'

import api from "../../services/api";
import { ICarDTO } from "../../dtos/CarDTO";

import Logo from '../../assets/logo.svg'

import { useTheme } from "styled-components";

import {
  Container,
  Header,
  TotalCars,
  HeaderContent,
  CarList,
  MyCarsButton
} from './styles'

interface INavigationProps {
  navigate: (
    screen: string,
    carObject?: {
      car: ICarDTO;
    }
  ) => void;
}

export function Home() {
  const [cars, setCars] = useState<ICarDTO[]>([]);
  const [loading, setLoading] = useState(true)

  const theme = useTheme();
  const navigation = useNavigation<INavigationProps>()

  function handleCarDetails(car: ICarDTO) {
    navigation.navigate('CarDetails', { car });
  }

  function handleOpenMyCars() {
    navigation.navigate('MyCars')
  }

  useEffect(() => {
    async function fetchCars() {
      try {
        const response = await api.get('/cars')
        setCars(response.data);
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false)
      }
    }

    fetchCars()
  }, [])

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
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
              Total de {cars.length} carros
            </TotalCars>
          </HeaderContent>
        </Header>
        {
          loading ?
            <Load /> :
            <CarList
              data={cars}
              keyExtractor={item => String(item.id)}
              renderItem={({ item }) => (
                <Car data={item} onPress={() => handleCarDetails(item)} />
              )}
            />
        }
        <MyCarsButton onPress={handleOpenMyCars}>
          <Ionicons
            name="ios-car-sport"
            size={32}
            color={theme.colors.shape}
          />
        </MyCarsButton>
      </Container>
    </GestureHandlerRootView>
  )
}