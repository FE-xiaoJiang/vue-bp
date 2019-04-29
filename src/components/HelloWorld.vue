<template>
  <div class="w-time-travel">
    <div class="btn-group">
      <button @click="undoHandler">向前撤销</button>
      <button @click="redoHandler">向后恢复</button>
      <button @click="sureHandler">确认</button>
      <button @click="cancelHandler">取消</button>
    </div>
    <div>
      <input type="text" placeholder="姓名" :value="present.name" @input="nameHandler" />
      <input type="text" placeholder="年龄" :value="present.age" @input="ageHandler"/>
      <div>爱好</div>
      <div class="hobby-list">
        <div class="hobby-item" :key="item" v-for="(item, i) in hobbies">
          <span>{{item}}</span><span class="del-btn" @click="deleteHobby(item, i)">x</span>
        </div>
      </div>
      <div>技能</div>
      <div class="skill-list">
        <div class="skill-item" :key="item" v-for="(item, i) in skills">
          <span>{{item}}</span><span class="del-btn" @click="deleteSkill(item, i)">x</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
const present = {
  name: 'xuefeng.jiang',
  age: '18',
  hobbies: ['码代码', '看电影', '美食', '打篮球', '听音乐'],
  skills: ['java', 'js', 'html', 'react'],
};
export default {
  name: 'HelloWorld',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  },
  computed: {
    count() {
      return this.$store.state.count;
    },
    present() {
      return this.$store.state.present;
    },
    hobbies() {
      return this.present.hobbies;
    },
    skills() {
      return this.present.skills;
    },
  },
  methods: {
    sureHandler() {

    },
    cancelHandler() {
      console.log('cancelHandler...');
      this.$store.commit('undoAll');
    },
    nameHandler(e) {
      console.log('name====>', e.target.value);
      this.$store.commit('doing', {
        type: 'name',
        value: e.target.value,
      });
    },
    ageHandler(e) {
      console.log('age====>', e.target.value);
      this.$store.commit('doing', {
        type: 'age',
        value: e.target.value,
      });
    },
    deleteHobby(item, i) {
      console.log('deleteHobby==>', item, i);
      this.$store.commit('doing', {
        type: 'delete_hobby',
        i,
      });
    },
    deleteSkill(item, i) {
      console.log('deleteSkill===>', item, i);
      this.$store.commit('doing', {
        type: 'delete_skill',
        i,
      });
    },
    undoHandler() {
      console.log('undo...');
      this.$store.commit('undo');
    },
    redoHandler() {
      console.log('redo...');
      this.$store.commit('redo');
    },
  },
  created() {
    setTimeout(() => {
      this.$store.commit('setPresent', {
        present,
      });
    }, 1000);
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
  .w-time-travel {
    display: flex;
    flex-direction: column;
    align-items: center;
    .hobby-list {
      display: flex;
      flex-direction: row;
      width: 500px;
      .hobby-item {
        background-color: #eee;
        margin-right: 6px;
      }
    }
    .skill-list {
      display: flex;
      flex-direction: row;
      width: 500px;
      .skill-item {
        background-color: #eee;
        margin-left: 6px;
      }
    }
    .del-btn {
      background-color: #e2e2e2;
      width: 10px;
      height: 10px;
      margin-left: 5px;
    }
  }
</style>
