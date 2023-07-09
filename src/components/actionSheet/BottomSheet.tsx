import React, { useCallback, useMemo, ReactNode, Ref, forwardRef } from "react";
import { Dimensions, StyleSheet, Text, View } from "react-native";
import GlobalStyle from "@styles/GlobalStyles";
import RNBottomSheet, {
  BottomSheetBackdrop,
  BottomSheetBackdropProps,
  useBottomSheetDynamicSnapPoints,
  BottomSheetView,
} from "@gorhom/bottom-sheet";

interface Props {
  children: ReactNode;
  title: string;
}
const BottomSheet = forwardRef((props: Props, ref: Ref<RNBottomSheet>) => {
  const { children, title } = props;
  const { height } = Dimensions.get("window");

  const initialSnapPoints = useMemo(() => ["CONTENT_HEIGHT"], []);

  const { animatedHandleHeight, animatedSnapPoints, animatedContentHeight, handleContentLayout } =
    useBottomSheetDynamicSnapPoints(initialSnapPoints);

  const renderBackdrop = useCallback(
    (props: BottomSheetBackdropProps) => (
      <BottomSheetBackdrop
        {...props}
        pressBehavior="close"
        appearsOnIndex={0}
        disappearsOnIndex={-1}
        style={{ backgroundColor: "#C0C4CF99", flex: 1, position: "absolute", left: 0, right: 0, top: 0, bottom: 0 }}
        opacity={1}
      />
    ),
    []
  );

  return (
    <RNBottomSheet
      ref={ref}
      index={-1}
      handleStyle={{ display: "none" }}
      snapPoints={animatedSnapPoints}
      handleHeight={animatedHandleHeight}
      contentHeight={animatedContentHeight}
      enablePanDownToClose
      backdropComponent={renderBackdrop}
    >
      <BottomSheetView onLayout={handleContentLayout} style={{ maxHeight: height * 0.9 }}>
        <View style={bottomSheet.container}>
          <Text style={bottomSheet.title}>{title}</Text>
          {children}
        </View>
      </BottomSheetView>
    </RNBottomSheet>
  );
});

export default BottomSheet;

const bottomSheet = StyleSheet.create({
  container: { padding: 20 },
  title: { color: GlobalStyle.gray.color, fontWeight: "bold", marginBottom: 10, fontSize: 13 },
});
