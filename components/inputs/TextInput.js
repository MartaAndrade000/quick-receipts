import {TextInput} from "react-native-paper";

const TextIn = (props) => {
    return (
        <TextInput {...props} style={style} right={<TextInput.Icon icon="square-edit-outline" color={(isTextInputFocused) => "#808080"}/>} />
    )
}

const style = {
    backgroundColor: "transparent",
};

export default TextIn;