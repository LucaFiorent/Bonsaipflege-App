import React, { FC } from "react";
import Box from "../../../../Common/Box";
import Text from "../../../../Common/Text";
import { Pressable, Image } from "react-native";

// styling
import { CalendarAdd, CalendarTick, Camera } from "iconsax-react-native";
import theme from "../../../../../theme/theme";
import { SimpleLineIcons } from "@expo/vector-icons";

//external components
import DateTimePicker from "@react-native-community/datetimepicker";
import moment from "moment";

//expo
import ImagePickerModal from "../../../../Common/ImagePickerModal";
//types
import { AddPicAndDateProps } from "../../../../../types/WorkViewTypes";

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

const AddPicAndDate: FC<AddPicAndDateProps> = ({
  openImagePicker,
  setmodalImagePickerVisible,
  modalImagePickerVisible,
  image,
  showDatepicker,
  date,
  taskDate,
  show,
  mode,
  onChange,
}) => {
  return (
    <>
      <Box marginBottom="m" flexDirection="row" alignItems="center">
        <Box marginVertical="m" marginRight="m" flex={0}>
          {image ? (
            <Pressable
              onPress={() =>
                setmodalImagePickerVisible(!modalImagePickerVisible)
              }
            >
              <Box width={wp(18)}>
                <Image
                  source={{ uri: image }}
                  style={{ width: "100%", height: wp(18), borderRadius: 20 }}
                />
              </Box>
            </Pressable>
          ) : (
            <Pressable
              onPress={() =>
                setmodalImagePickerVisible(!modalImagePickerVisible)
              }
            >
              <Box alignItems="center">
                <Box
                  borderColor="borderColor"
                  borderWidth={1}
                  borderRadius="m"
                  width={wp(18)}
                  height={wp(18)}
                  alignItems="center"
                  justifyContent="center"
                >
                  <Camera
                    size={wp(8)}
                    color={theme.colors.iconColor}
                    variant="Broken"
                  />
                </Box>
                <Box marginTop="xs">
                  <Text fontSize={wp(2.2)}>Bild hinzufügen</Text>
                </Box>
              </Box>
            </Pressable>
          )}
        </Box>
        <Box flex={2} marginBottom="m">
          <Pressable onPress={showDatepicker}>
            <Box>
              <Text
                variant="inputTitle"
                marginBottom="xs"
                style={{ color: theme.colors.headline }}
              >
                Datum
              </Text>
              <Box
                flexDirection="row"
                justifyContent="space-between"
                alignItems="center"
                marginRight="xxl"
              >
                <Box flex={1} borderBottomWidth={1} borderColor="borderInput">
                  <Text
                    style={{
                      fontSize: wp(3.5),
                      color: !date
                        ? theme.colors.placeholderColor
                        : theme.colors.text,
                      paddingHorizontal: theme.spacing.xs,
                      paddingBottom: theme.spacing.xs,
                      paddingTop: theme.spacing.xs,
                    }}
                  >
                    {date
                      ? moment(taskDate).format("D MMMM YYYY")
                      : "Datum auswählen..."}
                  </Text>
                </Box>
              </Box>
              <Box
                alignItems="center"
                justifyContent="center"
                width={wp(13)}
                height={wp(13)}
                backgroundColor={
                  date ? "primaryGreenColor" : "primarySalmonColor"
                }
                borderRadius="l"
                position="absolute"
                right={0}
              >
                {date ? (
                  <CalendarTick
                    size={wp(7)}
                    color={theme.colors.textOnDark}
                    variant="Broken"
                  />
                ) : (
                  <CalendarAdd
                    size={wp(7)}
                    color={theme.colors.textOnDark}
                    variant="Broken"
                  />
                )}
              </Box>
            </Box>
          </Pressable>
        </Box>
      </Box>

      {show && (
        <DateTimePicker
          testID="dateTimePicker"
          value={taskDate}
          mode={mode}
          is24Hour={true}
          display="default"
          onChange={onChange}
        />
      )}
      <ImagePickerModal
        setModalVisible={setmodalImagePickerVisible}
        onPressHandler={openImagePicker}
        visible={modalImagePickerVisible}
      />
    </>
  );
};

export default AddPicAndDate;
