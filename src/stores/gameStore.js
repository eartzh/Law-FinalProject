import { computed, reactive, toRefs } from 'vue';
const initialState = () => ({
  stage: 'contract',
  contractFading: false,
  money: 13000,
  favor: 38,
  month: 0,
  isMonthTransitioning: false,
  monthTransitionText: '',
  speaker: '系統',
  speakerType: 'system',
  dialogueText: '請先簽署租賃契約。',
  dialogueVersion: 0,
  characterSpriteVisible: false,
  queue: [],
  showChoices: false,
  choices: [],
  proposal: null,
  currentEvent: null,
  rerollCount: 0,
  forceAllDisabled: false,
  ending: null,
  contractFeedback: null,
  clauses: [
    {
      id: 'deposit',
      type: 'overlord',
      name: '押金條款',
      modified: false,
      defaultText: '乙方須於簽約後一週內匯入三個月押金共計新台幣 15,000 元整。',
      modifiedText: '乙方須於簽約後一週內匯入兩個月押金共計新台幣 10,000 元整。'
    },
    {
      id: 'reasonable-clean',
      type: 'reasonable',
      name: '公共區域清潔',
      modified: false,
      defaultText: '乙方應保持租賃處與公共區域基本整潔。',
      modifiedText: '乙方與甲方應共同維護租賃處與公共區域基本整潔。'
    },
    {
      id: 'reasonable-noise',
      type: 'reasonable',
      name: '夜間安寧條款',
      modified: false,
      defaultText: '乙方於夜間十點後應降低音量，避免影響鄰居安寧。',
      modifiedText: '甲乙雙方皆應維護夜間安寧，並以友善溝通方式處理噪音爭議。'
    },
    {
    id: 'reasonable-trash',
    type: 'reasonable',
    name: '垃圾清運條款',
    modified: false,
    defaultText: '乙方應依社區或地方政府規定時間與方式清運垃圾，不得任意堆放於公共區域。',
    modifiedText: '甲乙雙方應共同遵守社區或地方政府垃圾清運規定，並保持公共區域整潔。'
    },
    {
    id: 'reasonable-pet',
    type: 'reasonable',
    name: '寵物飼養條款',
    modified: false,
    defaultText: '乙方如需飼養寵物，應事先告知甲方，並負責維護環境清潔與避免影響鄰居。',
    modifiedText: '乙方得飼養寵物，但應維護環境清潔、避免噪音與氣味影響鄰居，若造成損害應負修復責任。'
    },
    {
    id: 'reasonable-fire',
    type: 'reasonable',
    name: '用火與安全條款',
    modified: false,
    defaultText: '乙方不得於租賃處從事危險用火行為，並應注意電器與瓦斯使用安全。',
    modifiedText: '甲乙雙方皆應維護租賃處安全，乙方應注意用火與電器安全，甲方應確保基本設備符合安全狀態。'
    },
    {
      id: 'repair',
      type: 'overlord',
      name: '修繕條款',
      modified: false,
      defaultText: '套房內之一切耗材與設備損壞（包含熱水器、冷氣），均由乙方負擔自行修繕之費用。',
      modifiedText: '非因乙方故意或過失導致之自然壞損，應由甲方（出租人）負擔修繕責任。'
    },
    {
    id: 'reasonable-sublease',
    type: 'reasonable',
    name: '轉租限制條款',
    modified: false,
    defaultText: '未經甲方書面同意，乙方不得將租賃處全部或部分轉租予第三人。',
    modifiedText: '乙方如需轉租或分租，應事先取得甲方書面同意，甲方不得無正當理由拒絕合理申請。'
    },
    {
    id: 'reasonable-inspection',
    type: 'reasonable',
    name: '設備點交條款',
    modified: false,
    defaultText: '入住時甲乙雙方應確認屋內設備狀況，並以照片或書面紀錄作為點交依據。',
    modifiedText: '入住與退租時甲乙雙方皆應共同點交設備狀況，並以照片或書面紀錄確認責任歸屬。'
    },
    {
    id: 'reasonable-deposit-refund',
    type: 'reasonable',
    name: '押金返還條款',
    modified: false,
    defaultText: '租期屆滿且乙方完成點交後，甲方應於合理期間內返還押金。',
    modifiedText: '租期屆滿且完成點交後，甲方應於七日內返還押金；如需扣款，應提出明細與證明。'
    },
    {
      id: 'entry',
      type: 'overlord',
      name: '進出條款',
      modified: false,
      defaultText: '甲方因管理需要，得於不提前通知之情況下，隨時進入房屋進行查看。',
      modifiedText: '甲方如需進入租賃處，須提前 24 小時徵得乙方同意，且乙方應在場。'
    },
    {
    id: 'reasonable-contact',
    type: 'reasonable',
    name: '聯絡通知條款',
    modified: false,
    defaultText: '甲乙雙方應提供有效聯絡方式，重要事項應以訊息或書面方式通知。',
    modifiedText: '甲乙雙方應提供有效聯絡方式，涉及費用、修繕、進出房屋或終止租約等事項，應以可保存紀錄之方式通知。'
    },
    {
    id: 'reasonable-late-payment',
    type: 'reasonable',
    name: '租金遲延條款',
    modified: false,
    defaultText: '乙方如未能準時繳納租金，應主動通知甲方並儘速補繳。',
    modifiedText: '乙方如因特殊情況延遲繳租，應主動通知甲方；甲方得要求補繳，但不得任意加收未約定費用。'
    },
    {
    id: 'reasonable-common-area',
    type: 'reasonable',
    name: '公共空間使用條款',
    modified: false,
    defaultText: '乙方使用公共空間時，應避免堆放私人物品或影響其他住戶通行。',
    modifiedText: '甲乙雙方及其他住戶皆應合理使用公共空間，不得長期堆放私人物品或妨礙通行安全。'
    },
    {
      id: 'electricity',
      type: 'overlord',
      name: '電費條款',
      modified: false,
      defaultText: '本套房不論季節，每度電費一律以新台幣 10 元計算，由乙方全額負擔。',
      modifiedText: '本套房每度電費以台電平均電價每度 5 元計算，由乙方全額負擔。'
    },
    {
    id: 'reasonable-moveout',
    type: 'reasonable',
    name: '退租清潔條款',
    modified: false,
    defaultText: '乙方退租時應將租賃處恢復基本清潔狀態。',
    modifiedText: '乙方退租時應恢復基本清潔狀態；甲方不得以自然耗損或非乙方造成之老舊痕跡要求額外扣款。'
    }
  ],
  events: {
    1: {
      id: 'deposit',
      title: '押金危機',
      cmax: 15000,
      min: 10000,
      safeCost: 10000,
      courtCost: 10000,
      intro: '第一個月，搬進套房的第一天，房東把合約副本拍在桌上。「照合約來，押金三個月，總共 $15,000。今天就要匯。」你看著帳戶裡的 $13,000，手心開始冒汗。',
      safeText: '你事先把押金條款改成兩個月。房東雖然皺眉，但白紙黑字，只能收 $10,000。你勉強鬆了一口氣：至少還有錢吃飯。',
      swallowText: '你咬牙答應三個月押金。轉帳畫面跳出餘額不足的警示，世界忽然安靜下來。',
      forceSuccessText: '你把修改前後的押金規範和常見租屋慣例講得很硬。房東沉默很久，最後改口：「好啦，兩個月就兩個月，$10,000。」',
      forceRejectText: '房東立刻板起臉。「你不要跟我講那些有的沒的。合約寫三個月就是三個月。」這條路暫時走不通了。',
      negotiateText: '你試著把語氣放軟：「我們能不能找一個中間值？」房東瞇起眼睛，開始盤算他願意退讓多少。',
      courtText: '你決定走法院仲裁。流程麻煩、也花了車馬費，但最後押金回到兩個月 $10,000。'
    },
    3: {
      id: 'repair',
      title: '熱水器壞損',
      cmax: 6700,
      min: 0,
      safeCost: 0,
      courtCost: 0,
      intro: '第三個月，寒流來襲。你轉開熱水，水卻冷得像直接從冰箱倒出來。房東只回了一句：「合約寫得很清楚，設備壞了你自己修。」維修報價：$6,700。',
      safeText: '你早已把修繕條款改清楚。房東翻了翻合約，嘆了一口氣：「好啦，我叫師傅過去。」這次你不用自掏腰包。',
      swallowText: '你付了 $6,700 請師傅修理。熱水回來了，但你的錢包也明顯變薄了。',
      forceSuccessText: '你據理力爭：這不是你造成的損壞，出租人本來就該維持基本設備可用。房東最後只好答應全額處理。',
      forceRejectText: '房東冷笑：「你要住就自己修，不住很多人在排。」你感覺這次硬碰硬失敗了。',
      negotiateText: '你提出各退一步。房東一邊抱怨，一邊開始提出他能接受的分攤金額。',
      courtText: '你選擇法院仲裁。雖然花了 $2,000 車馬費，但熱水器確認由房東負責修繕。'
    },
    6: {
      id: 'electricity',
      title: '天價電費',
      cmax: 4000,
      min: 2000,
      safeCost: 2000,
      courtCost: 2000,
      intro: '第六個月，夏天熱到牆壁都像在發燒。電費單來了：400 度，一度 10 元。房東傳訊息：「總共 $4,000，明天前匯。」你盯著冷氣遙控器，第一次覺得涼風這麼昂貴。',
      safeText: '你事先把電費條款改成台電平均電價。房東只能按一度 5 元計，總共 $2,000。你第一次覺得改合約真的救命。',
      swallowText: '你吞下 $4,000 的夏季電費。冷氣帶來的快樂，在轉帳完成那一刻消失殆盡。',
      forceSuccessText: '你拿出合約漏洞和電費計算方式爭論。房東不耐煩地說：「好啦好啦，這次算你一度 5 元。」',
      forceRejectText: '房東回覆得很快：「合約寫一度 10 元，你自己簽的。」你只能重新考慮策略。',
      negotiateText: '你提出分攤方案，試著把電費壓回合理範圍。房東開始丟出新的數字。',
      courtText: '你選擇法院仲裁。最後電費回到 $2,000，但你額外付出 $2,000 車馬費。'
    }
  }
});

