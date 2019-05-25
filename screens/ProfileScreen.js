import {Modal, StyleSheet, Text, View, Button, TouchableOpacity, Image, ListView} from 'react-native';
import CheckBox from 'react-native-check-box';
import React from 'react';


class ProfileScreen extends React.Component {

    /*static navigationOptions = ({navigation})=> {
        return {
            title : navigation.getParam("name", "unknown page")
        };
    };*/
//add
    state = {
        userId : 456,
        timerMin: null,
        timerSec: null,
        modalVisible: false,
        waitingTime: 0,
        bookingId: null,
        customerCount: 3,
        cuttingChecked: true,
        shavingChecked:false,
        typeDetail: {1: "cutting", 2: "shaving", 3: "cutting and shaving"},
        customer: [{id: 1, type: 1, booked_time: 1557337194779, started_time: 1557343223931}, {
            id: 2,
            type: 3,
            booked_time: 1557337194779,
            started_time: null
        },
            {id: 3, type: 2, booked_time: 1557337194779, started_time: null}],
    }


    static navigationOptions = {
        header: null
    }

    setModalVisible(visible) {
        this.setState({modalVisible: visible});
    }


    componentDidMount() {
        this.calculate_waiting_time();
        let timerMinute = setInterval(this.tickMinute, 60000);
        this.setState({timerMinute});
        let timerSec = setInterval(this.tickSec, 10000);
        this.setState({timerMinute});

    }

    tickSec = () => {
        //this.fetchCustomer();
        if (this.state.customerCount != this.state.customer.length) {
            this.calculate_waiting_time();
        }
        this.setState({customerCount: this.state.customer.length});
    }

    tickMinute = () => {
        this.setState({
            waitingTime: this.state.waitingTime - 1
        });
    }

    calculate_waiting_time() {
        let waitingTime = 0;
        if (this.state.customer[0].started_time == null) {
            this.state.customer.map((customerData) => {
                if (customerData.type == 0) {
                    waitingTime = waitingTime + 30;
                } else if (customerData.type == 1) {
                    waitingTime = waitingTime + 45;
                } else if (customerData.type == 1) {
                    waitingTime = waitingTime + 75;
                }
            })
        } else {
            let currentTime = new Date().getTime();
            waitingTime = waitingTime - Math.floor((currentTime - this.state.customer[0].started_time) / 60000);
            console.log(waitingTime);
            this.state.customer.map((customerData) => {

                if (customerData.type == 0) {
                    waitingTime = waitingTime + 30;
                } else if (customerData.type == 1) {
                    waitingTime = waitingTime + 45;
                } else if (customerData.type == 1) {
                    waitingTime = waitingTime + 75;
                }
                console.log(waitingTime);
            })
        }
        this.setState({waitingTime});
    }


    pressedSubmit(){
        this.setModalVisible(!this.state.modalVisible);
        let type = null;
        if(this.state.cuttingChecked){
            type = "Cutting";
        }
        else if(this.state.shavingChecked){
            type = "Shaving";
        }
        else if(this.state.shavingChecked && this.state.cuttingChecked){
            type = "Cutting and Shaving";
        }
        let startTime = new Date().getTime();
        let query  = new Query();
        //query.bookingRequest(this.state.userId,startTime,type)
        console.log(this.state.shavingChecked);
    }


