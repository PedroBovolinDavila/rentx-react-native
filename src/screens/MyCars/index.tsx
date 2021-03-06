import React, { useEffect, useState } from "react";
import { Alert, FlatList, StatusBar } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { AntDesign } from '@expo/vector-icons';

import { ICarDTO } from "../../dtos/CarDTO";

import { BackButton } from "../../components/BackButton";
import { Car } from "../../components/Car";
import { Load } from "../../components/Load";

import api from "../../services/api";

import { useTheme } from "styled-components";

import {
  Container,
  Header,
  BackButtonWrapper,
  Title,
  SubTitle,
  Content,
  Appointments,
  AppointmentsTitle,
  AppointmentsQuantity,
  CarWrapper,
  CarFooter,
  CarFooterTitle,
  CarFooterPeriod,
  CarFooterDate,
} from './styles'

interface ICarProps {
  car: ICarDTO;
  id: string;
  user_id: string;
  startDate: string;
  endDate: string;
}

export function MyCars() {
  const [cars, setCars] = useState<ICarProps[]>([])
  const [loading, setLoading] = useState(true);

  const navigation = useNavigation();
  const theme = useTheme();

  function handleBack() {
    navigation.goBack();
  }

  useEffect(() => {
    async function fetchCars() {
      try {

        const response = await api.get('/schedules_byuser?user_id=1');
        setCars(response.data)

      } catch (err) {
        console.log(err)
        Alert.alert('Erro', 'Erro ao listar agendamentos, tente novamente');
      } finally {
        setLoading(false);
      }
    }

    fetchCars();
  }, [])

  return (
    <Container>
      <StatusBar
        barStyle="light-content"
        translucent
        backgroundColor="transparent"
      />

      <Header>
        <BackButtonWrapper>
          <BackButton onPress={handleBack} color={theme.colors.shape} />
        </BackButtonWrapper>

        <Title>
          Seus agendamentos, {'\n'}
          estão aqui
        </Title>

        <SubTitle>
          Conforto, segurança e praticidade
        </SubTitle>
      </Header>

      {
        loading
          ? <Load />
          : <Content>
            <Appointments>
              <AppointmentsTitle>
                Agendamentos feitos
              </AppointmentsTitle>
              <AppointmentsQuantity>
                {cars.length}
              </AppointmentsQuantity>
            </Appointments>

            <FlatList
              data={cars}
              keyExtractor={item => item.id}
              renderItem={({ item }) => (
                <CarWrapper>
                  <Car data={item.car} />
                  <CarFooter>
                    <CarFooterTitle>
                      Período
                    </CarFooterTitle>
                    <CarFooterPeriod>
                      <CarFooterDate>
                        {item.startDate}
                      </CarFooterDate>
                      <AntDesign
                        name='arrowright'
                        size={20}
                        color={theme.colors.title}
                        style={{ marginHorizontal: 10 }}
                      />
                      <CarFooterDate>
                        {item.endDate}
                      </CarFooterDate>
                    </CarFooterPeriod>
                  </CarFooter>
                </CarWrapper>
              )}
              showsVerticalScrollIndicator={false}
            />
          </Content>
      }
    </Container>
  )
}