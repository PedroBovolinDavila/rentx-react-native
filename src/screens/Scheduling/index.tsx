import React from "react";
import { useNavigation } from "@react-navigation/native"

import { BackButton } from "../../components/BackButton";
import { Button } from "../../components/Button";
import { Calendar } from "../../components/Calendar";

import ArrowSvg from '../../assets/arrow.svg'

import { useTheme } from "styled-components";

import {
  Container,
  Header,
  BackButtonWrapper,
  Title,
  RentalPeriod,
  DateInfo,
  DateTitle,
  DateValue,
  Content,
  Footer
} from './styles'
import { StatusBar } from "react-native";

export function Scheduling() {
  const theme = useTheme()
  const navigation = useNavigation();

  function handleSchedulingDetails() {
    navigation.navigate("SchedulingDetails");
  }

  return (
    <Container>
      <StatusBar
        barStyle="light-content"
        backgroundColor="transparent"
        translucent
      />

      <Header>
        <BackButtonWrapper>
          <BackButton onPress={() => { }} color={theme.colors.shape} />
        </BackButtonWrapper>

        <Title>
          Escolha uma {'\n'}
          data de inicio e {'\n'}
          fim do aluguel
        </Title>

        <RentalPeriod>
          <DateInfo>
            <DateTitle>DE</DateTitle>
            <DateValue selected={false}>
              18/06/2021
            </DateValue>
          </DateInfo>

          <ArrowSvg />

          <DateInfo>
            <DateTitle>ATÉ</DateTitle>
            <DateValue selected={false}>
              18/06/2021
            </DateValue>
          </DateInfo>
        </RentalPeriod>
      </Header>

      <Content>
        <Calendar />
      </Content>

      <Footer>
        <Button
          title="Confirmar"
          onPress={handleSchedulingDetails}
        />
      </Footer>
    </Container >
  )
}