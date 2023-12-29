import { StyleSheet, Text, View } from 'react-native';

export default function Footer() {
  return (
    <View style={styles.footerContainer}>
    <Text style={styles.footerText}>© 2023 - App Bán Hàng</Text>
  </View>
  );
}

const styles = StyleSheet.create({
    footerContainer: {
        paddingVertical: 10,
        paddingHorizontal: 20,
        marginTop: 10,
      },
      footerText: {
        fontSize: 14,
        textAlign: 'center',
      },
});
