import React from "react";
import {View, Text} from "react-native";
import styles from "./style";
import {Spinner} from "native-base";

const NoContent = ({text}) => {
  return(
    <View style={styles.centerSpinner}>
      <Spinner/>
    </View>
  );
};

export default NoContent;