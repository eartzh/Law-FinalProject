<script setup>
import { useGameStore } from '../stores/gameStore';
import HudBar from './HudBar.vue';
import CharacterSprite from './CharacterSprite.vue';
import DialogueBox from './DialogueBox.vue';
import ChoicesOverlay from './ChoicesOverlay.vue';
import EndingOverlay from './EndingOverlay.vue';
import MonthTransitionOverlay from './MonthTransitionOverlay.vue';

const game = useGameStore();

const showChoices = game.showChoices;
const ending = game.ending;
const isMonthTransitioning = game.isMonthTransitioning;
</script>

<template>
  <section id="game-stage">
    <div class="game-bg"></div>
    <CharacterSprite />
    <HudBar />
    <DialogueBox />

    <ChoicesOverlay v-if="showChoices" />
    <EndingOverlay v-if="ending" />
    <MonthTransitionOverlay v-if="isMonthTransitioning" />
  </section>
</template>
