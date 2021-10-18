import React from 'react';
import { Text, View } from 'react-native';
import styles from '../style/style.js'

export default function Footer() {
        return (
            <View style={styles.footer}>
                <Text style={styles.author}>Maria Järvinen, TIK20KM</Text>
            </View>
        );
}