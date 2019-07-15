import React, { Component } from 'react'
import { View } from 'react-native'
import { Container, Header, Content, Button, Text } from 'native-base';
import RouteKey from '../Constants/routesConstants';
import { Actions, ActionConst } from "react-native-router-flux";



export default class DrawerContent extends Component {
  render() {
    return (
      <Container>

        <Content>
          <Button block style={{ marginBottom: 15, }} onPress={() => Actions[RouteKey.OVERVIEW]()}>
            <Text>Overview</Text>
          </Button>
          <Button block style={{ marginBottom: 15, }} onPress={() => Actions[RouteKey.CREATE_TASK]()}>
            <Text>Create Task</Text>
          </Button>
          <Button block style={{ marginBottom: 15, }} onPress={() => Actions[RouteKey.TASK_LIST]()}>
            <Text>Task List</Text>
          </Button>
          <Button block style={{ marginBottom: 15, }}>
            <Text>Info</Text>
          </Button>
          <Button block style={{ marginBottom: 15, }}>
            <Text>Warning</Text>
          </Button>
          <Button block style={{ marginBottom: 15, }}>
            <Text>Danger</Text>
          </Button>
          <Button block style={{ marginBottom: 15, }} onPress={() => Actions[RouteKey.LOGOUT]()}>
            <Text>Logout</Text>
          </Button>
        </Content>
      </Container>
    )
  }
}