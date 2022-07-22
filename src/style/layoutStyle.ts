import { StyleSheet } from "react-native";

const LayoutStyle = StyleSheet.create({
  background: {
    backgroundColor: "#fafafa"
  },
  container : {    
    display: 'flex',
    alignItems: 'center',
    paddingLeft: '10%',
    paddingRight: '10%',
  },
  containerWithoutCenter : {    
    width: '100%',
    paddingLeft: '10%',
    paddingRight: '10%',
  },
  linkText: {
    color: "rgba(13, 153, 255, 1)",
  },
  linkBackground: {
    backgroundColor: "rgba(13, 153, 255, 1)",
  }
});

export default LayoutStyle