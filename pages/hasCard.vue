<template>
  <div>
    <article class="message is-success">
      <div class="message-header">
        <p>所持カード管理</p>
      </div>
      <div class="message-body">
        所持しているカードを管理する事ができます。<br />
        所持しているカードはカードをクリックする事で登録できます。(もう一度クリックすると解除できます。)<br />
      </div>
    </article>
    <div class="columns is-multiline">
      <div
        v-for="supportCard in supportCards"
        :key="supportCard.name"
        class="column is-1 support-card"
        :class="{ has: hasSupportCardNames.includes(supportCard.name) }"
        @click="clickCard(supportCard)"
      >
        <img :src="supportCard.imageUrl" alt="" srcset="" />
        {{ supportCard.name }}
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  computed: {
    ...mapGetters(["hasSupportCardNames", "supportCards"]),
  },
  methods: {
    clickCard(card) {
      if (this.hasSupportCardNames.includes(card.name)) {
        this.$store.commit("removeHasSupportCards", card.name);
      } else {
        this.$store.commit("addHasSupportCards", card.name);
      }
    },
  },
};
</script>

<style scoped>
.support-card {
  filter: grayscale(100%);
}

.support-card.has {
  filter: grayscale(0%);
}
</style>