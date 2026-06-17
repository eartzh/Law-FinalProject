<script setup>
import { useGameStore } from '../stores/gameStore';

const game = useGameStore();
</script>

<template>
  <div class="ending-overlay">
    <div class="ending-card">
      <h1>{{ game.ending.value.title }}</h1>
      <p>{{ game.ending.value.text }}</p>
      <p>
        最終金錢：{{ game.formatMoney(game.money.value) }}｜好感度：{{ Math.round(game.favor.value) }}
      </p>
      <button class="choice-button safe" @click="game.restart">
        重新開始
      </button>
    </div>
  </div>
</template>
