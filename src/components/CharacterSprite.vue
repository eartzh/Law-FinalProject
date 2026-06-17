<script setup>
import { useGameStore } from '../stores/gameStore';

const game = useGameStore();

const characterSpriteVisible = game.characterSpriteVisible;
const characterSpriteKey = game.characterSpriteKey;
</script>

<template>
  <Transition name="landlord-slide">
    <img
      src="/baozupo.png"
      v-if="characterSpriteVisible"
      :key="characterSpriteKey"
      class="character-sprite"
    >
  </Transition>
</template>
