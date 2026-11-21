import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useTasks } from '../../context/TasksContext';
import { TaskForm } from '../../components/TaskForm';

export default function EditarScreen() {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const { buscarTarefaPorId, editarTarefa } = useTasks();

  const tarefa = buscarTarefaPorId(id);

  if (!tarefa) {
    return (
      <View style={styles.center}>
        <Text>Tarefa não encontrada.</Text>
      </View>
    );
  }

  const handleSalvarEdicao = (dadosAtualizados) => {
    editarTarefa(tarefa.id, dadosAtualizados);
    router.back();
  };

  return (
    <TaskForm
      valoresIniciais={tarefa}
      textoBotao="Salvar Alterações"
      onSubmit={handleSalvarEdicao}
    />
  );
}

const styles = StyleSheet.create({
  center: { flex: 1, justifyContent: 'center', alignItems: 'center' },
});