function showMonthTransition(month, onDone) {
  state.monthTransitionText = `第${month}月`;
  state.isMonthTransitioning = true;
  state.showChoices = false;

  setTimeout(() => {
    state.isMonthTransitioning = false;
    state.monthTransitionText = '';

    if (typeof onDone === 'function') {
      onDone();
    }
  }, 900);
}

function enterMonth(month) {
  state.month = month;

  showMonthTransition(month, () => {
    runMonth();
  });
}
``

const state = reactive(initialState());
function formatMoney(value) {
  const rawValue = value?.value ?? value;
  return '$' + Math.round(rawValue).toLocaleString();
}

function showContractFeedback({
  type = 'correct',
  title = '',
  message = '',
  favorDelta = 0
}) {
  state.contractFeedback = {
    type,
    title,
    message,
    favorDelta
  };
}

function closeContractFeedback() {
  state.contractFeedback = null;
}

function pushNext(fn) {
  state.queue.push(fn);
}
function say(speaker, type, text) {
  state.speaker = speaker;
  state.speakerType = type;
  state.dialogueText = text;
  state.dialogueVersion += 1;

  if (type === 'landlord') {
    if (!state.characterSpriteVisible) {
      state.characterSpriteKey += 1;
    }

    state.characterSpriteVisible = true;
  } else {
    state.characterSpriteVisible = false;
  }
}
function continueDialogue() {
  if (state.showChoices || state.ending || state.isMonthTransitioning) return;

  const next = state.queue.shift();

  if (typeof next === 'function') {
    next();
  }
}
function isClauseModified(id) {
  return Boolean(state.clauses.find((clause) => clause.id === id)?.modified);
}
function toggleClause(clause) {
  if (!clause || clause.modified) return;

  clause.modified = true;

  if (clause.type === 'overlord') {
    showContractFeedback({
      type: 'correct',
      title: '✅ 正確修改',
      message: `你修改了「${clause.name}」。這是霸王條款，提前修掉可以避免未來對應月份的危機事件。`,
      favorDelta: 0
    });
  }

  if (clause.type === 'reasonable') {
    state.favor -= 5;

    showContractFeedback({
      type: 'wrong',
      title: '❌ 錯誤修改',
      message: `你修改了「${clause.name}」。這其實是合理條款，硬要改會讓房東覺得你很難搞。`,
      favorDelta: -5
    });
  }

  checkEnding();
}
function signContract() {
  state.contractFading = true;
  setTimeout(() => {
    state.stage = 'game';
    state.contractFading = false;
    state.month = 1;
    say(
      '系統',
      'system',
      '你拖著行李站在套房門口。房間不大，窗外是吵雜的馬路，牆角還有一點潮濕的痕跡。但至少，這裡暫時是你的家。'
    );
    
    pushNext(() => {
      say('你', 'player', '先撐過這一年吧。只要別出什麼大事就好……');

      pushNext(() => {
        enterMonth(1);
      });
    });

  }, 560);
}
function runMonth() {
  if (state.ending) return;
  if (state.month >= 2 && state.month <= 11) {
    state.money += 1700;
  }
  if ([2, 4, 5, 7, 8, 10, 11].includes(state.month)) {
    runDailyMonth();
    return;
  }
  if (state.month === 9) {
    runEntryEvent();
    return;
  }
  if (state.month === 12) {
    endGame(
      'HE【順利退租】',
      '一年期滿，你把鑰匙放回信封。這一年你學會看合約、學會談判，也學會保護自己。你帶著押金收據與滿滿教訓，順利退租搬家。'
    );
    return;
  }
  const event = state.events[state.month];
  if (event) {
    runProblemEvent(event);
  }
}
function runDailyMonth() {
  const dailyLines = {
    2: [
      '第二個月，薪水進帳，房租也準時扣掉。房東傳來訊息：「租金收到了。」語氣難得正常。',
      '你回了一個簡短的「謝謝」。至少今天沒有爭議。（日常互動：好感度 +5；固定收支淨增 +$1,700）'
    ],
    4: [
      '第四個月，你在樓下遇到房東。他問你住得還習慣嗎。',
      '你想了想，避開那些不太妙的細節，只回答：「還可以。」（日常互動：好感度 +5；固定收支淨增 +$1,700）'
    ],
    5: [
      '第五個月，房東請人來清水塔，總算提前通知住戶。',
      '你覺得世界也許還是有一點進步空間。（日常互動：好感度 +5；固定收支淨增 +$1,700）'
    ],
    7: [
      '第七個月，夏天繼續燃燒。你開始研究怎麼用最少冷氣活下去。',
      '房東這個月沒有突然冒出奇怪要求，你甚至有點感動。（日常互動：好感度 +5；固定收支淨增 +$1,700）'
    ],
    8: [
      '第八個月，你收到包裹時，房東順手幫你放在門口。',
      '雖然只是小事，但至少不像敵人。（日常互動：好感度 +5；固定收支淨增 +$1,700）'
    ],
    10: [
      '第十個月，日子變得有點平穩。你甚至開始習慣這間房子的怪聲音。',
      '租屋生活不算完美，但也沒啥大問題。（日常互動：好感度 +5；固定收支淨增 +$1,700）'
    ],
    11: [
      '第十一個月，你開始整理搬家的清單。押金、點交、收據，每一項你都寫得很仔細。',
      '房東看你有備而來，也沒有多說什麼。（日常互動：好感度 +5；固定收支淨增 +$1,700）'
    ]
  };
  state.favor += 5;
  const [line1, line2] = dailyLines[state.month];
  say('系統', 'landlord', line1);
  pushNext(() => {
    say('系統', 'landlord', line2);
    afterMonth();
  });
}
function runEntryEvent() {
  if (isClauseModified('entry')) {
    say(
      '系統',
      'system',
      '第九個月，房東原本說想進房查看管線。但因為你修改過進出條款，他只能提前詢問，並約在你在場的時間。'
    );
    pushNext(() => {
      say('你', 'player', '還好當初有把這條改掉。不然想想就覺得可怕。');
      afterMonth();
    });
  } else {
    state.favor -= 20;
    say(
      '系統',
      'system',
      '第九個月，你下班回家，發現椅子位置不對，抽屜也被翻過。房東傳訊息：「我下午進去看了一下管線，順手整理了一點。」'
    );
    pushNext(() => {
      say('你', 'player', '這不是整理，這是擅自進入我的房間吧……（房東無預警私入並弄亂房間：好感度 -20）');
      afterMonth();
    });
  }
}


