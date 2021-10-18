import React from 'react';
import { Text, View } from 'react-native';
import styles from '../style/style.js'

export default function Header() {
        return (
            <View style={styles.header}>
                <Text style={styles.title}>Battleship</Text>
            </View>
        );
}
