import React, { Component} from 'react';
import { Header,Icon } from 'react-native-elements';
import { View, Text, StyeSheet, Dimensions } from 'react-native';
import firebase from 'firebase'
import db from '../config'

export default class SwipeableFlatList extends Component{
  constructor(props){
    super(props)
    this.state = {
        allNotifications:this.props.allNotifications
    }
  }
  updateMarkAsRead=(notification)=>{
    db.collection('all_notifications').doc(notification.doc_id).update({
        "notification_status":"read"
    })
  }
  renderItem=data=>{
    <ListItem 
        title={data.item.item_name}
        titleSyle={{color:'black',fontWeight:'bold'}}
        subtitle={data.item.message}
        bottomDivider
    />
  }

  renderHiddenItem=()=>{
      <View style={styles.rowBack}>
          <View style={[styles.backRightBtn,backRightBtnRight]}>
                <Text style={blackTextWhite}></Text>
          </View>
      </View>   
  }

  onSwipeValueChange=swipeData=>{
    var allNotifications = this.state.allNotifications
    const {key,value} = swipeData
    if(value<-Dimensions.get('window').width){
        const newData = {...allNotifications}
        const prevIndex = allNotifications.findIndex(item=>item.key === key);
        this.updateMarkAsRead(allNotifications[prevIndex])
        newData.slice(prevIndex,1)
        this.setState({allNotifications:newData})

    }
  }
  render(){
    return (
        <View style={styles.container}>
            <SwipeFlatList
                disableRightSwipe
                data={this.state.allNotifications}
                renderItem={this.renderItem}
                renderHiddenItem={this.renderHiddenItem}
                rightOpenValue={-Dimensions.get('window').width}
                previewRowKey={0}
                previewOpenValue={-40}
                previewOpenDelay={3000}
                onSwipeValueChange={this.onSwipeValueChange}
            />
        </View>
    );
  }
}
// Mam Copied StyleSheet from whitehat jr's github but rest of the code i have wrote
const styles = StyleSheet.create({
        container: {
        backgroundColor: 'white',
        flex: 1,
    },
    backTextWhite: {
        color: '#FFF',
        fontWeight:'bold',
        fontSize:15
    },
    rowBack: {
        alignItems: 'center',
        backgroundColor: '#29b6f6',
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingLeft: 15,
    },
    backRightBtn: {
        alignItems: 'center',
        bottom: 0,
        justifyContent: 'center',
        position: 'absolute',
        top: 0,
        width: 100,
    },
    backRightBtnRight: {
        backgroundColor: '#29b6f6',
        right: 0,
    },
})