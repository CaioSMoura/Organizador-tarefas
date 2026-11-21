import React, { useState } from 'react';
import { View, Text, FlatList, Pressable, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Link, useRouter } from 'expo-router';
import { useTasks } from '../context/TasksContext';
import { IndicadorBox } from '../components/IndicadorBox';
import { TaskItem } from '../components/TaskItem';

const FILTROS_STATUS = [
  { key: 'todas', label: 'Todas' },
  { key: 'pendentes', label: 'Pendentes' },
  { key: 'concluidas', label: 'Concluídas' },
];

const FILTROS_PRIORIDADE = [
  { key: 'todas', label: 'Todas Prioridades' },
  { key: 'alta', label: 'Alta' },
  { key: 'media', label: 'Média' },
  { key: 'baixa', label: 'Baixa' },
];

export default function DashboardScreen() {
  const router = useRouter();
  const {
    tarefas,
    alternarStatusTarefa,
    totalTarefas,
    totalPendentes,
    totalConcluidas,
  } = useTasks();

  const [filtroStatus, setFiltroStatus] = useState('todas');
  const [filtroPrioridade, setFiltroPrioridade] = useState('todas');

  // RF08 & Regra 8: Filtra sem modificar a lista original
  const tarefasFiltradas = tarefas.filter((tarefa) => {
    const passaStatus =
      filtroStatus === 'todas' ||
      (filtroStatus === 'pendentes' && !tarefa.concluida) ||
      (filtroStatus === 'concluidas' && tarefa.concluida);

    const passaPrioridade =
      filtroPrioridade === 'todas' || tarefa.prioridade === filtroPrioridade;

    return passaStatus && passaPrioridade;
  });

  return (
    <SafeAreaView style={styles.safeArea} edges={['bottom']}>
      <View style={styles.container}>
        {/* RF01: Indicadores */}
        <View style={styles.indicadoresRow}>
          <IndicadorBox label="Total" valor={totalTarefas} corDestaque="#2563EB" />
          <IndicadorBox label="Pendentes" valor={totalPendentes} corDestaque="#D97706" />
          <IndicadorBox label="Concluídas" valor={totalConcluidas} corDestaque="#16A34A" />
        </View>

        {/* RF08: Filtros por Status */}
        <View style={styles.filtrosRow}>
          {FILTROS_STATUS.map((f) => (
            <Pressable
              key={f.key}
              onPress={() => setFiltroStatus(f.key)}
              style={[styles.chip, filtroStatus === f.key && styles.chipAtivo]}
            >
              <Text style={[styles.chipTexto, filtroStatus === f.key && styles.chipTextoAtivo]}>
                {f.label}
              </Text>
            </Pressable>
          ))}
        </View>

        {/* RF08: Filtros por Prioridade */}
        <View style={styles.filtrosRow}>
          {FILTROS_PRIORIDADE.map((p) => (
            <Pressable
              key={p.key}
              onPress={() => setFiltroPrioridade(p.key)}
              style={[styles.chip, filtroPrioridade === p.key && styles.chipAtivo]}
            >
              <Text style={[styles.chipTexto, filtroPrioridade === p.key && styles.chipTextoAtivo]}>
                {p.label}
              </Text>
            </Pressable>
          ))}
        </View>

        {/* RF03: Listagem com FlatList */}
        <FlatList
          data={tarefasFiltradas}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <TaskItem
              tarefa={item}
              onToggleStatus={() => alternarStatusTarefa(item.id)}
              onPressDetalhes={() => router.push(`/detalhes/${item.id}`)}
            />
          )}
          ListEmptyComponent={
            <Text style={styles.vazioTexto}>Nenhuma tarefa encontrada para este filtro.</Text>
          }
          contentContainerStyle={{ paddingBottom: 80 }}
        />

        {/* RF01: Botão adicionar nova tarefa */}
        <Link href="/cadastro" asChild>
          <Pressable style={styles.fab}>
            <Text style={styles.fabTexto}>+ Nova Tarefa</Text>
          </Pressable>
        </Link>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1 },
  container: { flex: 1, paddingHorizontal: 16, paddingTop: 12 },
  indicadoresRow: { flexDirection: 'row', gap: 10, marginBottom: 14 },
  filtrosRow: { flexDirection: 'row', flexWrap: 'wrap', gap: 6, marginBottom: 8 },
  chip: {
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 20,
    backgroundColor: '#E2E8F0',
  },
  chipAtivo: { backgroundColor: '#0F172A' },
  chipTexto: { fontSize: 12, color: '#334155', fontWeight: '600' },
  chipTextoAtivo: { color: '#FFFFFF' },
  vazioTexto: { textAlign: 'center', color: '#64748B', marginTop: 40, fontSize: 15 },
  fab: {
    position: 'absolute',
    right: 20,
    bottom: 20,
    backgroundColor: '#2563EB',
    paddingHorizontal: 20,
    paddingVertical: 14,
    borderRadius: 30,
    elevation: 4,
  },
  fabTexto: { color: '#FFF', fontWeight: 'bold', fontSize: 15 },
});