import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { router } from "expo-router";
import React, { useRef, useState } from "react";
import {
  FlatList,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

// Sample data - replace with your actual data
const marsiyas = [
  {
    id: 1,
    name: "Mazmoon Bayaz (بیاض)",
    description:
      "A deeply emotional Marsiya capturing the heart-wrenching moment in Karbala when Imam Hussain (عليه السلام), overwhelmed by desperation, held his six-month-old son Ali Asghar (عليه السلام) up before the army of Yazid.",
    fullDescription:
      "A deeply emotional Marsiya capturing the heart-wrenching moment in Karbala when Imam Hussain (عليه السلام), overwhelmed by desperation, held his six-month-old son Ali Asghar (عليه السلام) up before the army of Yazid. The unbearable heat of the desert made it difficult even for grown men to stand, yet Ali Asghar (عليه السلام) lay severely thirsty, his lips parched and body weak. Imam Hussain (عليه السلام), appealing not with words but with the innocence of a dying infant, hoped to awaken even a trace of mercy. Instead, the response was a merciless arrow. This soul-stirring Marsiya, penned by the late Munshi Mustafa Ali, immortalizes this moment of ultimate tragedy and sacrifice",
    audioUrl: "https://example.com/audio1.mp3",
    pdfUrl: "https://example.com/pdf1.pdf",
  },
  {
    id: 2,
    name: "Marsiya Teg (تیغ)",
    description:
      "Mazmooni Teg is a compelling and evocative Marsiya that illustrates the unmatched might of Zulfiqar — the legendary sword of Imam Ali (عليه السلام).",
    fullDescription:
      "Mazmooni Teg is a compelling and evocative Marsiya that illustrates the unmatched might of Zulfiqar — the legendary sword of Imam Ali (عليه السلام). The verses poetically portray Zulfiqar not just as a weapon, but as a loyal companion that communicated with its wielder in the heat of battle. With divine strength, it shattered enemies into countless fragments, striking fear into the hearts of even the bravest warriors. So formidable was its presence that opponents would retreat before its master appeared. The Marsiya draws vivid imagery from the Battle of Khayber, where Zulfiqar's power was on full display, symbolizing justice, valor, and divine support. A powerful tribute to the sword that became a symbol of truth and courage.",
    audioUrl: "https://example.com/audio2.mp3",
    pdfUrl: "https://example.com/pdf2.pdf",
  },
  {
    id: 3,
    name: "Safar-e-Karbala (سفر کربلا)",
    description:
      "An emotionally rich Marsiya portraying the painful journey of Imam Hussain (عليه السلام) and his companions from Medina to Karbala.",
    fullDescription:
      "Safar-e-Karbala is a vivid and heart-wrenching poetic narrative of the final journey of Imam Hussain (عليه السلام), his family, and loyal companions from Medina to the barren plains of Karbala. Through evocative language and powerful imagery, it captures the sacrifices, patience, and unwavering faith shown during this spiritual odyssey. The Marsiya presents every mile of the journey as a testament to the mission of preserving truth and justice. It stands as a poetic tribute to the steadfastness of those who walked knowingly toward martyrdom.",
    audioUrl: "https://example.com/audio3.mp3",
    pdfUrl: "https://example.com/pdf3.pdf",
  },
  {
    id: 4,
    name: "Nawha-e-Shabbir (نوحہ شبیر)",
    description:
      "A poignant lamentation capturing the cries and grief of Imam Hussain's (عليه السلام) loved ones as they witnessed the tragic martyrdoms in Karbala.",
    fullDescription:
      "Nawha-e-Shabbir is a soul-shaking Marsiya that narrates the pain and sorrow felt by the Ahl al-Bayt (عليهم السلام) on the battlefield of Karbala. With deeply emotional verses, it depicts the weeping of Bibi Zainab (سلام الله علیها), the cries of the children, and the heart-wrenching aftermath of the brutal martyrdoms. This Marsiya transforms grief into powerful poetry, immersing the listener into the sacred suffering endured for the cause of Islam. A timeless composition that brings tears to every eye that knows the name of Shabbir.",
    audioUrl: "https://example.com/audio4.mp3",
    pdfUrl: "https://example.com/pdf4.pdf",
  },
  {
    id: 5,
    name: "Zainab ka Sabr (صبر زینب)",
    description:
      "An inspiring Marsiya honoring the unmatched strength and patience of Bibi Zainab (سلام الله علیها) after the tragedy of Karbala.",
    fullDescription:
      "Zainab ka Sabr is an inspiring poetic tribute to the courage, eloquence, and resilience of Bibi Zainab (سلام الله علیها), the sister of Imam Hussain (عليه السلام). After witnessing the martyrdom of her brothers, sons, and companions, she stood in Yazid's court with unwavering faith and delivered sermons that shook the tyrant's throne. This Marsiya reflects on her endurance, her guardianship of the children and women of the Prophet's family, and her role in keeping the mission of Karbala alive. A moving portrayal of spiritual strength and divine defiance.",
    audioUrl: "https://example.com/audio5.mp3",
    pdfUrl: "https://example.com/pdf5.pdf",
  },
];

const ViewScreen = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedFilter, setSelectedFilter] = useState("all");
  const [expandedDescriptions, setExpandedDescriptions] = useState<{
    [key: number]: boolean;
  }>({});
  const flatListRef = useRef<FlatList>(null);

  const scrollToItem = (id: number) => {
    const index = marsiyas.findIndex((item) => item.id === id);
    if (index !== -1) {
      flatListRef.current?.scrollToIndex({
        index,
        animated: true,
        viewPosition: 0.1, // Position item slightly below the top
      });
    }
  };

  const toggleDescription = (id: number) => {
    setExpandedDescriptions((prev) => {
      const newState = {
        ...prev,
        [id]: !prev[id],
      };

      if (!prev[id]) {
        requestAnimationFrame(() => {
          scrollToItem(id);
        });
      }

      return newState;
    });
  };

  const filters = [
    { id: "all", label: "All", icon: "apps" },
    { id: "recent", label: "Recent", icon: "time" },
    { id: "popular", label: "Popular", icon: "star" },
    { id: "favorites", label: "Favorites", icon: "heart" },
  ];

  const renderMarsiyaItem = ({ item }: { item: (typeof marsiyas)[0] }) => (
    <TouchableOpacity
      style={styles.marsiyaCard}
      onPress={() => {
        // Handle marsiya selection
      }}
    >
      <LinearGradient
        colors={["#2A2A4A", "#1E1E3E"]}
        style={styles.marsiyaGradient}
      >
        <View style={styles.marsiyaContent}>
          <View style={styles.marsiyaHeader}>
            <Text style={styles.marsiyaName}>{item.name}</Text>
            <View style={styles.marsiyaActions}>
              <TouchableOpacity style={styles.actionButton}>
                <MaterialIcons
                  name="play-circle-outline"
                  size={24}
                  color="#FF6B35"
                />
              </TouchableOpacity>
              <TouchableOpacity style={styles.actionButton}>
                <MaterialIcons
                  name="picture-as-pdf"
                  size={24}
                  color="#FF6B35"
                />
              </TouchableOpacity>
            </View>
          </View>
          <Text
            style={styles.marsiyaDescription}
            numberOfLines={expandedDescriptions[item.id] ? undefined : 2}
            ellipsizeMode="tail"
          >
            {expandedDescriptions[item.id]
              ? item.fullDescription
              : item.description}
          </Text>
          <TouchableOpacity
            style={styles.seeMoreButton}
            onPress={() => toggleDescription(item.id)}
          >
            <Text style={styles.seeMoreText}>
              {expandedDescriptions[item.id] ? "See less" : "See more"}
            </Text>
            <Ionicons
              name={
                expandedDescriptions[item.id] ? "chevron-up" : "chevron-down"
              }
              size={16}
              color="#FF6B35"
            />
          </TouchableOpacity>
        </View>
      </LinearGradient>
    </TouchableOpacity>
  );

  return (
    <LinearGradient colors={["#1A1A2E", "#16213E"]} style={styles.container}>
      <SafeAreaView style={styles.safeArea} edges={["top"]}>
        <View>
          {/* Header */}
          <View style={styles.header}>
            <TouchableOpacity
              onPress={() => router.back()}
              style={styles.backButton}
            >
              <Ionicons name="arrow-back" size={24} color="#fff" />
            </TouchableOpacity>
            <Text style={styles.headerTitle}>View Marsiya</Text>
            <View style={styles.backButton} />
          </View>

          {/* Search Box */}
          <View style={styles.searchContainer}>
            <Ionicons name="search" size={20} color="rgba(255,255,255,0.6)" />
            <TextInput
              style={styles.searchInput}
              placeholder="Search Marsiya..."
              placeholderTextColor="rgba(255,255,255,0.6)"
              value={searchQuery}
              onChangeText={setSearchQuery}
            />
          </View>

          {/* Filters */}
          <View style={styles.filtersWrapper}>
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.filtersContainer}
            >
              {filters.map((filter) => (
                <TouchableOpacity
                  key={filter.id}
                  style={[
                    styles.filterButton,
                    selectedFilter === filter.id && styles.filterButtonActive,
                  ]}
                  onPress={() => setSelectedFilter(filter.id)}
                >
                  <Ionicons
                    name={filter.icon as any}
                    size={16}
                    color={
                      selectedFilter === filter.id
                        ? "#fff"
                        : "rgba(255,255,255,0.8)"
                    }
                    style={styles.filterIcon}
                  />
                  <Text
                    style={[
                      styles.filterText,
                      selectedFilter === filter.id && styles.filterTextActive,
                    ]}
                  >
                    {filter.label}
                  </Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>

          {/* Marsiya List */}
          <FlatList
            ref={flatListRef}
            data={marsiyas}
            renderItem={renderMarsiyaItem}
            keyExtractor={(item) => item.id.toString()}
            contentContainerStyle={styles.listContent}
            showsVerticalScrollIndicator={false}
            onScrollToIndexFailed={(info) => {
              const wait = new Promise((resolve) => setTimeout(resolve, 100));
              wait.then(() => {
                flatListRef.current?.scrollToIndex({
                  index: info.index,
                  animated: true,
                  viewPosition: 0.1,
                });
              });
            }}
          />
        </View>
      </SafeAreaView>
    </LinearGradient>
  );
};

export default ViewScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  safeArea: {
    flex: 1,
  },

  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 12,
  },
  backButton: {
    width: 40,
    height: 40,
    alignItems: "center",
    justifyContent: "center",
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#fff",
    fontFamily: "ralewayMedium",
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(255,255,255,0.1)",
    marginVertical: 12,
    paddingHorizontal: 12,
    borderRadius: 12,
    height: 48,
  },
  searchInput: {
    marginLeft: 8,
    color: "#fff",
    fontSize: 16,
    fontFamily: "mont",
  },
  filtersWrapper: {
    marginBottom: 12,
  },
  filtersContainer: {
    paddingHorizontal: 16,
  },
  filterButton: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    marginRight: 8,
    backgroundColor: "rgba(255,255,255,0.1)",
    height: 32,
  },
  filterButtonActive: {
    backgroundColor: "#FF6B35",
  },
  filterIcon: {
    marginRight: 4,
  },
  filterText: {
    color: "rgba(255,255,255,0.8)",
    fontSize: 13,
    fontFamily: "mont",
  },
  filterTextActive: {
    color: "#fff",
    fontWeight: "600",
  },

  listContent: {
    paddingBottom: 160,
  },
  marsiyaCard: {
    borderRadius: 16,
    overflow: "hidden",
    marginVertical: 8,
  },
  marsiyaGradient: {
    borderRadius: 16,
  },
  marsiyaContent: {
    padding: 12,
  },
  marsiyaHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 6,
  },
  marsiyaName: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#fff",
    fontFamily: "ralewayMedium",
    flex: 1,
  },
  marsiyaActions: {
    flexDirection: "row",
    alignItems: "center",
  },
  actionButton: {
    padding: 4,
    marginLeft: 8,
  },
  marsiyaDescription: {
    fontSize: 14,
    color: "rgba(255,255,255,0.8)",
    fontFamily: "mont",
    lineHeight: 20,
  },
  seeMoreButton: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 6,
    alignSelf: "flex-start",
  },
  seeMoreText: {
    color: "#FF6B35",
    fontSize: 13,
    fontFamily: "mont",
    marginRight: 4,
  },
});
