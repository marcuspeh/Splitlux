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
});

export default LayoutStyle