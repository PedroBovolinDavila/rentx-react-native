import React, { useEffect, useState } from "react";
import { GestureHandlerRootView, RectButton, PanGestureHandler } from "react-native-gesture-handler";
import { Ionicons } from '@expo/vector-icons'
import { useNavigation } from '@react-navigation/native'
import { StatusBar, StyleSheet, BackHandler } from "react-native";
import { RFValue } from "react-native-responsive-fontsize";

import Animated, {
  useSharedValue,
  useAnimatedStyle,
  useAnimatedGestureHandler,
  withSpring
} from 'react-native-reanimated'

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
} from './styles'

const ButtonAnimated = Animated.createAnimatedComponent(RectButton);

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

  const positionY = useSharedValue(0)
  const positionX = useSharedValue(0)

  const myCarsButtonAnimatedStyle = useAnimatedStyle(() => {
    return {
      transform: [
        { translateX: positionX.value },
        { translateY: positionY.value }
      ]
    }
  })

  const onGestureEvent = useAnimatedGestureHandler({
    onStart: (_, ctx: any) => {
      ctx.positionX = positionX.value
      ctx.positionY = positionY.value
    },
    onActive: (event, ctx: any) => {
      positionX.value = ctx.positionX + event.translationX
      positionY.value = ctx.positionY + event.translationY
    },
    onEnd: () => {
      positionX.value = withSpring(0);
      positionY.value = withSpring(0);
    }
  })

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

  useEffect(() => {
    BackHandler.addEventListener('hardwareBackPress', () => true);
    return () => BackHandler.removeEventListener('hardwareBackPress', () => true);
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

        <PanGestureHandler onGestureEvent={onGestureEvent}>
          <Animated.View
            style={[
              myCarsButtonAnimatedStyle,
              {
                position: 'absolute',
                bottom: 22,
                right: 22
              }
            ]}
          >
            <ButtonAnimated
              onPress={handleOpenMyCars}
              style={[
                styles.button,
                { backgroundColor: theme.colors.main }
              ]}
            >
              <Ionicons
                name="ios-car-sport"
                size={32}
                color={theme.colors.shape}
              />
            </ButtonAnimated>
          </Animated.View>
        </PanGestureHandler>

      </Container>
    </GestureHandlerRootView>
  )
}

const styles = StyleSheet.create({
  button: {
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center'
  }
})