<script setup>
import { useGameStore } from '../stores/gameStore';

const game = useGameStore();

const monthTransitionText = game.monthTransitionText;
</script>

<template>
  <div class="month-transition-overlay">
    <div class="month-transition-text">
      {{ monthTransitionText }}
    </div>
  </div>
</template>