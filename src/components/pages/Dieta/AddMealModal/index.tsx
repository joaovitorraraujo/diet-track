import { useState } from 'react';
import { Modal, Text, TouchableOpacity, View } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import type { MealItem } from '@/types/diet';
import { styles } from './styles';

type AddMealModalProps = {
  visible: boolean;
  mealTitle: string;
  type: 'carb' | 'protein';
  onClose: () => void;
  onConfirm: (item: MealItem) => void;
};

function handleNumericChange(text: string, setter: (v: string) => void, max = 1000) {
  const clean = text.replace(/[^0-9]/g, '');
  if (!clean) { setter(''); return; }
  setter(String(Math.min(parseInt(clean, 10), max)));
}

export function AddMealModal({ visible, mealTitle, type, onClose, onConfirm }: AddMealModalProps) {
  const [alimento, setAlimento] = useState('');
  const [gramas, setGramas] = useState('');
  const [kcal, setKcal] = useState('');
  const [proteina, setProteina] = useState('');

  function reset() {
    setAlimento('');
    setGramas('');
    setKcal('');
    setProteina('');
  }

  function handleConfirm() {
    const item: MealItem = {
      id: '',
      alimento,
      gramas,
      kcal: Number(kcal),
      ...(type === 'protein' ? { proteina: Number(proteina) } : {}),
    };
    onConfirm(item);
    reset();
  }

  function handleClose() {
    reset();
    onClose();
  }

  const modalTitle = type === 'carb' ? 'Adicionar Carboidrato' : 'Adicionar Proteína';

  return (
    <Modal visible={visible} transparent animationType="slide" onRequestClose={handleClose}>
      <View style={styles.overlay}>
        <View style={styles.container}>
          <View style={styles.header}>
            <Text style={styles.title}>{modalTitle}</Text>
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
            onChangeText={(text) => handleNumericChange(text, setGramas)}
            keyboardType="numeric"
            maxLength={4}
          />
          <Input
            placeholder="Total de kcal"
            iconName="fire"
            value={kcal}
            onChangeText={(text) => handleNumericChange(text, setKcal)}
            keyboardType="numeric"
            maxLength={4}
          />
          {type === 'protein' && (
            <Input
              placeholder="Total de proteínas (g)"
              iconName="arm-flex-outline"
              value={proteina}
              onChangeText={(text) => handleNumericChange(text, setProteina)}
              keyboardType="numeric"
              maxLength={4}
            />
          )}

          <Button title="Adicionar" onPress={handleConfirm} />
        </View>
      </View>
    </Modal>
  );
}
