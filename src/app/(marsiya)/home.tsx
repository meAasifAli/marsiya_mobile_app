import {
  FontAwesome,
  FontAwesome5,
  Ionicons,
  MaterialIcons,
} from "@expo/vector-icons";
import AntDesign from "@expo/vector-icons/AntDesign";
import { LinearGradient } from "expo-linear-gradient";
import { router } from "expo-router";
import React, { useEffect, useRef, useState } from "react";
import {
  Animated,
  Dimensions,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const { width } = Dimensions.get("window");
const itemWidth = width / 2 - 24;

const hadiths = [
  "الحسن والحسين سيدا شباب أهل الجنة",
  "إن الحسن والحسين هما ريحانتاي من الدنيا",
  "الحسن والحسين إمامان قاما أو قعدا",
  "الحسن والحسين سيدا شباب أهل الجنة وأبوهما خير منهما",
  "الحسن والحسين نوران من نور الله عز وجل",
  "الحسن والحسين هما الإمامان بعدي",
  "الحسن والحسين ريحانتاي من الدنيا، من أحبهما فقد أحبني ومن أبغضهما فقد أبغضني",

  "الأئمة من بعدي اثنا عشر، أولهم علي بن أبي طالب عليه السلام وآخرهم القائم المهدي عليه السلام",
  "علي عليه السلام مع الحق، والحق مع علي عليه السلام يدور معه حيثما دار",
  "أنا مدينة العلم وعلي عليه السلام بابها، فمن أراد المدينة فليأت الباب",
  "الحسن والحسين عليهما السلام إمامان، من أطاعهما فقد أطاعني ومن عصاهما فقد عصاني",
  "علي بن الحسين زين العابدين عليه السلام أفضل من رأى من نسله",
  "الباقر عليه السلام يبقر العلم بقراً",
  "جعفر بن محمد الصادق عليه السلام صادق في قوله وفعله",
  "موسى بن جعفر الكاظم عليه السلام كاظم الغيظ وصابر على البلاء",
  "علي بن موسى الرضا عليه السلام",
  "محمد بن علي الجواد عليه السلام من عترة الطاهرين",
  "علي بن محمد الهادي عليه السلام هادٍ مهدي",
  "الحسن بن علي العسكري عليه السلام إمام الزاهدين في زمنه",
  "القائم من ولدي اسمه اسمي وكنيته كنيتي، يملأ الأرض قسطاً وعدلاً كما ملئت جوراً وظلماً",
  "من أنكر واحداً من الأئمة عليهم السلام فقد أنكر الجميع",
  "الأئمة بعدي اثنا عشر، كلهم من قريش، كلهم من ولد فاطمة عليها السلام",
];

const HomeScreen = () => {
  const [currentHadith, setCurrentHadith] = useState(0);
  const fadeAnim = useRef(new Animated.Value(1)).current;
  const intervalRef = useRef<number | null>(null);

  useEffect(() => {
    const animateHadith = () => {
      Animated.sequence([
        Animated.timing(fadeAnim, {
          toValue: 0,
          duration: 600,
          useNativeDriver: true,
        }),
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 600,
          useNativeDriver: true,
        }),
      ]).start(() => {
        setCurrentHadith((prev) => (prev + 1) % hadiths.length);
      });
    };

    intervalRef.current = setInterval(animateHadith, 6000);
    return () => clearInterval(intervalRef.current!);
  }, [fadeAnim]);

  useEffect(() => {
    fadeAnim.setValue(1);
  }, [currentHadith, fadeAnim]);

  const gridItems = [
    {
      title: "View Marsiya",
      iconType: "AntDesign",
      iconName: "pdffile1",
      colors: ["#FF6B35", "#F7931E"] as const,
      href: "view",
    },
    {
      title: "Listen Marsiya",
      iconType: "MaterialIcons",
      iconName: "audiotrack",
      colors: ["#8B5CF6", "#A78BFA"] as const,
      href: "listen",
    },
    {
      title: "Publish Marsiya",
      iconType: "AntDesign",
      iconName: "clouduploado",
      colors: ["#EF4444", "#DC2626"] as const,
      href: "publish",
    },
    {
      title: "About Us",
      iconType: "AntDesign",
      iconName: "infocirlceo",
      colors: ["#06B6D4", "#0891B2"] as const,
      href: "about",
    },
    {
      title: "Contact Us",
      iconType: "Ionicons",
      iconName: "call-outline",
      colors: ["#10B981", "#059669"] as const,
      href: "contact",
    },
    {
      title: "Feedback",
      iconType: "MaterialIcons",
      iconName: "feedback",
      colors: ["#F59E0B", "#D97706"] as const,
      href: "feedback",
    },
  ];

  const renderIcon = (iconType: string, iconName: string) => {
    const iconProps = {
      size: 28,
      color: "#fff",
      style: styles.icon,
    };

    switch (iconType) {
      case "AntDesign":
        return <AntDesign name={iconName as any} {...iconProps} />;
      case "FontAwesome":
        return <FontAwesome name={iconName as any} {...iconProps} />;
      case "Ionicons":
        return <Ionicons name={iconName as any} {...iconProps} />;
      case "MaterialIcons":
        return <MaterialIcons name={iconName as any} {...iconProps} />;
      case "FontAwesome5":
        return <FontAwesome5 name={iconName as any} {...iconProps} />;
      default:
        return <AntDesign name="question" {...iconProps} />;
    }
  };

  return (
    <LinearGradient
      colors={["#1A1A2E", "#16213E"] as const}
      style={styles.container}
    >
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.wrapper}>
          {/* Header Section */}
          <View style={styles.headerSection}>
            <Text style={styles.headerTitle}>کشمیری مرثیہ</Text>
            <Animated.View
              style={{
                height: 48,
                justifyContent: "center",
                alignItems: "center",
                opacity: fadeAnim,
              }}
            >
              <Text style={styles.headerSubtitle}>
                {`"${hadiths[currentHadith]}"`}
              </Text>
            </Animated.View>
          </View>

          {/* Logo Section */}
          <View style={styles.logoSection}>
            <LinearGradient
              colors={["#FFD700", "#FFA500"] as const}
              style={styles.logoWrapper}
            >
              <Image
                style={styles.logo}
                source={require("@/assets/images/panjtan.png")}
              />
            </LinearGradient>
          </View>

          {/* Grid Section */}
          <View style={styles.gridSection}>
            <View style={styles.gridWrapper}>
              {gridItems.map((item, index) => (
                <TouchableOpacity
                  onPress={() =>
                    router.push(
                      `/(marsiya)/${item?.href}` as
                        | `/view`
                        | `/listen`
                        | `/publish`
                        | `/about`
                        | `/contact`
                        | `/feedback`
                    )
                  }
                  key={index}
                  style={styles.gridItemContainer}
                >
                  <LinearGradient
                    colors={item.colors}
                    style={styles.gridItem}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 1 }}
                  >
                    <View style={styles.iconContainer}>
                      {renderIcon(item.iconType, item.iconName)}
                    </View>
                    <Text style={styles.gridText}>{item.title}</Text>
                  </LinearGradient>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        </View>
      </SafeAreaView>
    </LinearGradient>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  safeArea: {
    flex: 1,
  },
  wrapper: {
    flex: 1,
  },
  headerSection: {
    alignItems: "center",
    marginBottom: 30,
    paddingTop: 20,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: "bold",
    fontFamily: "ralewayMedium",
    color: "#fff",
    textAlign: "center",
    marginBottom: 8,
    textShadowColor: "rgba(0, 0, 0, 0.3)",
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 4,
  },
  headerSubtitle: {
    fontSize: 16,
    color: "rgba(255, 255, 255, 0.8)",
    fontFamily: "mont",
    textAlign: "center",
    fontWeight: "500",
  },
  logoSection: {
    alignItems: "center",
    marginBottom: 20,
  },
  logoWrapper: {
    height: 140,
    width: 140,
    borderRadius: 70,
    padding: 6,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 10,
  },
  logo: {
    height: "100%",
    width: "100%",
    resizeMode: "cover",
    borderRadius: 64,
  },
  gridSection: {
    flex: 1,
    justifyContent: "center",
  },
  gridWrapper: {
    flexDirection: "row",
    justifyContent: "space-between",
    flexWrap: "wrap",
    gap: 16,
  },
  gridItemContainer: {
    width: itemWidth,
    height: 110,
    borderRadius: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 8,
    elevation: 8,
  },
  gridItem: {
    flex: 1,
    borderRadius: 25,
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 12,
    paddingHorizontal: 12,
  },
  iconContainer: {
    marginBottom: 6,
    padding: 8,
    borderRadius: 25,
    backgroundColor: "rgba(255, 255, 255, 0.25)",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 3,
    elevation: 3,
  },
  icon: {
    textShadowColor: "rgba(0, 0, 0, 0.3)",
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 2,
  },
  gridText: {
    fontSize: 14,
    fontFamily: "ralewayMedium",
    fontWeight: "700",
    color: "#fff",
    textAlign: "center",
    textShadowColor: "rgba(0, 0, 0, 0.3)",
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 2,
  },
});
