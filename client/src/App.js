import React, { Component } from "react"
import { Container, Text, Button, Root } from "native-base"
import Store from "./Store/index"
import { Provider } from "react-redux"
import RouteFlux from "../src/Navigation/stack"


class App extends Component {
    render() {
        return (
            <Provider store={Store}>
                <Root>
                    <RouteFlux />

                </Root>
            </Provider>
        )
    }
}

export default App