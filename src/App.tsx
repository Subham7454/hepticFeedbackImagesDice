import React, {useState, useRef} from 'react';
import type {PropsWithChildren} from 'react';
import {
  StyleSheet,
  Text,
  View,
  ImageSourcePropType,
  Image,
  Pressable,
  Animated,
} from 'react-native';
import ReactNativeHapticFeedback from 'react-native-haptic-feedback';
import DiceOne from '../assests/One.png';
import DiceTwo from '../assests/Two.png';
import DiceThree from '../assests/Three.png';
import DiceFour from '../assests/Four.png';
import DiceFive from '../assests/Five.png';
import DiceSix from '../assests/Six.png';

type DiceProps = PropsWithChildren<{
  imageUrl: ImageSourcePropType;
  diceAnimation: Animated.Value; // Added animated value prop
}>;
// Optional configuration
const options = {
  enableVibrateFallback: true,
  ignoreAndroidSystemSettings: false,
};
const Dice = ({imageUrl, diceAnimation}: DiceProps): React.JSX.Element => {
  const animatedStyle = {
    transform: [
      {
        rotate: diceAnimation.interpolate({
          inputRange: [0, 1],
          outputRange: ['0deg', '360deg'],
        }),
      },
    ],
  };
  // Optional configuration
  const options = {
    enableVibrateFallback: true,
    ignoreAndroidSystemSettings: false,
  };

  return (
    <Animated.View style={animatedStyle}>
      <Image style={styles.diceImage} source={imageUrl} />
    </Animated.View>
  );
};

function App(): React.JSX.Element {
  const [diceImage, SetDiceImage] = useState<ImageSourcePropType>(DiceOne);
  const diceAnimation = useRef(new Animated.Value(0)).current; // Reference for animation

  const rollDiceOnTap = () => {
    let randomNumber = Math.floor(Math.random() * 6) + 1;

    // Reset the animation value before starting
    diceAnimation.setValue(0);

    // Start the animation
    Animated.timing(diceAnimation, {
      toValue: 1,
      duration: 500, // 0.5 seconds for the animation
      useNativeDriver: true,
    }).start(() => {
      // Update the dice image after the animation is done
      switch (randomNumber) {
        case 1:
          SetDiceImage(DiceOne);
          break;
        case 2:
          SetDiceImage(DiceTwo);
          break;
        case 3:
          SetDiceImage(DiceThree);
          break;
        case 4:
          SetDiceImage(DiceFour);
          break;
        case 5:
          SetDiceImage(DiceFive);
          break;
        case 6:
          SetDiceImage(DiceSix);
          break;

        default:
          break;
      }
      ReactNativeHapticFeedback.trigger('impactLight', options);
    });
  };

  return (
    <View style={styles.container}>
      <Dice imageUrl={diceImage} diceAnimation={diceAnimation} />
      <Pressable onPress={rollDiceOnTap}>
        <Text style={styles.rollDiceBtnText}>Press To Roll Dice</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'black',
  },
  diceContainer: {
    margin: 12,
  },
  diceImage: {
    width: 200,
    height: 200,
  },
  rollDiceBtnText: {
    paddingVertical: 10,
    paddingHorizontal: 40,
    borderWidth: 2,
    borderRadius: 8,
    borderColor: '#E5E0FF',
    fontSize: 16,
    color: '#8EA7E9',
    fontWeight: '700',
    textTransform: 'uppercase',
  },
});

export default App;