function runProblemEvent(event) {
  if (isClauseModified(event.id)) {
    state.money -= event.safeCost;
    say('系統', 'system', event.safeText + `
本次支付：${formatMoney(event.safeCost)}。`);
    afterMonth();
    return;
  }


  state.currentEvent = event;
  state.rerollCount = 0;
  state.forceAllDisabled = false;
  state.proposal = null;


  say('房東', 'landlord', event.intro);
  pushNext(() => openNegotiation());
}


function openNegotiation() {
  const event = state.currentEvent;


  state.showChoices = true;
  state.proposal = null;


  state.choices = [
    {
      key: 'swallow',
      label: `好吧我認賠`,
      class: 'danger',
      disabled: false,
      action: () => settle(event.cmax, 0, event.swallowText)
    },
    {
      key: 'force',
      label: `我不管房東你給我負責`,
      class: 'safe',
      disabled: state.forceAllDisabled,
      action: () => forceLandlord()
    },
    {
      key: 'negotiate',
      label: '跟房東協調金額',
      class: '',
      disabled: false,
      action: () => startNegotiation()
    }
  ];
}
function forceLandlord() {
  const event = state.currentEvent;


  if (Math.random() < 0.8) {
    settle(event.min, 20, event.forceSuccessText);
    return;
  }


  state.forceAllDisabled = true;
  say('房東', 'landlord', event.forceRejectText);
  openNegotiation();
}


