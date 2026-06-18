<script setup>
import { useGameStore } from '../stores/gameStore';
import ContractFeedbackPopup from './ContractFeedbackPopup.vue';

const game = useGameStore();

const clauses = game.clauses;
const money = game.money;
const favor = game.favor;
const contractFading = game.contractFading;
const contractFeedback = game.contractFeedback;
</script>

<template>
  <section
    id="contract-stage"
    :class="{ 'fade-out': contractFading }"
  >
    <article class="contract-card">
      <h1 class="contract-title">房屋租賃契約書</h1>
      <p class="contract-subtitle">請逐條審閱。點擊條款可提出修改。</p>

      <div class="stats-preview">
        <span class="pill">金錢 {{ game.formatMoney(money) }}</span>
        <span class="pill">好感度 {{ favor }}</span>
      </div>

      <ul class="contract-list">
        <li
          v-for="clause in clauses"
          :key="clause.id"
          class="contract-clause"
          :class="{ modified: clause.modified }"
          @click="game.toggleClause(clause)"
        >
          <div class="clause-name">
            <span>{{ clause.name }}</span>
          </div>

          <p class="original-text">
            {{ clause.defaultText }}
          </p>

          <p v-if="clause.modified" class="new-text">
            修改後：{{ clause.modifiedText }}
          </p>
        </li>
      </ul>

      <button class="sign-button" @click="game.signContract">
        簽名同意並入住
      </button>

      <p class="hint">
        霸王條款修改不扣好感；合理條款修改會扣 5 好感。
      </p>
    </article>

    <ContractFeedbackPopup v-if="contractFeedback" />
  </section>
</template>
