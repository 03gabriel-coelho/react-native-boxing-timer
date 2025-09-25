import FeatherIcons from "@expo/vector-icons/Feather";
import FontAwesome6Icons from "@expo/vector-icons/FontAwesome6";
import { Modal, Pressable, StyleSheet, Text, View } from "react-native";
import TimerList from "./ui/timerList";

interface ModalToChangeProps {
  modalVisible: boolean;
  setModalVisible: (value: boolean) => void;
  backgroundColorButton: string;
}

export default function ModalToChange({
  modalVisible,
  setModalVisible,
  backgroundColorButton,
}: ModalToChangeProps) {
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={modalVisible}
      onRequestClose={() => {
        setModalVisible(!modalVisible);
      }}
    >
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <Text style={styles.header}>Alterar tempo de ação</Text>
          <View style={styles.containerLists}>
            <TimerList />
            <View style={{ backgroundColor: backgroundColorButton, width: 1, height: "60%" }}/>
            <TimerList />
          </View>
          <View style={styles.containerButton}>
            <Pressable
              style={[
                styles.buttonClose,
                { backgroundColor: backgroundColorButton },
              ]}
              onPress={() => setModalVisible(!modalVisible)}
            >
              <FeatherIcons
                name="save"
                size={18}
                color={'#FFF'}
                style={{
                  position: "relative",
                  right: 10,
                }}
              />
              <Text style={styles.textStyle}>Salvar</Text>
            </Pressable>

            <Pressable
              style={[
                styles.buttonClose,
                { backgroundColor: backgroundColorButton },
              ]}
              onPress={() => setModalVisible(!modalVisible)}
            >
              <FontAwesome6Icons name="xmark" size={18} color={"#FFF"} />
            </Pressable>
          </View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  header:{
    fontSize: 20,
    fontWeight: "bold",
    paddingTop: 20,
  },
  centeredView: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.2)",
  },
  modalView: {
    margin: 20,
    width: "80%",
    height: "auto",
    backgroundColor: "white",
    borderRadius: 20,
    // padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.7,
    shadowRadius: 4,
    elevation: 5,
  },
  buttonClose: {
    backgroundColor: "#2196F3",
    flexDirection: "row",
    borderRadius: 20,
    // padding: 10,
    paddingTop: 10,
    paddingRight: 30,
    paddingBottom: 10,
    paddingLeft: 30,
    elevation: 2,
    // marginTop: 10,
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  containerLists: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    height: 150,
    paddingTop: 20,
  },
  containerButton: {
    flexDirection: "row",
    height: 60,
    width: "100%",
    paddingLeft: 10,
    paddingRight: 10,
    alignItems: "center",
    justifyContent: "space-between",
  },
});