function startNegotiation() {
  say('你', 'player', state.currentEvent.negotiateText);
  generateProposal();
}


function generateProposal() {
  const event = state.currentEvent;
  const cost = Math.round(event.min + Math.random() * (event.cmax - event.min));
  const penalty = 20 * (1 - (cost - event.min) / (event.cmax - event.min || event.cmax));


  state.proposal = { cost, penalty };
  state.showChoices = true;


  state.choices = [
    {
      key: 'accept',
      label: '接受此方案',
      class: 'safe',
      disabled: false,
      action: () => settle(cost, penalty, '你接受了協調方案。房東雖然不太高興，但總算願意照這個金額結算。')
    },
    {
      key: 'reroll',
      label: `重新協調：房東有點不耐煩了，扣 ${state.rerollCount + 1} 好感`,
      class: '',
      disabled: false,
      action: () => reroll()
    },
    {
      key: 'court',
      label: '法院見（法院仲裁）',
      class: 'court',
      disabled: state.rerollCount < 3,
      action: () => court()
    }
  ];
}
function reroll() {
  state.rerollCount += 1;
  state.favor -= state.rerollCount;
  say(
    '房東',
    'landlord',
    `你第 ${state.rerollCount} 次要求重新協調。房東的臉色又更難看了一點。
（Reroll 代價：好感度 -${state.rerollCount}）`
  );
  if (checkEnding()) return;
  generateProposal();
}
function court() {
  const event = state.currentEvent;
  settle(event.courtCost + 2000, 20, event.courtText);
}
function settle(cost, favorPenalty, message) {
  state.money -= Math.round(cost);
  state.favor -= favorPenalty;
  state.showChoices = false;
  state.proposal = null;
  say(
    '系統',
    'system',
    `${message}
支付：${formatMoney(cost)}；好感度 -${Number(favorPenalty).toFixed(1)}。`
  );
  if (!checkEnding()) {
    afterMonth();
  }
}


function afterMonth() {
  if (checkEnding()) return;

  pushNext(() => {
    enterMonth(state.month + 1);
  });
}


function checkEnding() {
  if (state.favor < 0) {
    endGame(
      'BE-1【掃地出門】',
      '房東終於失去耐心。「我不想再租給你了，東西收一收。」你站在門口，看著自己的行李箱，明白這場租屋戰爭輸在關係徹底破裂。'
    );
    return true;
  }


  if (state.money <= 0) {
    endGame(
      'BE-2【破產】',
      '帳戶餘額歸零。下一筆房租、下一餐飯、下一個晚上，全都變成問題。你拖著行李離開套房，才發現最貴的不是房租，而是沒有退路。'
    );
    return true;
  }


  return false;
}


function endGame(title, text) {
  state.showChoices = false;
  state.ending = { title, text };
}


function restart() {
  Object.assign(state, initialState());
}



export function useGameStore() {
  const speakerClass = computed(() => state.speakerType);

  return {
    ...toRefs(state),
    speakerClass,
    formatMoney,
    toggleClause,
    signContract,
    continueDialogue,
    restart,

    // 只給合約階段 popup 用
    showContractFeedback,
    closeContractFeedback
  };
}
