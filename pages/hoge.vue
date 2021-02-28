<template>
  <table class="table">
    <tr v-for="skill in skillList" :key="skill.name">
      <td>{{ skill.name }}</td>
      <td>{{ skill.description }}</td>
      <td>
        <span class="tag" v-for="tag in tags(skill.description)" :key="tag">{{
          tag
        }}</span>
      </td>
    </tr>
  </table>
</template>

<script>
import { mapGetters } from "vuex";
import { skillList } from "../index";
export default {
  methods: {
    tags(description) {
      const tags = [];

      if (description.match(/＜.*＞/)) {
        tags.push(
          description.match(/＜.*＞/)[0].replace("＜", "").replace("＞", "")
        );
      }

      if (
        /速度/.test(description) &&
        (/上がる/.test(description) || /上る/.test(description))
      ) {
        tags.push("速度上昇");
      }

      if (/加速力/.test(description) && /上がる/.test(description)) {
        tags.push("加速力上昇");
      }

      if (/持久力/.test(description) && /回復/.test(description)) {
        tags.push("持久力回復");
      }

      if (/レース中盤/.test(description)) {
        tags.push("レース中盤");
      }

      if (/レース序盤/.test(description)) {
        tags.push("レース序盤");
      }

      if (/レース終盤/.test(description)) {
        tags.push("レース終盤");
      }

      if (/コーナー/.test(description)) {
        tags.push("コーナー");
      }

      if (/上り坂/.test(description)) {
        tags.push("上り坂");
      }

      if (/稍重/.test(description) && /得意/.test(description)) {
        tags.push("稍重得意");
      }

      if (/重/.test(description) && /得意/.test(description)) {
        tags.push("重得意");
      }

      if (/不良/.test(description) && /得意/.test(description)) {
        tags.push("不良得意");
      }

      if (/雨の日/.test(description) && /得意/.test(description)) {
        tags.push("雨の日得意");
      }

      if (/疲れやすく/.test(description)) {
        tags.push("疲れやすく");
      }

      if (/視野/.test(description) && /広く/.test(description)) {
        tags.push("視野広く");
      }

      if (/視野/.test(description) && /狭く/.test(description)) {
        tags.push("視野狭く");
      }

      if (/好位置/.test(description)) {
        tags.push("好位置");
      }

      if (/良い位置/.test(description)) {
        tags.push("好位置");
      }

      if (/スタート/.test(description) && /得意/.test(description)) {
        tags.push("スタート得意");
      }

      return tags;
    },
  },
  computed: {
    skillList() {
      return skillList(this.supportCards);
    },
    ...mapGetters(["supportCards"]),
  },
};
</script>