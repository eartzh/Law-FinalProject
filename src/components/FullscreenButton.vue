<script setup>
import { onBeforeUnmount, onMounted, ref } from 'vue';

const isFullscreen = ref(false);
const isFakeFullscreen = ref(false);
const fullscreenFailed = ref(false);

function getFullscreenElement() {
  return (
    document.fullscreenElement ||
    document.webkitFullscreenElement ||
    document.mozFullScreenElement ||
    document.msFullscreenElement ||
    null
  );
}

function updateFullscreenState() {
  isFullscreen.value = Boolean(getFullscreenElement());
}

async function requestGameFullscreen() {
  const target = document.getElementById('game-container');
  if (!target) return;

  fullscreenFailed.value = false;

  try {
    const request =
      target.requestFullscreen ||
      target.webkitRequestFullscreen ||
      target.webkitRequestFullScreen ||
      target.mozRequestFullScreen ||
      target.msRequestFullscreen;

    if (!request) {
      enableFakeFullscreen();
      return;
    }

    await request.call(target, {
      navigationUI: 'hide'
    });

    updateFullscreenState();
  } catch (error) {
    console.warn('Fullscreen failed, fallback to fake fullscreen:', error);
    fullscreenFailed.value = true;
    enableFakeFullscreen();
  }
}

async function exitGameFullscreen() {
  try {
    const exit =
      document.exitFullscreen ||
      document.webkitExitFullscreen ||
      document.webkitCancelFullScreen ||
      document.mozCancelFullScreen ||
      document.msExitFullscreen;

    if (exit && getFullscreenElement()) {
      await exit.call(document);
    }

    disableFakeFullscreen();
    updateFullscreenState();
  } catch (error) {
    console.warn('Exit fullscreen failed:', error);
    disableFakeFullscreen();
  }
}

function enableFakeFullscreen() {
  isFakeFullscreen.value = true;
  document.body.classList.add('game-fake-fullscreen');
}

function disableFakeFullscreen() {
  isFakeFullscreen.value = false;
  document.body.classList.remove('game-fake-fullscreen');
}

function toggleFullscreen() {
  if (isFullscreen.value || isFakeFullscreen.value) {
    exitGameFullscreen();
  } else {
    requestGameFullscreen();
  }
}

onMounted(() => {
  document.addEventListener('fullscreenchange', updateFullscreenState);
  document.addEventListener('webkitfullscreenchange', updateFullscreenState);
  document.addEventListener('mozfullscreenchange', updateFullscreenState);
  document.addEventListener('MSFullscreenChange', updateFullscreenState);

  updateFullscreenState();
});

onBeforeUnmount(() => {
  document.removeEventListener('fullscreenchange', updateFullscreenState);
  document.removeEventListener('webkitfullscreenchange', updateFullscreenState);
  document.removeEventListener('mozfullscreenchange', updateFullscreenState);
  document.removeEventListener('MSFullscreenChange', updateFullscreenState);

  disableFakeFullscreen();
});
</script>

<template>
  <button
    class="fullscreen-button"
    :class="{ active: isFullscreen || isFakeFullscreen }"
    @click.stop.prevent="toggleFullscreen"
  >
    {{ isFullscreen || isFakeFullscreen ? '退出全螢幕' : '全螢幕' }}
  </button>

  <div
    v-if="fullscreenFailed && isFakeFullscreen"
    class="fullscreen-hint"
  >
    目前瀏覽器不支援真正全螢幕，已切換為沉浸式畫面。
  </div>
</template>
