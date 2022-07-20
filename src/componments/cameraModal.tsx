import React, { useCallback } from "react"
import { Modal, StyleSheet, Text, View } from "react-native"
import FontStyle from "../style/fontStyle"
import LayoutStyle from "../style/layoutStyle"
import LargeButton from "./largeButton"
import  * as ImagePicker from 'react-native-image-picker'
import { UserService } from "../service/userService"

interface Props {
  isActive: boolean
  onClose: () => void
  onUpdate: () => void
  style?: {}
}

const captureOptions = {
  saveToPhotos: false,
  maxHeight: 400,
  maxWidth: 400,
  mediaType: 'photo',
  includeBase64: true,
  includeExtra: false,
}

const libraryOptions = {
  selectionLimit: 1,
  maxHeight: 400,
  maxWidth: 400,
  mediaType: 'photo',
  includeBase64: true,
  includeExtra: false,
}

const CameraModal = (props: Props) => {
  
  const onButtonPress = useCallback((type: any, options: any) => {
    const updateProfilePic = async (response: any) => {
      if (response.assets && response.assets[0].base64) {
        const apiResponse = await UserService.updateProfilePic(response.assets[0].base64)

        if (apiResponse.isSuccess) {
          props.onUpdate()
          props.onClose()
        } else {
          console.log("Failed")
        }
      }
    }
  
    if (type === 'capture') {
      ImagePicker.launchCamera(options, updateProfilePic);
    } else {
      ImagePicker.launchImageLibrary(options, updateProfilePic);
    }
  }, []);
  

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
            <Text style={[FontStyle.header6, styles.modalText]}>Update Profile Picture</Text>
            <View style={styles.buttonContainer}>
              <LargeButton 
                label={"Take a photo"} 
                onPress={() => onButtonPress('capture', captureOptions)} 
                style={[LayoutStyle.background, styles.photoButton]}
                textStyle={{color: 'black'}}
              />
              <LargeButton 
                label={"Choose from gallery"} 
                onPress={() => onButtonPress('library', libraryOptions)} 
                style={[LayoutStyle.background, styles.photoButton]}
                textStyle={{color: 'black'}}
              />
              <LargeButton 
                label={"cancel"} 
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
  
export default CameraModal