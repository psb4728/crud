<template>
  <div>
    <div class="container">
      <section class="inner">
        <h1 class="tit">자유게시판 수정하기</h1>

        <article class="write_wrap">
          <input type="text" ref="title" v-model="item.title" placeholder="제목을 입력해주세요.">
          <input type="text" ref="name" v-model="item.user_name" placeholder="작성자명을 입력해주세요.">
          <textarea type="text" ref="content" v-model="item.content" placeholder="내용을 입력해주세요" cols="30" rows="10"></textarea>
          <div>
            <button type="button" class="delete_btn" @click="goToList">목록</button>
            <button type="button" @click="goToUpdate">수정</button>
          </div>
        </article>
      </section>
    </div>
  </div>
</template>

<script>
export default {
  name: 'FreboardRetouch',
  data () {
    return {
      id: 0,
      item: {}
    }
  },
  created () {
    this.id = this.$route.query.id
  },
  mounted () {
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
        this.item = freeboardDetail[0]
      }
      console.log(this.item)
    },
    goToUpdate () {
      if (this.$refs.title.value === '') {
        alert('제목을 입력해주세요.')
        return this.$refs.title.focus()
      }
      if (this.$refs.name.value === '') {
        alert('이름을 입력해주세요.')
        return this.$refs.name.focus()
      }
      if (this.$refs.content.value === '') {
        alert('내용을 입력해주세요.')
        return this.$refs.content.focus()
      }

      this.$swal.fire({
        title: '정말 수정하시겠습니까?',
        showCancelButton: true,
        confirmButtonText: '수정',
        cancelButtonText: '취소'
      }).then(async (result) => {
        if (result.isConfirmed) {
          // 수정
          try {
            await this.$api('/api/freeboarUpdate', { param: [this.item.title, this.item.user_name, this.item.content, this.item.id] })
            this.$swal.fire('정상적으로 수정되었습니다!', '', 'success')
            this.$router.push({ path: '/' })
          } catch (e) {
            console.log('수정 에러' + e)
          }
        }
      })
    }
  },
  updated () {
    console.log(this.item.id, this.item.title, this.item.user_name, this.item.content)
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
