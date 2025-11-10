import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { colors, typography, spacing } from '../../constants';

export interface CountdownTimerProps {
  remainingTime: number; // milliseconds
  showLabels?: boolean;
  size?: 'small' | 'medium' | 'large';
}

export const CountdownTimer: React.FC<CountdownTimerProps> = ({
  remainingTime,
  showLabels = true,
  size = 'medium',
}) => {
  // Convert milliseconds to minutes and seconds
  const totalSeconds = Math.floor(remainingTime / 1000);
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;

  // Format with leading zeros
  const formattedMinutes = minutes.toString().padStart(2, '0');
  const formattedSeconds = seconds.toString().padStart(2, '0');

  const timerStyle = [
    styles.timer,
    size === 'small' && styles.timerSmall,
    size === 'large' && styles.timerLarge,
  ];

  const labelStyle = [
    styles.label,
    size === 'small' && styles.labelSmall,
    size === 'large' && styles.labelLarge,
  ];

  return (
    <View style={styles.container}>
      <View style={styles.timeGroup}>
        <Text style={timerStyle}>{formattedMinutes}</Text>
        {showLabels && <Text style={labelStyle}>minutes</Text>}
      </View>

      <Text style={timerStyle}>:</Text>

      <View style={styles.timeGroup}>
        <Text style={timerStyle}>{formattedSeconds}</Text>
        {showLabels && <Text style={labelStyle}>seconds</Text>}
      </View>
    </View>
  );
};

// Helper function to format time for display (can be used elsewhere)
export const formatTime = (milliseconds: number): string => {
  const totalSeconds = Math.floor(milliseconds / 1000);
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xs,
  },
  timeGroup: {
    alignItems: 'center',
  },
  timer: {
    ...typography.timer,
    color: colors.timerGreen,
    fontWeight: '700',
  },
  timerSmall: {
    fontSize: 18,
    lineHeight: 24,
  },
  timerLarge: {
    fontSize: 32,
    lineHeight: 40,
  },
  label: {
    ...typography.timerLabel,
    color: colors.textSecondary,
    textTransform: 'lowercase',
  },
  labelSmall: {
    fontSize: 8,
  },
  labelLarge: {
    fontSize: 12,
  },
});
