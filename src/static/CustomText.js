import { useState, useEffect } from 'react';
import { Text } from 'react-native';

export function TextPretendard({children, style, ...rest}) {
  return (
    <Text style={[{fontFamily: 'Pretendard'}, style]} {...rest}>{children}</Text>
  )
}