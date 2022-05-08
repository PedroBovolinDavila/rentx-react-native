import React from "react";

import { BackButton } from "../../components/BackButton";

import { useTheme } from "styled-components";

import {
  Container,
  Header,
  BackButtonWrapper,
  Title,
} from './styles'

export function Scheduling() {
  const theme = useTheme()

  return (
    <Container>
      <Header>
        <BackButtonWrapper>
          <BackButton onPress={() => { }} color={theme.colors.shape} />
        </BackButtonWrapper>

        <Title>
          Escolha uma {'\n'}
          Data de inicio e {'\n'}
          fim do aluguel
        </Title>
      </Header>
    </Container>
  )
}