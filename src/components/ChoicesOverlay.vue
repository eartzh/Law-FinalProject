<script setup>
import { useGameStore } from '../stores/gameStore';

const game = useGameStore();

const proposal = game.proposal;
const rerollCount = game.rerollCount;
const choices = game.choices;
</script>

<template>
  <div class="choices-container">
    <div class="choices-panel">
      <div v-if="proposal" class="proposal-card">
        <h3>協調方案 第 {{ rerollCount + 1 }} 輪</h3>

        <p>
          玩家負擔：
          <b>{{ game.formatMoney(proposal.cost) }}</b>
        </p>

        <p>
          好感度扣除：
          <b>{{ proposal.penalty.toFixed(1) }}</b>
        </p>

        <p v-if="rerollCount >= 3">
          法院見已解鎖：可用法定結果結算。
        </p>
      </div>

      <button
        v-for="choice in choices"
        :key="choice.key"
        class="choice-button"
        :class="choice.class"
        :disabled="choice.disabled"
        @click="choice.action"
      >
        {{ choice.label }}
      </button>
    </div>
  </div>
</template>