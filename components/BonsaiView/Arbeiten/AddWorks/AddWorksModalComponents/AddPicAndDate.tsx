import React, { FC } from "react";
import Box from "../../../../Common/Box";
import Text from "../../../../Common/Text";
import { Pressable, Image } from "react-native";

// styling
import { Camera } from "iconsax-react-native";
import theme from "../../../../../theme/theme";
import { SimpleLineIcons } from "@expo/vector-icons";

//external components
import DateTimePicker from "@react-native-community/datetimepicker";
import moment from "moment";

//expo
import ImagePickerModal from "../../../../Common/ImagePickerModal";
//types
import { AddPicAndDateProps } from "../../../../../types/WorkViewTypes";

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
              <Box width={80}>
                <Image
                  source={{ uri: image }}
                  style={{ width: "100%", height: 80, borderRadius: 20 }}
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
                  width={80}
                  height={80}
                  alignItems="center"
                  justifyContent="center"
                >
                  <Camera
                    size={40}
                    color={theme.colors.iconColor}
                    variant="Broken"
                  />
                </Box>
                <Box marginTop="xs">
                  <Text fontSize={10}>Bild hinzufügen</Text>
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
                      fontSize: 16,
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
                      : "Datum Auswählen..."}
                  </Text>
                </Box>
              </Box>
              <Box
                padding="m"
                backgroundColor={
                  date ? "primaryGreenColor" : "primarySalmonColor"
                }
                borderRadius="l"
                position="absolute"
                right={0}
              >
                {date && (
                  <Box
                    position="absolute"
                    flex={1}
                    alignItems="center"
                    justifyContent="center"
                    right={11}
                    bottom={11}
                    backgroundColor="textOnDark"
                    borderRadius="xl"
                    zIndex={1}
                    style={{ padding: 2 }}
                  >
                    <SimpleLineIcons
                      size={11}
                      name="check"
                      color={theme.colors.primaryGreenColor}
                    />
                  </Box>
                )}

                <SimpleLineIcons
                  size={24}
                  name="calendar"
                  color={theme.colors.textOnDark}
                />
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
