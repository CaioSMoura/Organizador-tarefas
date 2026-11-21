import React from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';
import { CardContainer } from './CardContainer';

const COR_PRIORIDADE = {
  alta: '#DC2626',
  media: '#D97706',
  baixa: '#16A34A',
};

export function TaskItem({ tarefa, onPressDetalhes, onToggleStatus }) {
  const { titulo, categoria, prioridade, dataVencimento, concluida } = tarefa;

  return (
    <Pressable onPress={onPressDetalhes}>
      <CardContainer style={concluida && styles.cardConcluido}>
        <View style={styles.headerRow}>
          <Pressable
            onPress={onToggleStatus}
            style={[styles.checkbox, concluida && styles.checkboxAtivo]}
          >
            <Text style={styles.checkTexto}>{concluida ? '✓' : ''}</Text>
          </Pressable>

          <Text style={[styles.titulo, concluida && styles.tituloConcluido]} numberOfLines={1}>
            {titulo}
          </Text>

          <View style={[styles.badge, { backgroundColor: COR_PRIORIDADE[prioridade] || '#64748B' }]}>
            <Text style={styles.badgeTexto}>{prioridade.toUpperCase()}</Text>
          </View>
        </View>

        <View style={styles.footerRow}>
          <Text style={styles.meta}>📁 {categoria}</Text>
          <Text style={styles.meta}>📅 {dataVencimento}</Text>
          <Text style={[styles.statusTag, concluida ? styles.statusOk : styles.statusPend]}>
            {concluida ? 'Concluída' : 'Pendente'}
          </Text>
        </View>
      </CardContainer>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  cardConcluido: { backgroundColor: '#F8FAFC', opacity: 0.85 },
  headerRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 10 },
  checkbox: {
    width: 24,
    height: 24,
    borderRadius: 6,
    borderWidth: 2,
    borderColor: '#2563EB',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
  },
  checkboxAtivo: { backgroundColor: '#2563EB' },
  checkTexto: { color: '#FFF', fontWeight: 'bold', fontSize: 14 },
  titulo: { flex: 1, fontSize: 16, fontWeight: '700', color: '#0F172A', marginRight: 8 },
  tituloConcluido: { textDecorationLine: 'line-through', color: '#64748B' },
  badge: { paddingHorizontal: 8, paddingVertical: 3, borderRadius: 6 },
  badgeTexto: { color: '#FFF', fontSize: 10, fontWeight: 'bold' },
  footerRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  meta: { fontSize: 12, color: '#475569' },
  statusTag: { fontSize: 12, fontWeight: '700' },
  statusOk: { color: '#16A34A' },
  statusPend: { color: '#D97706' },
});