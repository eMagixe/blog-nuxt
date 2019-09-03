<template>
  <v-layout
    column
  >
    <v-flex
      xs12
      sm8
      md6
    >
      <v-card class="post" 
      tile
      flat
      v-for="post in this.$store.state.posts.list" :key="post.id"
      v-scroll="onScroll"
      >
        <v-img
          class="white--text"
          height="200px"
          :src="'http://localhost:1337'+post.image.url"
        ></v-img>
        <v-card-title class="headline">
          <h1>{{ post.title }}</h1>
        </v-card-title>
        <v-card-text v-html="new Date(post.created_at).toLocaleDateString()">
        </v-card-text>
        <v-card-text v-html="post.description">
        </v-card-text>
        <v-card-text v-html="post.content">
        </v-card-text>
        <v-card-actions>
          <v-btn
            text
            color="accent"
          >
            Share
          </v-btn>
          <v-btn
            text
            color="accent"
          >
            Explore
          </v-btn>
        </v-card-actions>
      </v-card>
      <div v-if="load" class="text-center">
        <v-progress-circular
          indeterminate
          color="accent"
        ></v-progress-circular>
      </div>
    </v-flex>
  </v-layout>
</template>

<script>
import axios from "axios"

let getScroll = () => {
  return Math.round(window.pageYOffset * 100 / window.document.body.clientHeight)
}

export default {
    data: () => ({
      offsetTop: 0,
      id: 1,
      posts: [],
      load: false
    }),
    methods: {
      onScroll () {
        const preOffset = this.offsetTop;
        this.offsetTop = getScroll()
        if(!this.load && this.offsetTop == 70 && preOffset < this.offsetTop) {
          ++this.id
          this.getPost(this.id)
        }
      },
      getPost(getIdPost){
        this.load = true
        this.$store.dispatch('posts/upload', this.id)
        this.load = false
      }
    },
    mounted() {
      this.getPost(this.id)
    }
}
</script>