    render() {


        return (



            <View style={{flex: 1}}>


                <Modal
                    animationType="slide"
                    transparent={false}
                    visible={this.state.modalVisible}
                    onRequestClose={() => {
                        Alert.alert('Modal has been closed.');
                    }}>
                    <View style={{flex: 1}}>
                        <View style ={{flex:1, alignItems: 'center', justifyContent: 'center'}}>

                            <View style={{ flexDirection: 'row', justifyContent: 'space-between',padding:10}}>
                            <CheckBox

                                isChecked={this.state.cuttingChecked}
                                onClick={()=>{this.setState({cuttingChecked:!this.state.cuttingChecked})}}
                            />
                            <Text>  Cutting</Text>
                            </View>
                            <View style={{ flexDirection: 'row', justifyContent: 'space-between',padding:10}}>
                            <CheckBox

                                isChecked={this.state.shavingChecked}
                                onClick={()=>{this.setState({shavingChecked:!this.state.shavingChecked})}}

                            />
                                <Text>  Shaving</Text>
                            </View>


                            <TouchableOpacity style={styles.buttonContainer}
                                onPress={()=>this.pressedSubmit()}>
                                <Text>Submit</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </Modal>

             {/*   <Modal>
                    <View>
                        
                    </View>
                </Modal>
*/}
                <Image style={styles.avatar} source={{uri: 'https://bootdey.com/img/Content/avatar/avatar6.png'}}/>

                <View style={styles.bodyContent}>

                <Text
                        style={styles._name}>{this.props.navigation.state.params.name ? this.props.navigation.state.params.name : "UNKNOWN"}</Text>
                    <Text>Employees : 2</Text>
                    <Text style={styles.description}>Waiting customers : 4 </Text>
                    <Text style={styles.description}>Cutting : 150.00 Shaving : 90.00 </Text>
                    <Text style={styles.description}>You have to wait for {this.state.waitingTime} minutes</Text>


                    {/* <ListView
                            dataSource = {this.state.customer}
                            renderRow={
                                (rowData)=><Text>{rowData.id}</Text>
                            }
                        />*/}
                    {this.state.bookingId == null ?


                        <TouchableOpacity style={styles.buttonContainer}
                                          onPress={() => {
                                              this.setModalVisible(true);
                                          }}
                        >
                            <Text>Book Your Order</Text>
                        </TouchableOpacity>

                        :
                        <TouchableOpacity style={styles.buttonContainer}>
                            <Text>Cancel Your Order</Text>
                        </TouchableOpacity>
                    }


                </View>



                {this.state.customer.map((data, index) => (

                    <View key={data.id} style={styles.container}>

                        {this.state.bookingId != data.id ?
                            <Text
                            >       {index + 1} : {this.state.typeDetail[data.type]}   </Text> :
                            <Text
                            >       {index + 1} : {this.state.typeDetail[data.type]} [you]</Text>
                        }
                    </View>
                ))}
            </View>


        );
    }
}

const styles = StyleSheet.create({
    header: {
        backgroundColor: "#00BFFF",
        height: 200,
    },
    avatar: {
        flex: 1,
        width: 130,
        height: 130,
        borderRadius: 63,
        borderWidth: 4,
        borderColor: "white",
        marginBottom: 10,
        alignSelf: 'center',
        position: 'absolute',
        marginTop: 25,

    },
    // name:{
    //     fontSize:22,
    //     color:"#FFFFFF",
    //     fontWeight:'600',
    // },
    body: {
        marginTop: 40,
    },
    bodyContent: {
        flex: 1,
        alignItems: 'center',
        padding: 30,
        marginTop: 130
    },
    _name: {
        fontSize: 28,
        color: "#696969",
        fontWeight: "600"
    },
    info: {
        fontSize: 16,
        color: "#00BFFF",
        marginTop: 10
    },
    description: {
        fontSize: 16,
        color: "#696969",
        marginTop: 10,
        textAlign: 'center'
    },
    list: {
        padding: 10,
        marginTop: 3,
        backgroundColor: '#d9f9b1',
        alignItems: 'flex-start',
        color: '#4f603c'
    },
    buttonContainer: {
        marginTop: 10,
        height: 45,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 20,
        width: 250,
        borderRadius: 30,
        backgroundColor: "#00BFFF",
    },
    container: {
        padding: 8,
        justifyContent: 'flex-start',
        flexDirection: 'column',
        backgroundColor: "#00BFFF",
    },
});
export default ProfileScreen;
