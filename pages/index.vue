<template>
  <div>
    <article class="message is-success">
      <div class="message-header">
        <p>組み合わせ検索</p>
      </div>
      <div class="message-body">
        選択したスキルを全て含むサポートカードの組み合わせを調べることができます。
      </div>
    </article>
    <div style="padding: 16px">
      <div class="field">
        <input
          id="only-has-card"
          type="checkbox"
          class="switch"
          v-model="onlyHasCard"
        />
        <label for="only-has-card"
          >所持しているカードから組み合わせを調べる</label
        >
      </div>
    </div>
    <div class="columns">
      <div
        class="column"
        style="height: calc(100vh - 96px); overflow-y: scroll"
      >
        <div class="notification" v-if="selectSkill.length == 0">
          スキルを選択してください
        </div>
        <div
          class="notification"
          v-if="combinationList.length == 0 && selectSkill.length != 0"
        >
          選択したスキルを全て含む組み合わせはありません。
        </div>

        <div
          class="columns"
          v-for="combination in combinationList"
          :key="
            combination
              .sort((a, b) => a.name.localeCompare(b.name))
              .map((s) => s.name)
              .join()
          "
          style="background-color: lightgray"
        >
          <div
            class="column"
            v-for="supportCurd in combination.sort((a, b) =>
              a.name.localeCompare(b.name)
            )"
            :key="supportCurd.name"
            style="background-color: white; border-radius: 16px; margin: 8px"
          >
            <img :src="supportCurd.imageUrl" alt="" srcset="" />
            {{ supportCurd.name }}
          </div>
          <div
            class="column"
            v-for="i in 6 - combination.length"
            :key="i"
            style="
              text-align: center;
              background-color: white;
              border-radius: 16px;
              margin: 8px;
            "
          >
            自由枠
          </div>
        </div>
      </div>
      <div class="column is-4">
        <!-- <section class="accordions">
          <article class="accordion is-active">
            <div class="accordion-header toggle">
              <p>スキル絞り込み</p>
            </div>
            <div class="accordion-body">
              <div class="accordion-content">
                <div class="field">
                  <label class="label">Label</label>
                  <div class="control">
                    <label class="checkbox">
                      <input type="checkbox" />
                      Remember me
                    </label>
                  </div>
                </div>
              </div>
            </div>
          </article>
        </section> -->
        <ul style="height: calc(100vh - 96px); overflow-y: scroll">
          <li
            v-for="skill in skillList"
            :key="skill.name"
            class="media"
            @click="clickSkill(skill)"
            :class="{ 'has-background-success-light': isSelect(skill) }"
          >
            <div class="media-left">
              <figure class="image is-48x48">
                <img :src="skill.iconUrl" alt="" srcset="" />
              </figure>
            </div>
            <div class="media-content">
              <p class="title is-6">
                {{ skill.name }} スキルpt:{{ skill.skillPoint }}
              </p>
              <p class="subtitle is-6">{{ skill.description }}</p>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import { calcCombination, skillList } from "../index";
import { mapGetters } from "vuex";

export default {
  name: "App",
  data() {
    return {
      selectSkill: [],
      onlyHasCard: false,
    };
  },
  mounted() {
    // var accordions = bulmaAccordion.attach();
  },
  methods: {
    isSelect(skill) {
      return this.selectSkill.includes(skill);
    },
    clickSkill(skill) {
      if (this.isSelect(skill)) {
        const index = this.selectSkill.indexOf(skill);
        this.selectSkill.splice(index, 1);
      } else {
        this.selectSkill.push(skill);
      }
    },
  },
  computed: {
    skillList() {
      return skillList(
        this.onlyHasCard ? this.hasSupportCards : this.supportCards
      ).sort((a, b) => a.name.localeCompare(b.name));
    },
    combinationList() {
      return calcCombination(
        this.selectSkill,
        this.onlyHasCard ? this.hasSupportCards : this.supportCards
      );
    },
    ...mapGetters(["hasSupportCards", "supportCards"]),
  },
};
</script>

<style>
</style>
