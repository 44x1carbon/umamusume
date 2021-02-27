<template>
  <div id="app">
    <div style="margin: 16px">
      <h1 class="is-size-1">ウマ娘プリティーダービー 編成サポートツール</h1>
      <p>
        選択したスキルを全て含むサポートカードの組み合わせを調べることができます。
      </p>
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
      <ul
        class="column is-4"
        style="height: calc(100vh - 96px); overflow-y: scroll"
      >
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
</template>

<script>
import { calcCombination, skillList } from "../index";

export default {
  name: "App",
  data() {
    return {
      skillList: skillList().sort((a, b) => a.name.localeCompare(b.name)),
      selectSkill: [],
    };
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
    combinationList() {
      return calcCombination(this.selectSkill);
    },
  },
};
</script>

<style>
</style>
