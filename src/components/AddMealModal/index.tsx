import { useState } from 'react';
import { Modal, Text, TouchableOpacity, View } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Input } from '@/components/Input';
import { Button } from '@/components/Button';
import { styles } from './styles';

type AddMealModalProps = {
  visible: boolean;
  mealTitle: string;
  onClose: () => void;
  onConfirm: (alimento: string, gramas: string, kcal: string) => void;
};

export function AddMealModal({ visible, mealTitle, onClose, onConfirm }: AddMealModalProps) {
  const [alimento, setAlimento] = useState('');
  const [gramas, setGramas] = useState('');
  const [kcal, setKcal] = useState('');

  function handleConfirm() {
    onConfirm(alimento, gramas, kcal);
    setAlimento('');
    setGramas('');
    setKcal('');
  }

  function handleClose() {
    setAlimento('');
    setGramas('');
    setKcal('');
    onClose();
  }

  return (
    <Modal visible={visible} transparent animationType="slide" onRequestClose={handleClose}>
      <View style={styles.overlay}>
        <View style={styles.container}>
          <View style={styles.header}>
            <Text style={styles.title}>Adicionar alimento</Text>
            <Text style={styles.subtitle}>{mealTitle}</Text>
            <TouchableOpacity style={styles.closeButton} onPress={handleClose} activeOpacity={0.7}>
              <MaterialCommunityIcons name="close" size={22} color="#717171" />
            </TouchableOpacity>
          </View>

          <Input
            placeholder="Nome do alimento"
            iconName="food-apple-outline"
            value={alimento}
            onChangeText={setAlimento}
          />
          <Input
            placeholder="Quantidade (g)"
            iconName="weight-gram"
            value={gramas}
            onChangeText={setGramas}
          />
          <Input
            placeholder="Total de kcal"
            iconName="fire"
            value={kcal}
            onChangeText={setKcal}
          />

          <Button title="Adicionar" onPress={handleConfirm} />
        </View>
      </View>
    </Modal>
  );
}
