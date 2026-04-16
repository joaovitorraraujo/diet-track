import { FlatList, ImageBackground, Text, TextInput, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { AlimentoCard } from '@/components/pages/Alimentos/AlimentoCard';
import { ScreenHeader } from '@/components/layout/ScreenHeader';
import { colors } from '@/constants/colors';
import { styles } from './styles';
import { backgroundImage } from '@/assets';
import { useAlimentos } from '@/hooks/useAlimentos';

export function Alimentos() {
  const { search, setSearch, expandedId, filteredAlimentos, handleToggle } = useAlimentos();

  return (
    <ImageBackground source={backgroundImage} style={styles.background} resizeMode="cover">
      <StatusBar style="light" />
      <View style={styles.overlay} />
      <SafeAreaView style={styles.safeArea} edges={['top']}>
        <ScreenHeader title="Proteínas por Alimento" subtitle="Calcule a proteína de cada alimento" />

        <View style={styles.searchContainer}>
          <MaterialCommunityIcons
            name="magnify"
            size={28}
            color={colors.textMuted}
            style={styles.searchIcon}
          />
          <TextInput
            style={styles.searchInput}
            placeholder="Buscar alimento..."
            placeholderTextColor={colors.textMuted}
            value={search}
            onChangeText={setSearch}
            returnKeyType="search"
            autoCapitalize="none"
          />
        </View>

        <View style={styles.mainCard}>
          <FlatList
            data={filteredAlimentos}
            keyExtractor={(item) => item.id}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.listContent}
            ListHeaderComponent={
              filteredAlimentos.length > 0 ? (
                <Text style={styles.categoryLabel}>
                  {filteredAlimentos[0].categoria}
                </Text>
              ) : null
            }
            renderItem={({ item }) => (
              <AlimentoCard
                alimento={item}
                isExpanded={expandedId === item.id}
                onToggle={() => handleToggle(item.id)}
              />
            )}
            ListEmptyComponent={
              <Text style={styles.emptyText}>Nenhum alimento encontrado.</Text>
            }
          />
        </View>
      </SafeAreaView>
    </ImageBackground>
  );
}
