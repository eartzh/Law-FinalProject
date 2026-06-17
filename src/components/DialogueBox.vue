<script setup>
import { computed, onBeforeUnmount, ref, watch } from 'vue';
import { useGameStore } from '../stores/gameStore';

const game = useGameStore();


const visibleText = ref('');
const isTyping = ref(false);
let timer = null;


const canShowNext = computed(() => !game.showChoices.value && !game.ending.value && !isTyping.value);


function clearTypingTimer() {
  if (timer) {
    clearInterval(timer);
    timer = null;
  }
}


function startTypewriter(text) {
  clearTypingTimer();


  visibleText.value = '';
  isTyping.value = true;


  let index = 0;
  const chars = [...text];


  timer = setInterval(() => {
    visibleText.value += chars[index] ?? '';
    index += 1;


    if (index >= chars.length) {
      clearTypingTimer();
      isTyping.value = false;
    }
  }, 24);
}


function handleDialogueClick() {
  if (game.showChoices.value || game.ending.value) return;


  if (isTyping.value) {
    clearTypingTimer();
    visibleText.value = game.dialogueText.value;
    isTyping.value = false;
    return;
  }


  game.continueDialogue();
}


watch(
  () => game.dialogueVersion.value,
  () => startTypewriter(game.dialogueText.value),
  { immediate: true }
);


onBeforeUnmount(() => clearTypingTimer());
</script>


<template>
  <div class="dialogue-box" @click="handleDialogueClick">
    <div class="speaker-name" :class="game.speakerClass">
      {{ game.speaker }}
    </div>


    <p class="dialogue-text">{{ visibleText }}</p>


    <button v-if="canShowNext" class="next-button">
      NEXT ▶
    </button>


    <button v-else-if="isTyping" class="next-button">
      SKIP ▶
    </button>
  </div>
</template>
