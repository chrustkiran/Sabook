import { StyleSheet, Text, View, Button, TouchableOpacity,Image} from 'react-native';
import React from 'react';
import MapView,{Marker} from 'react-native-maps';
import RequestHandler from '../Controller/RequestHandler';


class HomeScreen extends React.Component {
   /*static navigationOptions = {
        title: 'Welcome',
    };*/
    static navigationOptions = {
        header: null
    }

    state = {
        active: false,
        initialLongitude: 0,
        initialLatitude: 0,
        booked: false,
        bookedMarkers:[],
        markers: [],
        /*[{
            key:0,
            latlng:{
                latitude: 8.593446,
                longitude: 81.210673
            },
        title : "Salun kada sammuham",
        active: 0},{
            key:1,
            latlng:{
                latitude: 8.583646,
                longitude: 81.210673
            },
            title : "Salun kada saheem bhai",
            active: 0},{
            key:2,
            latlng:{
                latitude: 8.603546,
                longitude: 81.210673
            },
            title : "Salun kada sahan",
            active: 1},

        ],*/
    }
    componentDidMount() {

        this.getMarkers();

        /*fetch('http://192.168.1.4:8081')
            .then((response) => response.json())
            .then((responseJson) => {
                // console.log(responseJson);
                this.setState({markers:responseJson}) ;
            })
            .catch((error) => {
                console.error(error);
            });*/
        navigator.geolocation.getCurrentPosition((location)=>{
            const initialLongitude = location.coords.longitude;
            const initialLatitude = location.coords.latitude
            this.setState({initialLongitude});
            this.setState({initialLatitude})
        });
    }

    getMarkers(){
        let req = new RequestHandler();
        req.getMoviesFromApiAsync().then((value)=>{
            this.setState({markers:value});
        })
    }
    navigate_action(e,name){
        const {navigate} = this.props.navigation;
        navigate('Profile', {name: name});
        console.log("showing active"+ name);
    }

    render() {
        

        return (
            <View style={{ flex: 1 }}>
                <MapView
                    style={{ flex: 1 }}
                    region={{
                        latitude: this.state.initialLatitude,
                        longitude: this.state.initialLongitude,
                        latitudeDelta: 0.0922,
                        longitudeDelta: 0.0421
                    }}
                    showsUserLocation={true}
                    >
                    {this.state.markers.map(marker=>(
                        <MapView.Marker key={marker.key} coordinate={marker.latlng} title={marker.title} pinColor={marker.active == true ? "#32E50E":"#E50E0E"}
                        onCalloutPress={(e)=>this.navigate_action(e,marker.title)}/>
                    ))}
                </MapView>
              {/*  <View
                    style={{
                        borderWidth:1,
                        borderColor:'rgba(0,0,0,0.2)',
                        alignItems:'center',
                        justifyContent:'center',
                        width:50,
                        height:50,
                        backgroundColor:'#09D3E9',
                        borderRadius:50,
                        position: 'absolute',//use absolute position to show button on top of the map
                        top: '10%', //for center align
                        alignSelf: 'flex-end' //for align to right
                    }}
                >

                    <Button title={"A"} onPress={this.x}/>
                </View>*/}
            </View>
        );
    }
}


export default HomeScreen;