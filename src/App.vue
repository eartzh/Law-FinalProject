<script setup>
import ContractStage from './components/ContractStage.vue';
import GameStage from './components/GameStage.vue';
import FullscreenButton from './components/FullscreenButton.vue';
import { useGameStore } from './stores/gameStore';

const game = useGameStore();

const stage = game.stage;
const contractFading = game.contractFading;
</script>

<template>
  <main
    id="game-container"
    @selectstart.prevent
    @dragstart.prevent
    @contextmenu.prevent
  >
    <ContractStage v-show="stage === 'contract' || contractFading" />
    <GameStage :class="{ active: stage === 'game' }" />

    <FullscreenButton />
  </main>
</template>
