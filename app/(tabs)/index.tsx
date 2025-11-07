import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import { Dimensions, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';

export default function HomeScreen() {
  

  // STATE HOOKS - ALL TOGETHER
  const [currentEmojis, setCurrentEmojis] = useState<string[]>([]);
  const [selectedEmoji, setSelectedEmoji] = useState<string | null>(null);
  const [showLarge, setShowLarge] = useState(false);
  const [showIntro, setShowIntro] = useState(true);
  const [currentTooltip, setCurrentTooltip] = useState(0);

  // CONSTANTS - AFTER HOOKS
  const emojiCategories = {
    faces: ['😊', '😄', '😆', '🥰', '😍', '🤗', '😋', '😎', '🤪', '😴', '😂', '🤣', '😇', '🙂', '🥳', '🤩', '😘', '😚', '🤭'],
    nature: ['🌞', '⭐', '🌙', '🌈', '🌸', '🌺', '🌻', '🌳', '🍄', '⛅', '🌟', '💫', '☀️', '🌿', '🌱', '🍀', '🌷', '🌼', '🦋', '🌊'],
    transportation: ['🚗', '🚕', '🚙', '🚌', '🚎', '🛻', '🚂', '✈️', '🚁', '🛳️', '🚲', '🛴', '🏍️', '🚜', '🚒', '🚑', '🚓', '🛥️', '🚤', '🛸'],
    food: ['🍎', '🍌', '🍓', '🍊', '🍇', '🥕', '🍞', '🥛', '🍪', '🧁', '🍒', '🍑', '🥭', '🍍', '🥥', '🍉', '🥖', '🧀', '🥚', '🍯'],
    animals: ['🐶', '🐱', '🐭', '🐹', '🐰', '🦊', '🐻', '🐼', '🐸', '🐛', '🐯', '🦁', '🐨', '🐵', '🐔', '🐧', '🐦', '🐤', '🐢', '🦒', '🐘', '🐮', '🐷', '🐑', '🦆', '🐞', '🦋', '🐙', '🐬', '🐳']
  };

  const allEmojis = Object.values(emojiCategories).flat();

  const tooltips = [
    { title: "Random Emojis Appear!", emoji: "☺️", description: "Invite your little one to tap away." },
    { title: "Learn Concepts", emoji: "🔷", description: "Talk about basic words and ideas." },
    { title: "Lock it Down", emoji: "🔒", description: "Set your phone to kid mode! Go to Guided Access in Settings > Accessibility." }
  ];

  const backgroundColors = ['#FFB6E1', '#ADD8E6', '#90EE90', 'rgba(255, 255, 224, 1)'];
  const screenWidth = Dimensions.get('window').width;
  const itemSize = (screenWidth - 40) / 2;

  // FUNCTIONS
  const generateRandomEmojis = () => {
    const shuffled = [...allEmojis].sort(() => Math.random() - 0.5);
    return shuffled.slice(0, 4);
  };

  const handleEmojiClick = (emoji: string) => {
    setSelectedEmoji(emoji);
    setShowLarge(true);
    setTimeout(() => {
      setShowLarge(false);
      setSelectedEmoji(null);
      setTimeout(() => {
        setCurrentEmojis(generateRandomEmojis());
      }, 100);
    }, 1500);
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
      <View style={[styles.container, { backgroundColor: '#E89EE0' }]}>
        <StatusBar />
        <ScrollView contentContainerStyle={styles.introContainer}>
          <Text style={styles.introTitle}>👀 Peekmo</Text>
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
              style={({ pressed }) => [styles.button, styles.nextButton, pressed && styles.buttonPressed]}
              onPress={nextTooltip}
            >
              <Text style={styles.nextButtonText}>NEXT</Text>
            </Pressable>
          </View>

          <View style={styles.footerContainer}>
        <Text style={styles.footer}>
          For entertainment only. Ages 2+. © 2025 Peekmo™
        </Text>
      </View>
        </ScrollView>
      </View>
    );
  }

  // RENDER - LARGE EMOJI
  if (showLarge && selectedEmoji) {
    return (
      <View style={styles.largeContainer}>
        <Text style={styles.largeEmoji}>{selectedEmoji}</Text>
      </View>
    );
  }

  // RENDER - GAME SCREEN
  return (
    <View style={styles.container}>
      <StatusBar />

      <View style={styles.gridWrapper}>
        <View style={styles.row}>
          <Pressable
            onPress={() => handleEmojiClick(currentEmojis[0])}
            style={{
              width: itemSize,
              height: itemSize,
              backgroundColor: backgroundColors[0],
              justifyContent: 'center',
              alignItems: 'center',
              borderRadius: 16,
              borderWidth: 4,
              borderColor: 'white',
              margin: 8,
            }}
          >
            <Text style={styles.emoji}>{currentEmojis[0]}</Text>
          </Pressable>

          <Pressable
            onPress={() => handleEmojiClick(currentEmojis[1])}
            style={{
              width: itemSize,
              height: itemSize,
              backgroundColor: backgroundColors[1],
              justifyContent: 'center',
              alignItems: 'center',
              borderRadius: 16,
              borderWidth: 4,
              borderColor: 'white',
              margin: 8,
            }}
          >
            <Text style={styles.emoji}>{currentEmojis[1]}</Text>
          </Pressable>
        </View>

        <View style={styles.row}>
          <Pressable
            onPress={() => handleEmojiClick(currentEmojis[2])}
            style={{
              width: itemSize,
              height: itemSize,
              backgroundColor: backgroundColors[2],
              justifyContent: 'center',
              alignItems: 'center',
              borderRadius: 16,
              borderWidth: 4,
              borderColor: 'white',
              margin: 8,
            }}
          >
            <Text style={styles.emoji}>{currentEmojis[2]}</Text>
          </Pressable>

          <Pressable
            onPress={() => handleEmojiClick(currentEmojis[3])}
            style={{
              width: itemSize,
              height: itemSize,
              backgroundColor: backgroundColors[3],
              justifyContent: 'center',
              alignItems: 'center',
              borderRadius: 16,
              borderWidth: 4,
              borderColor: 'white',
              margin: 8,
            }}
          >
            <Text style={styles.emoji}>{currentEmojis[3]}</Text>
          </Pressable>
        </View>
      </View>

      <View style={styles.footerContainer}>
        <Text style={styles.footer}>
          For entertainment only. Ages 2+. © 2025 Peekmo™
        </Text>
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
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingVertical: 40,
  },
  introTitle: {
    fontSize: 48,
   
    marginBottom: 12,
    color: '#1e40af',
  },
  subtitle: {
    fontSize: 18,

    marginBottom: 32,
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
    
    color: '#1e40af',
    marginBottom: 16,
  },
  tooltipDescription: {
    fontSize: 16,
    
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
    backgroundColor: '#1e40af',
  },
  skipButtonText: {
    fontSize: 16,
    
    color: '#1e40af',
  },
  nextButtonText: {
    fontSize: 16,
  
    color: '#ffffff',
  },
  buttonPressed: {
    opacity: 0.8,
  },
  legalText: {
    fontSize: 12,

    color: '#374151',
    textAlign: 'center',
    lineHeight: 18,
  },
  gridWrapper: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  emoji: {
    fontSize: 64,
  },
  largeContainer: {
    flex: 1,
    backgroundColor: 'rgba(255, 255, 224, 1)',
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
    
    color: '#666',
    textAlign: 'center',
    marginBottom: 8,
    opacity: 0.7,
  },
});
