import { Text } from "react-native"

interface Props {
    text: Element
    style: {}
    onPress?: () => void
}

const IconWrapper = (prop: Props) => {
    const onPressFn = () => {
        if (prop.onPress) {
            prop.onPress()
        }
    }
    return <Text style={prop.style} onPress={onPressFn}>
        {config.text}
    </Text>
}

export default IconWrapper