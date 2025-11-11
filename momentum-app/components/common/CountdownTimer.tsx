import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { colors, typography, spacing } from '../../constants';

export interface CountdownTimerProps {
  remainingTime: number; // milliseconds
  showLabels?: boolean;
  size?: 'small' | 'medium' | 'large';
  testID?: string;
}

export const CountdownTimer: React.FC<CountdownTimerProps> = ({
  remainingTime,
  showLabels = true,
  size = 'medium',
  testID,
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
    <View style={styles.container} testID={testID ?? 'countdownTimer.container'}>
      <View style={styles.row} testID="countdownTimer.row">
        {/* Minutes Column */}
        <View style={styles.timeUnit} testID="countdownTimer.minutesColumn">
          <Text style={timerStyle} testID="countdownTimer.minutes">{formattedMinutes}</Text>
          {showLabels && (
            <Text style={labelStyle} testID="countdownTimer.minutesLabel">minutes</Text>
          )}
        </View>

        {/* Separator */}
        <View style={styles.separatorColumn} testID="countdownTimer.separatorColumn">
          <Text style={[timerStyle, styles.separator]} testID="countdownTimer.separator">:</Text>
        </View>

        {/* Seconds Column */}
        <View style={styles.timeUnit} testID="countdownTimer.secondsColumn">
          <Text style={timerStyle} testID="countdownTimer.seconds">{formattedSeconds}</Text>
          {showLabels && (
            <Text style={labelStyle} testID="countdownTimer.secondsLabel">seconds</Text>
          )}
        </View>
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
    alignItems: 'center',
    justifyContent: 'center',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'center',
  },
  timeUnit: {
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  separatorColumn: {
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingHorizontal: 6,
    paddingTop: 0,
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
  separator: {
    // Inherits from timer style
  },
  label: {
    ...typography.timerLabel,
    color: colors.textPrimary,
    textTransform: 'lowercase',
    marginTop: 4,
  },
  labelSmall: {
    fontSize: 8,
  },
  labelLarge: {
    fontSize: 12,
  },
});
