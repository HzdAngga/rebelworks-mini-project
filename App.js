import React from "react";
import Home from "./screens/Home";
import Details from "./screens/Details";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import store from "./store";
import { Provider } from "react-redux";

const Stack = createStackNavigator();

export default function App() {
	return (
		<Provider store={store}>
			<NavigationContainer>
				<Stack.Navigator>
					<Stack.Screen name="Home" component={Home} />
					<Stack.Screen name="Details" component={Details} />
				</Stack.Navigator>
			</NavigationContainer>
		</Provider>
	);
}
