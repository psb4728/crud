<template>
  <div>
    <div class="container">
      <section class="inner">
        <h1 class="tit">자유게시판 상세보기</h1>

        <article class="write_wrap">
          <input type="text" ref="title" :value="freeboardDetail.title" placeholder="제목을 입력해주세요." disabled>
          <input type="text" ref="name" :value="freeboardDetail.user_name" placeholder="작성자명을 입력해주세요." disabled>
          <textarea type="text" ref="content" :value="freeboardDetail.content" placeholder="내용을 입력해주세요" cols="30" rows="10" disabled></textarea>
          <div>
            <button type="button" @click="goToList">목록으로</button>
          </div>
        </article>
      </section>
    </div>
  </div>
</template>

<script>
export default {
  name: 'FreboardWrite',
  data () {
    return {
      id: 0,
      freeboardDetail: {}
    }
  },
  created () {
    this.id = this.$route.query.id
    this.getFreeboardDetail()
  },
  methods: {
    goToList () {
      this.$router.push({ path: '/' })
    },
    async getFreeboardDetail () {
      // mixins.js에서 $api(url, data)를 불러서 사용한다.
      const freeboardDetail = await this.$api('/api/freeboardDetail', { param: [this.id] })
      if (freeboardDetail.length > 0) {
        this.freeboardDetail = freeboardDetail[0]
      }
      console.log(this.freeboardDetail)
    }
  }
}
</script>

<style>
  .write_wrap {
    max-width: 800px;
    display: flex;
    flex-direction: column;
    gap: 20px;
    margin: auto;
  }
  .write_wrap input,
  .write_wrap textarea {
    padding: 10px;
    background: #F6F6F6;
    border-radius: 4px;
    border: none;
    box-sizing: border-box;
    resize: none;
  }
  .delete_btn {
    margin-right: 10px;
  }
</style>
