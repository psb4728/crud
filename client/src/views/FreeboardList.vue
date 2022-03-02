<template>
  <div>
    <div class="container">
      <section class="inner">
        <h1 class="tit">자유게시판</h1>
        <article>
          <table>
            <thead>
              <tr>
                <th>Num</th>
                <th>Title</th>
                <th>Writer</th>
                <th>Content</th>
                <th>Date</th>
                <th>Update Date</th>
                <th>Edit</th>
                <th>Delete</th>
              </tr>
            </thead>

            <tbody>
              <tr v-for="(item, i) in freeboardList" :key="i">
                <td>{{ item.id }}</td>
                <input type="hidden" :value="item.pw">
                <td class="overflow" @click="goToDetail(item.id)">{{ item.title }}</td>
                <td @click="goToDetail(item.id)">{{ item.user_name }}</td>
                <td class="overflow" @click="goToDetail(item.id)">{{ item.content }}</td>
                <td>{{ item.created_date }}</td>
                <td>{{ item.update_date }}</td>
                <td class="btn_td"><button type="button" class="update_btn" @click="goToUpdate(item.pw, item.id)" :data-id="i">수정</button></td>
                <td class="btn_td"><button type="button" class="delete_btn" @click="deleteList(item.pw, item.id)">삭제</button></td>
              </tr>
            </tbody>
          </table>

          <div class="popup_bg" bg></div>
          <section class="popup" popup>
            <h3>비밀번호 확인</h3>
            <div>
              <input type="hidden" class="hidden_input" ref="pw" disabled>
              <input type="password" ref="checkPw" placeholder="비밀번호 4자리를 입력해주세요.">
              <div class="btn_wrap">
                <button type="button" class="close_btn" @click="closeBtn">닫기</button>
                <button type="button" @click="pwCheck" complete v-if="complete === true">확인</button>
                <button type="button" @click="delectItem" v-else>삭제</button>
              </div>
            </div>
          </section>
        </article>
      </section>
    </div>
  </div>
</template>

<script>
export default {
  name: 'FreeboardList',
  data () {
    return {
      freeboardList: [],
      complete: false,
      bg: false,
      popup: false
    }
  },
  created () {
    this.getFreeboardList()
  },
  methods: {
    async getFreeboardList () {
      // mixins.js에서 $api(url, data)를 불러서 사용한다.
      this.freeboardList = await this.$api('/api/freeboardList')
      console.log(this.freeboardList)
    },
    goToDetail (listId) {
      this.$router.push({ path: '/detail', query: { id: listId } })
    },
    goToUpdate (pw, listId) {
      const popupBg = document.querySelector('.popup_bg')
      const popup = document.querySelector('.popup')
      const inputHidden = document.querySelector('.hidden_input')

      this.complete = true
      popupBg.classList.add('show')
      popup.classList.add('show')
      inputHidden.value = pw
      inputHidden.dataset.key = listId
      // this.$router.push({ path: '/retouch', query: { id: listId } })
    },
    async pwCheck () {
      if (this.$refs.pw.value === this.$refs.checkPw.value) {
        const key = this.$refs.pw.dataset.key
        await this.$router.push({ path: '/retouch', query: { id: key } })
      } else {
        alert('비밀번호가 틀립니다.')
      }
    },
    deleteList (pw, listId) {
      const popupBg = document.querySelector('.popup_bg')
      const popup = document.querySelector('.popup')
      const inputHidden = document.querySelector('.hidden_input')

      this.complete = false
      popupBg.classList.add('show')
      popup.classList.add('show')
      inputHidden.value = pw
      inputHidden.dataset.key = listId
    },
    delectItem () {
      this.$swal.fire({
        title: '정말 삭제하시겠습니까?',
        showCancelButton: true,
        confirmButtonText: '삭제',
        cancelButtonText: '취소'
      }).then(async (result) => {
        console.log('result' + result)
        const popupBg = document.querySelector('.popup_bg')
        const popup = document.querySelector('.popup')
        if (result.isConfirmed && this.$refs.pw.value === this.$refs.checkPw.value) {
          // 리스트 삭제
          popupBg.classList.remove('show')
          popup.classList.remove('show')
          const key = this.$refs.pw.dataset.key
          await this.$api('/api/freeboardDelete', { param: [key] })
          this.$swal.fire('삭제되었습니댜!', '', 'success')
          this.getFreeboardList()
        } else {
          popupBg.classList.remove('show')
          popup.classList.remove('show')
          this.$refs.checkPw.value = ''
        }
      })
    },
    closeBtn () {
      const popupBg = document.querySelector('.popup_bg')
      const popup = document.querySelector('.popup')
      popupBg.classList.remove('show')
      popup.classList.remove('show')
      this.$refs.checkPw.value = ''
    }
  }
}
</script>

<style>
.tit {
  margin-bottom: 40px;
}
  table {
    border-collapse: collapse;
    border-spacing: 0;
  }
  .container {
    width: 100%;
  }
  .inner {
    width: 100%;
    max-width: 1200px;
    margin: 0 auto;
  }
  table {
    padding: 15px;
    margin: 0 auto;
    text-align: left;
    box-sizing: border-box;
  }
  table th {
    padding: 0 20px 10px 0;
    box-sizing: border-box;
  }
  table tr {
    margin: 0;
    padding: 0;
  }
  table td {
    min-width: 10rem;
    width: auto;
    text-align: left;
    padding: 14px 10px 14px 0;
    border-top: 1px solid #E9E9E9;
    border-bottom: 1px solid #E9E9E9;
    box-sizing: border-box;
    cursor: pointer;
  }
  table td.overflow {
    width: 100px;
    max-width: 100px;
    padding-right: 10px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  table td.btn_td { min-width: 2rem; }
  button {
    padding: 10px 15px;
    background: #384444;
    color: #fff;
    border: none;
    border-radius: 6px;
    box-sizing: border-box;
    cursor: pointer;
  }
  .delete_btn {
    background: #9B9B9B;
  }

  .popup {
    display: none;
    position: absolute;
    top: 50%;
    left: 50%;
    width: 300px;
    margin: auto;
    padding: 20px;
    background: #fff;
    box-shadow: 2px 2px 10px rgba(0,0,0,0.2);
    border-radius: 8px;
    box-sizing: border-box;
    transform: translate(-50%, -50%);
    z-index: 100;
  }
  .popup.show { display: block; }
  .popup div {
    display: flex;
    flex-direction: column;
    gap: 20px;
  }
  .popup div input {
    padding: 10px;
    background: #F6F6F6;
    border-radius: 4px;
    border: none;
  }
  .popup_bg {
    display: none;
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100vh;
    background: #000;
    opacity: 0.2;
  }
  .popup_bg.show { display: block; }

  .popup .btn_wrap {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
  }
  .popup .btn_wrap button { width: 100%; }
  .close_btn {
    background: #9B9B9B;
  }
</style>
