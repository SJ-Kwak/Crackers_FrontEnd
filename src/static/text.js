import { TextPretendard as Text } from "./CustomText";

export const Display2 = ({ children }) => {
  return (
    <Text
      style={{
        fontWeight: "600",
        fontSize: 24,
        lineHeight: 29,
        color: "#1C1C1C",
      }}>
      {children}
    </Text>
  );
};

export const Caption1 = ({ children }) => {
  return (
    <Text style={{ fontSize: 14, lineHeight: 17, color: "#606060" }}>
      {children}
    </Text>
  );
};

export const Display4 = ({ children }) => {
  return (
    <Text style={{ fontSize: 16, lineHeight: 19, color: "#1c1c1c" }}>
      {children}
    </Text>
  );
};
