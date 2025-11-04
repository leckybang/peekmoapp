
import { Fonts } from '@/constants/theme';
import { LinearGradient } from 'expo-linear-gradient';
import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useRef, useState } from 'react';
import { Animated, Dimensions, Image, Linking, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';

export default function HomeScreen() {
  

  // STATE HOOKS - ALL TOGETHER
  const [currentEmojis, setCurrentEmojis] = useState<string[]>([]);
  const [selectedEmoji, setSelectedEmoji] = useState<string | null>(null);
  const [showLarge, setShowLarge] = useState(false);
  const [showIntro, setShowIntro] = useState(true);
  const [currentTooltip, setCurrentTooltip] = useState(0);

  // ANIMATED VALUES FOR BOUNCE
  const scaleAnims = useRef([
    new Animated.Value(1),
    new Animated.Value(1),
    new Animated.Value(1),
    new Animated.Value(1),
  ]).current;

  // CONSTANTS - AFTER HOOKS
  const emojiCategories = {
    faces: ['😄', '🥰', '😍', '🤗', '😋', '😎', '🤪', '😴', '🤣', '😇', '🥳', '🤩', '😘', '🤭'],
    nature: ['🌞', '⭐', '🌙', '🌈', '🌸', '🌺', '🌻', '🌳', '🍄', '⛅', '🌟', '💫', '☀️', '🌿', '🌱', '🍀', '🌷', '🌼', '🦋', '🌊'],
    transportation: ['🚗', '🚕', '🚙', '🚌', '🚎', '🛻', '🚂', '✈️', '🚁', '🛳️', '🚲', '🛴', '🏍️', '🚜', '🚒', '🚑', '🚓', '🛥️', '🚤', '🛸'],
    food: ['🍎', '🍌', '🍓', '🍊', '🍇', '🥕', '🍞', '🥛', '🍪', '🧁', '🍒', '🍑', '🥭', '🍍', '🥥', '🍉', '🥖', '🧀', '🥚', '🍯'],
    animals: ['🐶', '🐱', '🐭', '🐹', '🐰', '🦊', '🐻', '🐼', '🐸', '🐛', '🐯', '🦁', '🐨', '🐵', '🐔', '🐧', '🐦', '🐤', '🐢', '🦒', '🐘', '🐮', '🐷', '🐑', '🦆', '🐞', '🦋', '🐙', '🐬', '🐳']

  };

  const allEmojis = Object.values(emojiCategories).flat();

  const tooltips = [
    { title: "Random Smash Mode", emoji: "👋", description: "Let your little one smash away at random emoji." },
    { title: "Learning Mode", emoji: "🔷", description: "Say a word out loud and ask them to find it." },
    { title: "Lock it Down", emoji: "🔒", description: "To limit their phone use to just this app, go to Guided Access in Settings > Accessibility." }
  ];

  // VIBRANT GRADIENT COLORS
  const gradientColors = [
    ['#FF6B9D', '#FEC5E5'], // Pink gradient
    ['#4FACFE', '#00F2FE'], // Blue gradient
    ['#43E97B', '#38F9D7'], // Green gradient
    ['#FA709A', '#FEE140'], // Yellow-pink gradient
  ];

  const screenWidth = Dimensions.get('window').width;
  const screenHeight = Dimensions.get('window').height;
  const itemSize = (screenWidth - 16) / 2; // Reduced margin for larger tiles

  // FUNCTIONS
  const generateRandomEmojis = () => {
    const shuffled = [...allEmojis].sort(() => Math.random() - 0.5);
    return shuffled.slice(0, 4);
  };

  const handleEmojiClick = (emoji: string, index: number) => {
    // Quick, snappy bounce animation
    Animated.sequence([
      Animated.timing(scaleAnims[index], {
        toValue: 1.2,
        duration: 80,
        useNativeDriver: true,
      }),
      Animated.timing(scaleAnims[index], {
        toValue: 1,
        duration: 80,
        useNativeDriver: true,
      }),
    ]).start(() => {
      // Show large emoji AFTER quick bounce
      setSelectedEmoji(emoji);
      setShowLarge(true);
      setTimeout(() => {
        setShowLarge(false);
        setSelectedEmoji(null);
        setTimeout(() => {
          setCurrentEmojis(generateRandomEmojis());
        }, 100);
      }, 1500);
    });
  };

  const nextTooltip = () => {
    if (currentTooltip < tooltips.length - 1) {
      setCurrentTooltip(currentTooltip + 1);
    } else {
      setShowIntro(false);
    }
  };

  const skipIntro = () => {
    setShowIntro(false);
  };

  // EFFECT
  useEffect(() => {
    setCurrentEmojis(generateRandomEmojis());
  }, []);

  // RENDER - INTRO SCREEN
  if (showIntro) {
    return (
      <LinearGradient
        colors={['#E89EE0', '#C471F5', '#9D5CDB']}
        start={{ x: 0, y: 0 }}
        end={{ x: 0, y: 1 }}
        style={styles.container}
      >
        <StatusBar />
        <ScrollView contentContainerStyle={styles.introContainer}>
          <Image
            source={require('@/assets/images/peekmo-logo.png')}
            style={styles.logo}
            resizeMode="contain"
          />
          <Text style={styles.subtitle}>Play Peekaboo with Emojis</Text>

          <View style={styles.tooltipCard}>
            <Text style={styles.tooltipLabel}>HOW IT WORKS</Text>
            <Text style={styles.tooltipEmoji}>{tooltips[currentTooltip].emoji}</Text>
            <Text style={styles.tooltipTitle}>{tooltips[currentTooltip].title}</Text>
            <Text style={styles.tooltipDescription}>{tooltips[currentTooltip].description}</Text>
          </View>

          <View style={styles.dotsContainer}>
            {tooltips.map((_, index) => (
              <View
                key={index}
                style={[
                  styles.dot,
                  index === currentTooltip ? styles.dotActive : styles.dotInactive
                ]}
              />
            ))}
          </View>

          <View style={styles.buttonContainer}>
            <Pressable
              style={({ pressed }) => [styles.button, styles.skipButton, pressed && styles.buttonPressed]}
              onPress={skipIntro}
            >
              <Text style={styles.skipButtonText}>SKIP</Text>
            </Pressable>
            <Pressable
              onPress={nextTooltip}
            >
              <LinearGradient
                colors={['#4F46E5', '#7C3AED']}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                style={[styles.button, styles.nextButton]}
              >
                <Text style={styles.nextButtonText}>NEXT</Text>
              </LinearGradient>
            </Pressable>
          </View>

          <View style={styles.introSpacer} />

          <Text style={styles.legalText}>
            For entertainment only. Parental supervision required.{'\n'}
            Ages 2+. No personal data collected.{'\n'}
            © 2025 Peekmo™. All rights reserved.
          </Text>
        </ScrollView>
      </LinearGradient>
    );
  }

  // RENDER - LARGE EMOJI
  if (showLarge && selectedEmoji) {
    return (
      <LinearGradient
        colors={['#FF6B9D', '#C471F5', '#12C2E9']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.largeContainer}
      >
        <Text style={styles.largeEmoji}>{selectedEmoji}</Text>
      </LinearGradient>
    );
  }

  // RENDER - GAME SCREEN
  return (
    <View style={styles.container}>
      <StatusBar />

      <View style={styles.gameScreen}>
        <View style={styles.gameHeader}>
          <Image
            source={require('@/assets/images/peekmo-logo.png')}
            style={styles.gameLogo}
            resizeMode="contain"
          />
        </View>

        <View style={styles.gridWrapper}>
        <View style={styles.row}>
          <Pressable onPress={() => handleEmojiClick(currentEmojis[0], 0)}>
            <Animated.View style={{ transform: [{ scale: scaleAnims[0] }] }}>
              <LinearGradient
                colors={gradientColors[0]}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={styles.emojiTile}
              >
                <Text style={styles.emoji}>{currentEmojis[0]}</Text>
              </LinearGradient>
            </Animated.View>
          </Pressable>

          <Pressable onPress={() => handleEmojiClick(currentEmojis[1], 1)}>
            <Animated.View style={{ transform: [{ scale: scaleAnims[1] }] }}>
              <LinearGradient
                colors={gradientColors[1]}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={styles.emojiTile}
              >
                <Text style={styles.emoji}>{currentEmojis[1]}</Text>
              </LinearGradient>
            </Animated.View>
          </Pressable>
        </View>

        <View style={styles.row}>
          <Pressable onPress={() => handleEmojiClick(currentEmojis[2], 2)}>
            <Animated.View style={{ transform: [{ scale: scaleAnims[2] }] }}>
              <LinearGradient
                colors={gradientColors[2]}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={styles.emojiTile}
              >
                <Text style={styles.emoji}>{currentEmojis[2]}</Text>
              </LinearGradient>
            </Animated.View>
          </Pressable>

          <Pressable onPress={() => handleEmojiClick(currentEmojis[3], 3)}>
            <Animated.View style={{ transform: [{ scale: scaleAnims[3] }] }}>
              <LinearGradient
                colors={gradientColors[3]}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={styles.emojiTile}
              >
                <Text style={styles.emoji}>{currentEmojis[3]}</Text>
              </LinearGradient>
            </Animated.View>
          </Pressable>
        </View>
      </View>
      </View>

      <View style={styles.footerContainer}>
        <Text style={styles.footer}>
          For entertainment only. Ages 2+. © 2025 Peekmo™
        </Text>
        <Pressable onPress={() => Linking.openURL('https://yourprivacypolicyurl.com')}>
          <Text style={styles.privacyLink}>Privacy Policy</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E89EE0',
  },
  introContainer: {
    flexGrow: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingTop: 80,
    paddingBottom: 40,
  },
  logo: {
    width: 250,
    height: 100,
    marginBottom: 0,
  },
  introTitle: {
    fontSize: 48,
    fontFamily: Fonts.snigletBold,
    marginBottom: 12,
    color: '#1e40af',
  },
  subtitle: {
    fontSize: 18,
    fontFamily: Fonts.karlaBold,
    marginBottom: 48,
    color: '#1f2937',
  },
  tooltipCard: {
    backgroundColor: '#ffffff',
    borderRadius: 24,
    padding: 32,
    marginBottom: 24,
    width: '100%',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 5,
  },
  tooltipLabel: {
    fontSize: 12,
    fontFamily: Fonts.karlaBold,
    color: '#1e40af',
    letterSpacing: 1,
    marginBottom: 16,
  },
  tooltipEmoji: {
    fontSize: 56,
    marginBottom: 16,
  },
  tooltipTitle: {
    fontSize: 20,
    fontFamily: Fonts.karlaBold,
    color: '#1e40af',
    marginBottom: 16,
  },
  tooltipDescription: {
    fontSize: 16,
    fontFamily: Fonts.karlaRegular,
    color: '#1e40af',
    lineHeight: 24,
    textAlign: 'center',
  },
  dotsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 24,
    gap: 8,
  },
  dot: {
    width: 12,
    height: 12,
    borderRadius: 6,
  },
  dotActive: {
    backgroundColor: '#1e40af',
    width: 14,
    height: 14,
  },
  dotInactive: {
    backgroundColor: '#93c5fd',
  },
  buttonContainer: {
    flexDirection: 'row',
    gap: 16,
    marginBottom: 32,
  },
  button: {
    paddingHorizontal: 32,
    paddingVertical: 16,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  skipButton: {
    backgroundColor: '#e9d5ff',
    borderWidth: 2,
    borderColor: '#1e40af',
  },
  nextButton: {
    // backgroundColor removed - using gradient
  },
  skipButtonText: {
    fontSize: 16,
    fontFamily: Fonts.karlaBold,
    color: '#1e40af',
  },
  nextButtonText: {
    fontSize: 16,
    fontFamily: Fonts.karlaBold,
    color: '#ffffff',
  },
  buttonPressed: {
    opacity: 0.8,
  },
  introSpacer: {
    flex: 1,
    minHeight: 40,
  },
  legalText: {
    fontSize: 10,
    fontFamily: Fonts.karlaRegular,
    color: '#374151',
    textAlign: 'center',
    lineHeight: 16,
    opacity: 0.6,
    marginTop: 20,
  },
  gameScreen: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  gameHeader: {
    paddingBottom: 30,
    alignItems: 'center',
  },
  gameLogo: {
    width: 180,
    height: 60,
  },
  gridWrapper: {
    alignItems: 'center',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  emojiTile: {
    width: (Dimensions.get('window').width - 8) / 2,
    height: (Dimensions.get('window').width - 8) / 2,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20,
    margin: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  emoji: {
    fontSize: 80,
  },
  largeContainer: {
    flex: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  largeEmoji: {
    fontSize: 150,
  },
  footerContainer: {
    alignItems: 'center',
    paddingBottom: 16,
  },
  footer: {
    fontSize: 10,
    fontFamily: Fonts.karlaRegular,
    color: '#666',
    textAlign: 'center',
    marginBottom: 8,
    opacity: 0.7,
  },
  privacyLink: {
    fontSize: 10,
    fontFamily: Fonts.karlaRegular,
    color: '#1e40af',
    textDecorationLine: 'underline',
  },
});