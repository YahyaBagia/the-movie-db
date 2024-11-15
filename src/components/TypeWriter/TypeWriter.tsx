import { useState } from "react";
import { StyleProp, TextStyle, View } from "react-native";
import RNTypeWriter from "react-native-typewriter";

import Utils from "@/src/common/Utils";

type TypeWriterProps = {
  values: string[];
  style: StyleProp<TextStyle> | undefined;
};

type TypingStatus = "typing" | "erasing" | "idle";

const TypeWriter: React.FC<TypeWriterProps> = ({ values, style }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [typingStatus, setTypingStatus] = useState<TypingStatus>("typing");

  const onTypingEnd = async () => {
    if (typingStatus === "typing") {
      setTypingStatus("idle");
      await Utils.sleep(2500);
      setTypingStatus("erasing");
    } else if (typingStatus === "erasing") {
      const newIndex =
        currentIndex === values.length - 1 ? 0 : currentIndex + 1;
      setCurrentIndex(newIndex);
      setTypingStatus("typing");
    }
  };

  return (
    <View style={{ flexDirection: "row" }}>
      <RNTypeWriter
        typing={
          typingStatus === "typing" ? 1 : typingStatus === "erasing" ? -1 : 0
        }
        onTypingEnd={onTypingEnd}
        style={style as any}
        minDelay={160}
      >
        {values[currentIndex]}
      </RNTypeWriter>
    </View>
  );
};

export default TypeWriter;
