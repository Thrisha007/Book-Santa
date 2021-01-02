import React, {Component} from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Alert, Modal, KeyboardAvoidingView} from 'react-native';
import db from '../config';
import firebase from 'firebase';
import { ScrollView } from 'react-native-gesture-handler';

export default class WelcomeScreen extends Component{

    constructor(){
        super();
        this.state = {
            emailId: '',
            password: '',
            isModalVisible: 'false',
            firstName: '',
            lastName: '',
            address: '',
            contact: '',
            confirmPassword: ''
        }
    }

    showModal = ()=>{
        return(
            <Modal
                animationType = "fade"
                transparent = {true}
                visible = {this.state.isModalVisible}>
                <View 
                 styles = {styles.modalContainer}>
                  <ScrollView 
                   style = {{width: '100%'}}>
                     <KeyboardAvoidingView 
                     styles = {styles.keyboardAvoidingView}>
                         <Text styles = {styles.modalTitle}>Registration</Text>
                         <TextInput 
                            style = {styles.formTextInput}
                            placeholder = {"First name"}
                            maxLength = {8}
                            onChangeText = {(text)=>{
                                this.setState({firstName: text})
                            }}/>
                         <TextInput
                             style = {styles.formTextInput}
                             placeholder = {"Last name"}
                             maxLength = {8}
                             onChangeText = {(text)=>{
                                 this.setState({lastName: text})
                             }}/>
                         <TextInput
                             style = {styles.formTextInput}
                             placeholder = {"Contact"}
                             maxLength = {10}
                             keyboardType = {'numeric'}
                             onChangeText = {(text)=>{
                                 this.setState({contact: text})
                             }}/>
                         <TextInput 
                             style = {styles.formTextInput}
                             placeholder = {"Address"}
                             multilines = {true}
                             onChangeText = {(text)=>{
                                 this.setState({address: text})
                             }}/>
                         <TextInput
                             style = {styles.formTextInput}
                             placeholder = {"E-mail"}
                             keyBoardType = {'email-address'}
                             onChangeText = {(text)=>{
                                 this.setState({emailId: text})
                             }}/>
                         <TextInput
                             style = {styles.formTextInput}
                             placeholder = {"Password"}
                             secureTextEntry = {true}
                             onChangeText = {(text)=>{
                                 this.setState({password: text})
                             }}/>
                         <TextInput
                             style = {styles.formTextInput}
                             placeholder = {"Confirm password"}
                             secureTextEntry = {true}
                             onChangeText = {(text)=>{
                                 this.setState({confirmPassword: text})
                             }}/>
                        <View style = {styles.modalBackButton}>
                            <TouchableOpacity styles = {styles.registerButton}
                                              onPress = {()=>{
                                                  this.userSignUp(this.state.emailId, 
                                                    this.state.password, this.state.confirmPassword)
                                              }}>
                                <Text styles = {styles.registerButtonText}>
                                    Register
                                </Text>
                            </TouchableOpacity>
                        </View>
                        <View style = {styles.modalBackButton}>
                            <TouchableOpacity styles = {styles.cancelButton}
                                              onPress = {()=>{
                                                  this.setState({"isModalVisible": false})
                                              }}>
                                <Text styles = {{color: "pink"}}>
                                    Cancel
                                </Text>
                            </TouchableOpacity>
                        </View>
                     </KeyboardAvoidingView>
                 </ScrollView>
                </View>
            </Modal>
        )
    }

    userSignUp = (emailId, password, confirmPassword)=>{
        if(password !== confirmPassword){
            return alert("Passwords do not match")
        }
        else{
        firebase.auth().createUserWithEmailAndPassword(emailId, password).then(
            ()=>{
                db.collection('user').add({
                    first_name: this.state.firstName,
                    last_name: this.state.lastName,
                    contact: this.state.contact,
                    email_id: this.state.emailId,
                    address: this.state.address,
                    IsBookRequestActive: false
                })
                return alert('User added successfully','',[{text:'ok',onPress:()=>this.setState({'isModalVisible':false})}])
            }
        ).catch((error)=>{
            var errorCode = error.code;
            var errorMessage = error.message;
            return alert(errorMessage)
        })
    }
}

    userLogin = (emailId, password)=>{
        firebase.auth().signInWithEmailAndPassword(emailId, password).then(
            ()=>{
                this.props.navigation.navigate('Donate');
            }).catch((error)=>{
            var errorCode = error.code;
            var errorMessage = error.message;
            return Alert.alert(errorMessage)
        })
    }

    render(){
        return(
            <View styles={styles.container}>
                <View style = {{justifyContent: 'center', alignItems: 'center'}}>
                    {this.showModal()}
                </View>
                <View>
                    <Text style={styles.title}>Book Santa</Text>
                </View>
            <View>
                <TextInput 
                style = {styles.loginBox}
                placeholder = "abc@example.com"
                keyboardType = 'email-address'
                onChangeText = {(text)=>{
                this.setState({
                    emailId: text
                })
                }} />

                <TextInput
                style = {styles.loginBox}
                secureTextEntry = {true}
                placeholder = "Enter password"
                onChangeText = {(text)=>{
                    this.setState({
                        password: text
                    })
                }}
                />

            <TouchableOpacity style={[styles.button, {marginButton: 40, marginTop: 20}]}
                            onPress = {()=>{
                                this.userLogin(this.state.emailId, this.state.password)
                            }}>
                <Text style={styles.buttonText}>Login</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.button}
                                onPress = {()=>{
                                    this.userSignUp(this.state.emailId, this.state.password)
                                }}>
                <Text style={styles.buttonText}>Sign up</Text>
            </TouchableOpacity>

            </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'cyan',
    },
    profileContainer:{ 
        flex:1, 
        justifyContent:'center', 
        alignItems:'center', }, 

    title :{ fontSize:65, 
        fontWeight:'300', 
        paddingBottom:30, 
        color : '#ff3d00' },
        
        loginBox:{ 
            width: 300,
            height: 40, 
            borderBottomWidth: 1.5, 
            borderColor : '#ff8a65', 
            fontSize: 20, margin:10, 
            paddingLeft:10 }, 
            
        button:{ width:300,
             height:50, 
             justifyContent:'center',
              alignItems:'center',
               borderRadius:25,
              backgroundColor:"#ff9800",
              shadowColor: "#000",
              shadowOffset: { width: 0, height: 8, }, 
              shadowOpacity: 0.30, 
              shadowRadius: 10.32, 
              elevation: 16, }, 
        
        buttonText:{ color:'#ffff', 
                  fontWeight:'200', 
                  fontSize:20 },
        
        buttonContainer:{ flex:1, 
                     alignItems:'center' }

})