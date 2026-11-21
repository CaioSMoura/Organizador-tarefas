import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export function IndicadorBox({ label, valor, corDestaque }) {
  return (
    <View style={[styles.box, { borderTopColor: corDestaque }]}>
      <Text style={[styles.valor, { color: corDestaque }]}>{valor}</Text>
      <Text style={styles.label}>{label}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  box: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    paddingVertical: 12,
    paddingHorizontal: 8,
    borderRadius: 10,
    borderTopWidth: 4,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  valor: { fontSize: 22, fontWeight: 'bold' },
  label: { fontSize: 12, color: '#64748B', marginTop: 2 },
});