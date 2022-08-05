import React from "react"
import { Modal, StyleSheet, Text, View } from "react-native"
import FontStyle from "../style/fontStyle"
import LayoutStyle from "../style/layoutStyle"
import LargeButton from "./largeButton"
import { TransactionService } from "../service/transactionService"

interface Props {
  isActive: boolean
  navigation: any
  onClose: () => void
  transactionId: string
  style?: {}
}

const DeleteTransactionModal = (props: Props) => {
  
  const onDeletePress = async () => {
    const response = await TransactionService.deleteTransaction(props.transactionId)
    if (response.isSuccess) {
      props.navigation.goBack()
    }
  }
  

  return (
    <View>
      <Modal
        animationType="slide"
        transparent={true}
        visible={props.isActive}
        onRequestClose={props.onClose}
      >
        <View style={[styles.container]}>
          <View style={[LayoutStyle.background, styles.modalView]}>
            <Text style={[FontStyle.header6, styles.modalText]}>Delete Transaction?</Text>
            <View style={styles.buttonContainer}>
              <LargeButton 
                label={"Confirm delete"} 
                onPress={onDeletePress} 
                style={[LayoutStyle.background, styles.photoButton]}
                textStyle={{color: 'black'}}
              />
              <LargeButton 
                label={"Cancel"} 
                onPress={props.onClose} 
                style={styles.closeButton}
              />
            </View>
          </View>
        </View>
      </Modal>
    </View>
  )
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: 'rgba(217, 217, 217, 0.6)',
    height: '100%',
    width: '100%',
    position: 'absolute',
    top: 0
  },
  buttonContainer: {
    alignItems: "center",
    width: '100%',
  },
  modalText: {
    marginBottom: 30,
    textAlign: "center",
  },
  modalView: {
    margin: 20,
    borderRadius: 20,
    padding: 30,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5
  },
  photoButton: {
    borderWidth: 1,
    borderColor: 'black',
    padding: 2,
    marginBottom: 15,
    borderRadius: 10,
  },
  closeButton: {
    marginTop: 25,
  },
});
  
export default DeleteTransactionModal