<template>
  <div>
    <article class="message is-success">
      <div class="message-header">
        <p>所持カード詳細</p>
      </div>
      <div class="message-body">所持しているカードの詳細を確認できます。</div>
    </article>
    <div class="columns is-multiline">
      <div
        v-for="supportCard in hasSupportCards"
        :key="supportCard.name"
        class="column is-4"
      >
        <div class="card">
          <div class="card-content">
            <div class="media">
              <div class="media-left">
                <figure class="image is-96x96">
                  <img
                    :src="supportCard.imageUrl"
                    alt=""
                    srcset=""
                    width="200px"
                  />
                </figure>
              </div>
              <div class="media-content">
                <p class="title is-4">{{ supportCard.name }}</p>
              </div>
            </div>

            <div class="content" style="padding: 16px">
              <div class="is-size-5">所持スキル</div>
              <table class="table">
                <tr
                  v-for="skill in supportCard.possessionSkills"
                  :key="skill.name"
                >
                  <td>{{ skill.name }}</td>
                  <td>{{ skill.skillPoint }}</td>
                  <td>{{ skill.description }}</td>
                </tr>
              </table>

              <div class="is-size-5">育成イベントで取れるスキル</div>
              <table class="table">
                <tr
                  v-for="skill in supportCard.trainingEventsSkills"
                  :key="skill.name"
                >
                  <td>{{ skill.name }}</td>
                  <td>{{ skill.skillPoint }}</td>
                  <td>{{ skill.description }}</td>
                </tr>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  computed: {
    ...mapGetters(["hasSupportCards"]),
  },
};
</script>