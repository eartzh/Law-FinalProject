<script setup>
import { useGameStore } from '../stores/gameStore';

const game = useGameStore();

const contractFeedback = game.contractFeedback;
</script>

<template>
  <div v-if="contractFeedback" class="contract-feedback-mask">
    <div
      class="contract-feedback-popup"
      :class="contractFeedback.type"
    >
      <h2>{{ contractFeedback.title }}</h2>

      <p class="contract-feedback-message">
        {{ contractFeedback.message }}
      </p>

      <div class="contract-feedback-effect">
        <p v-if="contractFeedback.favorDelta !== 0">
          好感度變化：
          <b class="bad">
            {{ contractFeedback.favorDelta }}
          </b>
        </p>

        <p v-else>
          好感度變化：
          <b>0</b>
        </p>
      </div>

      <button
        class="contract-feedback-button"
        @click="game.closeContractFeedback"
      >
        確認
      </button>
    </div>
  </div>
</template>
``