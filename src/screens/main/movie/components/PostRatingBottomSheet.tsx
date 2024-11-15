import {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from "react";
import { View, TextInput as RNTextInput } from "react-native";
import { Button, IconButton, Portal, Text, useTheme } from "react-native-paper";
import {
  BottomSheetBackdrop,
  BottomSheetModal,
  BottomSheetModalProvider,
  BottomSheetView,
} from "@gorhom/bottom-sheet";
import { Rating } from "react-native-ratings";

import Spacer from "@/src/components/Spacer";

import Utils from "@/src/common/Utils";
import useMaxFullWidth from "@/src/hooks/useMaxFullWidth";

export interface PostRatingBottomSheetRef {
  openBottomSheet: (config: PostRatingBottomSheetConfig) => void;
}

interface PostRatingBottomSheetConfig {
  value: number;
  onSubmit: (value: number) => void;
  onDelete: () => void;
}

const PostRatingBottomSheet: React.ForwardRefRenderFunction<
  PostRatingBottomSheetRef
> = (_, ref) => {
  const [bottomSheetConfig, setBottomSheetConfig] = useState<
    PostRatingBottomSheetConfig | undefined
  >();

  const { value = 0, onSubmit, onDelete } = bottomSheetConfig ?? {};

  useEffect(() => {
    setRating(value);
  }, [value]);

  const [rating, setRating] = useState<number>(0);

  const bottomSheetModalRef = useRef<BottomSheetModal>(null);
  const txtNotes = useRef<RNTextInput>(null);

  const { surface: backgroundColor } = useTheme().colors;

  useImperativeHandle(ref, () => ({
    openBottomSheet: async (config: PostRatingBottomSheetConfig) => {
      setBottomSheetConfig(config);
      bottomSheetModalRef.current?.present();
      await Utils.sleep(0.75);
      txtNotes.current?.focus();
    },
  }));

  const closeModal = () => {
    setBottomSheetConfig(undefined);
    bottomSheetModalRef.current?.dismiss();
  };

  const onPressSubmit = () => {
    onSubmit?.(rating);
    closeModal();
  };

  const onPressDelete = () => {
    onDelete?.();
    closeModal();
  };

  const maxWidthStyle = useMaxFullWidth();

  const ratingTitles = [
    "Dumpster Fire",
    "Absolute Trash",
    "Garbage",
    "Truly Bad",
    "Not Good",
    "Passable",
    "It's Alright",
    "Pretty Decent",
    "Really Good",
    "Greatness",
    "Champion",
  ];
  const ratingTitle = ratingTitles[rating - 1];

  return (
    <Portal>
      <BottomSheetModalProvider>
        <BottomSheetModal
          ref={bottomSheetModalRef}
          index={0}
          snapPoints={[250]}
          enableHandlePanningGesture={!Utils.isWeb()}
          enableContentPanningGesture={false}
          enableDismissOnClose
          handleComponent={null}
          backgroundStyle={{ backgroundColor, borderRadius: 28 }}
          backdropComponent={(props) => (
            <BottomSheetBackdrop
              {...props}
              pressBehavior="close"
              disappearsOnIndex={-1}
              opacity={1}
            />
          )}
          style={[maxWidthStyle]}
        >
          <BottomSheetView>
            <View
              style={{
                height: 50,
                marginTop: 8,
                justifyContent: "space-between",
                flexDirection: "row",
                paddingLeft: 24,
                paddingRight: 12,
                alignItems: "center",
              }}
            >
              <Text variant="bodyLarge">Rating</Text>
              <IconButton icon={"close"} onPress={closeModal} />
            </View>
            <View style={{ marginHorizontal: 35, marginTop: 12 }}>
              <Text variant="titleLarge" style={{ textAlign: "center" }}>
                {ratingTitle}
              </Text>
              <Spacer />
              <Rating
                startingValue={rating}
                ratingCount={10}
                fractions={0}
                onFinishRating={setRating}
                imageSize={30}
              />
              <View style={{ height: 8 }} />
              {value > 0 && (
                <>
                  <Text
                    variant="titleMedium"
                    style={{ textAlign: "center" }}
                    onPress={onPressDelete}
                  >
                    Delete Rating
                  </Text>
                  <View style={{ height: 8 }} />
                </>
              )}
              <Button mode="contained" onPress={onPressSubmit}>
                Submit
              </Button>
              <View style={{ height: 28 }} />
            </View>
          </BottomSheetView>
        </BottomSheetModal>
      </BottomSheetModalProvider>
    </Portal>
  );
};

export default forwardRef(PostRatingBottomSheet);
