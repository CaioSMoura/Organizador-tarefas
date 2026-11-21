import React, { useState } from 'react';
import { View, Text, TextInput, Pressable, ScrollView, Alert, StyleSheet } from 'react-native';

const PRIORIDADES = [
  { key: 'baixa', label: 'Baixa' },
  { key: 'media', label: 'Média' },
  { key: 'alta', label: 'Alta' },
];

export function TaskForm({ valoresIniciais = {}, textoBotao, onSubmit }) {
  const [titulo, setTitulo] = useState(valoresIniciais.titulo || '');
  const [descricao, setDescricao] = useState(valoresIniciais.descricao || '');
  const [categoria, setCategoria] = useState(valoresIniciais.categoria || '');
  const [prioridade, setPrioridade] = useState(valoresIniciais.prioridade || 'media');
  const [dataVencimento, setDataVencimento] = useState(valoresIniciais.dataVencimento || '');

  const handleSalvar = () => {
    if (!titulo.trim()) {
      Alert.alert('Campo obrigatório', 'Por favor, informe o título da tarefa.');
      return;
    }

    onSubmit({
      titulo,
      descricao,
      categoria: categoria || 'Geral',
      prioridade,
      dataVencimento: dataVencimento || 'Sem prazo',
    });
  };

  return (
    <ScrollView contentContainerStyle={styles.container} keyboardShouldPersistTaps="handled">
      <Text style={styles.label}>Título *</Text>
      <TextInput
        style={styles.input}
        placeholder="Ex: Finalizar relatório"
        value={titulo}
        onChangeText={setTitulo}
      />

      <Text style={styles.label}>Descrição (opcional)</Text>
      <TextInput
        style={[styles.input, styles.textArea]}
        placeholder="Detalhes sobre a atividade..."
        value={descricao}
        onChangeText={setDescricao}
        multiline
        numberOfLines={3}
      />

      <Text style={styles.label}>Categoria</Text>
      <TextInput
        style={styles.input}
        placeholder="Ex: Trabalho, Estudos, Pessoal"
        value={categoria}
        onChangeText={setCategoria}
      />

      <Text style={styles.label}>Prioridade</Text>
      <View style={styles.prioridadeRow}>
        {PRIORIDADES.map((item) => {
          const ativo = prioridade === item.key;
          return (
            <Pressable
              key={item.key}
              onPress={() => setPrioridade(item.key)}
              style={[styles.prioBtn, ativo && styles.prioBtnAtivo]}
            >
              <Text style={[styles.prioTexto, ativo && styles.prioTextoAtivo]}>
                {item.label}
              </Text>
            </Pressable>
          );
        })}
      </View>

      <Text style={styles.label}>Data de vencimento</Text>
      <TextInput
        style={styles.input}
        placeholder="DD/MM/AAAA"
        value={dataVencimento}
        onChangeText={setDataVencimento}
      />

      <Pressable style={styles.submitBtn} onPress={handleSalvar}>
        <Text style={styles.submitTexto}>{textoBotao}</Text>
      </Pressable>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { padding: 16 },
  label: { fontSize: 14, fontWeight: '600', color: '#1E293B', marginBottom: 6, marginTop: 12 },
  input: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#CBD5E1',
    borderRadius: 10,
    padding: 12,
    fontSize: 15,
  },
  textArea: { height: 85, textAlignVertical: 'top' },
  prioridadeRow: { flexDirection: 'row', gap: 8 },
  prioBtn: {
    flex: 1,
    paddingVertical: 10,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#CBD5E1',
    backgroundColor: '#FFF',
    alignItems: 'center',
  },
  prioBtnAtivo: { backgroundColor: '#2563EB', borderColor: '#2563EB' },
  prioTexto: { color: '#334155', fontWeight: '600' },
  prioTextoAtivo: { color: '#FFFFFF' },
  submitBtn: {
    backgroundColor: '#2563EB',
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 24,
  },
  submitTexto: { color: '#FFF', fontSize: 16, fontWeight: 'bold' },
});