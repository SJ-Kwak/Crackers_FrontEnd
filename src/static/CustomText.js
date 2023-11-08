import { Text } from "react-native";

export function TextPretendard({ children, style, ...rest }) {
  return (
    <Text style={[{ fontFamily: "PretendardVariable", color: 'black' }, style]} {...rest}>
      {children}
    </Text>
  );
}
