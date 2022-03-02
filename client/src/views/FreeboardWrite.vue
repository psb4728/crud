<template>
  <div>
    <div class="container">
      <section class="inner">
        <h1 class="tit">자유게시판 글쓰기</h1>

        <article class="write_wrap">
          <input type="text" ref="title" v-model="item.title" placeholder="제목을 입력해주세요." autofocus>
          <input type="text" ref="name" v-model="item.user_name" placeholder="작성자명을 입력해주세요.">
          <textarea type="text" ref="content" v-model="item.content" placeholder="내용을 입력해주세요" cols="30" rows="15"></textarea>
          <input type="password" ref="pw" v-model="item.pw" placeholder="비밀번호 4자리를 입력해주세요" maxlength="4">
          <div>
            <button type="button" class="delete_btn" @click="goToList">취소</button>
            <button type="button" @click="freeboardInsert">등록</button>
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
      item: {
        title: '',
        user_name: '',
        content: '',
        pw: ''
      }
    }
  },
  methods: {
    goToList () {
      this.$router.push({ path: '/' })
    },
    freeboardInsert () {
      if (this.item.title === '') {
        return this.$swal(
          '제목을 입력해 주세요.',
          this.$refs.title.focus()
        )
      }
      if (this.item.writer === '') {
        return this.$swal(
          '작성자명을 입력해 주세요.',
          this.$refs.name.focus()
        )
      }
      if (this.item.contnet === '') {
        return this.$swal(
          '내용을 입력해 주세요.',
          this.$refs.content.focus()
        )
      }
      if (this.item.pw === '') {
        return this.$swal(
          '비밀번호를 입력해 주세요.',
          this.$refs.pw.focus()
        )
      }

      this.$swal.fire({
        title: '정말 등록하시겠습니까?',
        showCancelButton: true,
        confirmButtonText: '등록',
        cancelButtonText: '취소'
      }).then(async (result) => {
        if (result.isConfirmed) {
          // 제품 등록
          await this.$api('/api/freeboarWrite', { param: [this.item] })
          this.$swal.fire('정상적으로 등록되었습니다!', '', 'success')
          this.$router.push({ path: '/' })
        }
      })
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
