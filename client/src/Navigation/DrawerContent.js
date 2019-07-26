import React, { Component } from 'react'
import { View, Image, AsyncStorage } from 'react-native'
import { Container, Card, Content, Button, Text } from 'native-base';
import RouteKey from '../Constants/routesConstants';
import { Actions } from "react-native-router-flux";

import LinearGradient from 'react-native-linear-gradient';
import Constant from '../Constants/constants';



export default class DrawerContent extends Component {




  constructor() {
    super()
    this.state = {
      userDetail: {}
    }
  }





  componentWillMount() {
    this.getUserDetail()
  }


  getUserDetail() {
    AsyncStorage.getItem(Constant.USER_DETAIL_KEY)
      .then((res) => {
        if (res) {
          var data = JSON.parse(res)
          console.log(data)
          this.setState({ userDetail: data })
        }
      })
  }


  render() {
    return (
      <Container>

        <LinearGradient colors={['#7e57c2', '#b39ddb', '#7e57c2']} style={{ flex: 1 }}>

          <Content>




            <View style={{ flexDirection: 'row', justifyContent: 'center' }}>



              <Card style={styles.pendingCard}>
                <View style={styles.gradientBox}  >
                  <Image style={styles.userImage} source={{ uri: Constant.BASE_URL + Constant.IMAGE_URL_PATH + this.state.userDetail.imageUrl }} />
                </View>
              </Card>
            </View>
            <View><Text style={styles.userName} > Hi ! {this.state.userDetail.fullName}</Text></View>





            <Button rounded style={styles.buttonStyle} onPress={() => Actions[RouteKey.OVERVIEW]()}>
              <Text uppercase={false} style={styles.buttonText}   >Overview</Text>
            </Button>


            <Button rounded style={styles.buttonStyle} onPress={() => Actions[RouteKey.CREATE_TASK]()}>
              <Text uppercase={false} style={styles.buttonText}>  Create Task</Text>
            </Button>

            <Button rounded style={styles.buttonStyle} onPress={() => Actions[RouteKey.TASK_LIST]()}>
              <Text uppercase={false} style={styles.buttonText}>  Task List</Text>
            </Button>

            <Button rounded style={styles.buttonStyle} onPress={() => Actions[RouteKey.CREATE_COMM]()}>
              <Text uppercase={false} style={styles.buttonText}>  Create Chat</Text>
            </Button>

            <Button rounded style={styles.buttonStyle} onPress={() => Actions[RouteKey.COMM_LIST]()}>
              <Text uppercase={false} style={styles.buttonText}>  Chat List</Text>
            </Button>

            <Button rounded style={styles.buttonStyle} onPress={() => Actions[RouteKey.USER_PROFILE]()}>
              <Text uppercase={false} style={styles.buttonText}>  Profile</Text>
            </Button>

            <Button rounded style={styles.buttonStyle} onPress={() => Actions[RouteKey.LOGOUT]()}>
              <Text uppercase={false} style={styles.buttonText}>  Logout</Text>
            </Button>

            <Button rounded style={styles.buttonStyle} onPress={() => Actions[RouteKey.ADD_EMPLOYEE]()}>
              <Text uppercase={false} style={styles.buttonText}>  Add Employee</Text>
            </Button>

          </Content>
        </LinearGradient>

      </Container>
    )
  }
}

const styles = {
  gradientBox: {
    width: 100,
    height: 100,
    borderRadius: 100 / 2,
  },

  pendingCard: {
    width: 100,
    height: 100,
    borderRadius: 100 / 2,
    marginTop: '5%',
  },

  userImage: {
    width: 100,
    height: 100,
    borderRadius: 100 / 2,
    resizeMode: 'cover'
  },
  userName: {
    textAlign: 'center',
    fontWeight: 'bold',
    color: 'white',
    marginBottom: '5%',

  },
  buttonStyle: {
    marginBottom: 15,
    width: '90%',
    marginLeft: '5%'
  },
  buttonText: {
    textAlign: 'center',
    width: '100%'
  }


}


