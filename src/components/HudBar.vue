<script setup>
import { useGameStore } from '../stores/gameStore';

const game = useGameStore();

const month = game.month;
const money = game.money;
const favor = game.favor;
</script>

<template>
  <div class="hud">
    <div class="hud-item">
      月份
      <span class="hud-value">{{ month }}/12</span>
    </div>

    <div class="hud-item">
      金錢
      <span class="hud-value">{{ game.formatMoney(money) }}</span>
    </div>

    <div class="hud-item">
      好感
      <span class="hud-value">{{ Math.round(favor) }}</span>
    </div>
  </div>
</template>