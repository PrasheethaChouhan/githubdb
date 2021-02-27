import React, { Component } from 'react';
import {  StyleSheet, Text, View ,TouchableOpacity} from 'react-native';

import Card from '../components/Card';
import CustomButton from '../components/CustomButton';
import firebase from 'firebase';
import db from '../config'
export default class ChatScreen extends React.Component{
  constructor()
  {
    super()
  this.state={
    userId:firebase.auth().currentUser.email
  }
  }



  render(){
  return (
    <View
      style={styles.container}
    >
      <Card style={styles.homeCard}>
        <View><Text style={styles.text}>Enter your activity!</Text></View>
        <CustomButton
          style={styles.button}
          title="Add your watering activity"
          onPress={() => {
           this.props.navigation.navigate('AddWater');
           db.collection("plant_water_tracker").doc(this.state.userId).update({
            'water_quantity': firebase.firestore.FieldValue.increment(1)
          })


          }}
        
        />
       
      </Card>
      <Card style={styles.homeCard}>
        <View><Text style={styles.text}>Track and update your plan here.</Text></View>
        <CustomButton
          style={styles.button}
          title="Plan annual"
          onPress={() => {
           this.props.navigation.navigate('AddManure');

           db.collection("plant_manure_tracker").doc('user_id','==',this.state.userId).update({
            'manure_quantity': firebase.firestore.FieldValue.increment(1)
          })


          }}
        />
       
      </Card>
    </View>
  );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor:"#092f1c"
  },
  horizontal: {
    flexDirection: 'column',
    justifyContent: 'center',
    padding: 2,
    marginTop:70,
    marginLeft:100
  },
});