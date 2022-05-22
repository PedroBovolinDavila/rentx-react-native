import React, { useEffect } from "react";
import { StatusBar } from "react-native";
import { useNavigation } from "@react-navigation/native";

import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  interpolate,
  Extrapolate,
  runOnJS
} from "react-native-reanimated";

import BrandSvg from '../../assets/brand.svg'
import LogoSvg from '../../assets/logo.svg'

import {
  Container
} from './styles'

export function Splash() {
  const navigation = useNavigation()
  const splashAnimation = useSharedValue(0);

  const brandStyle = useAnimatedStyle(() => {
    return {
      opacity: interpolate(
        splashAnimation.value,
        [0, 50],
        [1, 0],
      ),
      transform: [
        {
          translateX: interpolate(
            splashAnimation.value,
            [0, 50],
            [0, -50],
            Extrapolate.CLAMP
          )
        }
      ]
    }
  })

  const logoStyle = useAnimatedStyle(() => {
    return {
      opacity: interpolate(
        splashAnimation.value,
        [0, 25, 50, 90, 100],
        [0, .3, 1, 1, 0],
      ),
      transform: [
        {
          translateX: interpolate(
            splashAnimation.value,
            [0, 50, 90, 100],
            [-50, 0, 0, -50],
            Extrapolate.CLAMP
          )
        }
      ]
    }
  })

  function startApp() {
    navigation.navigate('Home')
  }

  useEffect(() => {
    splashAnimation.value = withTiming(
      100,
      { duration: 3000 },
      () => {
        'worklet'
        runOnJS(startApp)()
      }
    )
  }, [])

  return (
    <Container>
      <StatusBar
        barStyle="light-content"
        translucent
        backgroundColor="transparent"
      />

      <Animated.View style={[brandStyle, { position: "absolute" }]}>
        <BrandSvg
          width={80}
          height={50}
        />
      </Animated.View>

      <Animated.View style={[logoStyle, { position: "absolute" }]}>
        <LogoSvg
          width={180}
          height={20}
        />
      </Animated.View>

    </Container>
  )
}