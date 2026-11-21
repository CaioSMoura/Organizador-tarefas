import React from 'react';
import { View, Text, Pressable, Alert, StyleSheet } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useTasks } from '../../context/TasksContext';
import { CardContainer } from '../../components/CardContainer';

export default function DetalhesScreen() {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const { buscarTarefaPorId, alternarStatusTarefa, removerTarefa } = useTasks();

  const tarefa = buscarTarefaPorId(id);

  if (!tarefa) {
    return (
      <View style={styles.center}>
        <Text style={styles.erro}>Tarefa não encontrada.</Text>
        <Pressable style={styles.btnSecundario} onPress={() => router.back()}>
          <Text style={styles.btnSecTexto}>Voltar</Text>
        </Pressable>
      </View>
    );
  }

  // RF07: Confirmação antes de excluir
  const confirmarExclusao = () => {
    Alert.alert(
      'Excluir Tarefa',
      `Deseja realmente excluir "${tarefa.titulo}"?`,
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Excluir',
          style: 'destructive',
          onPress: () => {
            removerTarefa(tarefa.id);
            router.back();
          },
        },
      ]
    );
  };

  return (
    <View style={styles.container}>
      <CardContainer>
        <Text style={styles.status}>
          Status: {tarefa.concluida ? '✅ Concluída' : '⏳ Pendente'}
        </Text>
        <Text style={styles.titulo}>{tarefa.titulo}</Text>

        <Text style={styles.secao}>Descrição</Text>
        <Text style={styles.texto}>
          {tarefa.descricao || 'Nenhuma descrição informada.'}
        </Text>

        <View style={styles.infoGrid}>
          <Text style={styles.infoItem}>📁 Categoria: {tarefa.categoria}</Text>
          <Text style={styles.infoItem}>⚡ Prioridade: {tarefa.prioridade.toUpperCase()}</Text>
          <Text style={styles.infoItem}>📅 Vencimento: {tarefa.dataVencimento}</Text>
        </View>
      </CardContainer>

      {/* RF06: Alternar status */}
      <Pressable
        style={[styles.btn, tarefa.concluida ? styles.btnReabrir : styles.btnConcluir]}
        onPress={() => alternarStatusTarefa(tarefa.id)}
      >
        <Text style={styles.btnTexto}>
          {tarefa.concluida ? 'Marcar como Pendente' : 'Marcar como Concluída'}
        </Text>
      </Pressable>

      {/* RF05: Navegar para edição */}
      <Pressable
        style={[styles.btn, styles.btnEditar]}
        onPress={() => router.push(`/editar/${tarefa.id}`)}
      >
        <Text style={styles.btnTexto}>Editar Tarefa</Text>
      </Pressable>

      {/* RF07: Excluir */}
      <Pressable style={[styles.btn, styles.btnExcluir]} onPress={confirmarExclusao}>
        <Text style={styles.btnTexto}>Excluir Tarefa</Text>
      </Pressable>

      {/* RF04: Retornar à listagem */}
      <Pressable style={styles.btnSecundario} onPress={() => router.back()}>
        <Text style={styles.btnSecTexto}>Voltar para a Lista</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  center: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 16 },
  erro: { fontSize: 16, color: '#64748B', marginBottom: 12 },
  status: { fontSize: 13, fontWeight: '700', color: '#2563EB', marginBottom: 6 },
  titulo: { fontSize: 22, fontWeight: 'bold', color: '#0F172A', marginBottom: 14 },
  secao: { fontSize: 13, fontWeight: '700', color: '#64748B', marginBottom: 4 },
  texto: { fontSize: 15, color: '#334155', marginBottom: 16, lineHeight: 22 },
  infoGrid: { gap: 6, borderTopWidth: 1, borderTopColor: '#E2E8F0', paddingTop: 12 },
  infoItem: { fontSize: 14, color: '#1E293B', fontWeight: '500' },
  btn: { paddingVertical: 13, borderRadius: 10, alignItems: 'center', marginTop: 10 },
  btnConcluir: { backgroundColor: '#16A34A' },
  btnReabrir: { backgroundColor: '#D97706' },
  btnEditar: { backgroundColor: '#2563EB' },
  btnExcluir: { backgroundColor: '#DC2626' },
  btnTexto: { color: '#FFF', fontWeight: 'bold', fontSize: 15 },
  btnSecundario: { paddingVertical: 12, alignItems: 'center', marginTop: 8 },
  btnSecTexto: { color: '#475569', fontWeight: '600', fontSize: 15 },
});