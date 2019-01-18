<template>
  <div>
    <div class="holder">
      <form @submit.prevent="addSkill">
        <input
          type="text"
          placeholder="Enter a skill you have.."
          v-model="skill"
          v-validate="'min:5'"
          name="skill"
        >
        <transition
          name="alert-in"
          enter-active-class="animated flipInX"
          leave-active-class="animated flipOutX"
        >
          <p class="alert" v-if="errors.has('skill')">{{ errors.first('skill') }}</p>
        </transition>
      </form>

      <ul>
        <transition-group
          name="list"
          enter-active-class="animated fadeInLeft"
          leave-active-class="animated fadeOutRight"
        >
          <li v-for="(data, index) in skills" :key="index+1">
            {{index + 1}}. {{data.skillName}}
            <i v-b-toggle="index + 1" class="fa fa-plus-circle"></i>
            
            <i class="fa fa-minus-circle" v-on:click="remove(index, data._id)"></i>
            <b-collapse v-bind:id="index + 1" class="mt-2">
              <b-form-input
                type="text"
                :class="[{ error_input: errors.has(index+') number input'), 'inputField':true }]"
                v-model="data.skillName"
                v-validate="'min:5'"
                :name="index+') number input'"
                placeholder="Skill Name"
              ></b-form-input>
              <br>
              <transition
                name="alert-in"
                enter-active-class="animated flipInX"
                leave-active-class="animated flipOutX"
              >
                <p
                  class="alert"
                  v-if="errors.has(index+') number input')"
                >Atleast 5 Character required.</p>
                <!-- {{ errors.first(index+') number input') }} -->
              </transition>
              <b-form-textarea
                placeholder="Enter something"
                v-model="data.skillDescription"
                :rows="3"
                :max-rows="6"
              ></b-form-textarea>
              <br>
              <span v-if="!errors.has(index+') number input')">
                <button
                  v-bind:class="[{ 'btn':true, 'btn-primary':true, 'btn-sm' :true}]"
                  v-on:click="update(index, data._id)"
                  v-b-toggle="index + 1"
                >Update</button>
              </span>
            </b-collapse>
          </li>
        </transition-group>
      </ul>
      <p>These are the skills that you possess.</p>
    </div>
  </div>
</template>

<script>
import SkillService from "@/services/SkillService";
export default {
  name: "Skills",
  data() {
    return {
      skill: "",
      skills: [],
      snotify: {
        timeout: "2000",
        showProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true
      }
    };
  },
  mounted() {
    this.getSkill();
  },
  methods: {
    async addSkill() {
      if (this.skill.length > 4) {
        const response = await SkillService.addSkill({
          skillName: this.skill
        });

        this.$router.push({ name: "skills" });
        this.skills.push({
          skillName: response.data.skills.skillName,
          _id: response.data.skills._id
        });
        this.skill = "";
        if (response.data.skills.skillName) {
          this.$snotify.success(
            "Successfully Created !",
            "Insert",
            this.snotify
          );
        } else {
          this.$snotify.error("Failed !", "Error", this.snotify);
        }
      } else {
        this.$snotify.warning("Input Character > 5", "Warning", this.snotify);
      }
    },
    async getSkill() {
      const response = await SkillService.fetchSkills();
      this.skills = response.data.skills;
    },
    async remove(id, tableId) {
      this.skills.splice(id, 1);
      this.$router.push({ name: "skills" });
      const response = await SkillService.deleteSkill(tableId);

      if (response.data.success) {
        this.$snotify.success("Deleted !", "Delete", this.snotify);
      } else {
        this.$snotify.error("Failed !", "Error", this.snotify);
      }
    },
    async update(id, tableId) {
      if (this.skills[id].skillName.length > 4) {
        const response = await SkillService.updateSkill({
          id: tableId,
          skillName: this.skills[id].skillName,
          skillDescription: this.skills[id].skillDescription
        });
        if (response.data.success) {
          this.$snotify.success(
            "Successfully Update !",
            "Update",
            this.snotify
          );
        } else {
          this.$snotify.error("Failed !", "Error", this.snotify);
        }
        this.$router.push({ name: "skills" });
      } else {
        this.$snotify.warning("Input Character > 5", "Warning", this.snotify);
      }
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->

<style scoped>
@import "https://cdn.jsdelivr.net/npm/animate.css@3.5.1";
@import "https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css";
.holder {
  background: #fff;
}

ul {
  margin: 0;
  padding: 0;
  list-style-type: none;
}

ul li {
  padding: 20px;
  font-size: 1.3em;
  background-color: #e0edf4;
  border-left: 5px solid #3eb3f6;
  margin-bottom: 2px;
  color: #3e5252;
}

p {
  text-align: center;
  padding: 30px 0;
  color: gray;
}

.container {
  box-shadow: 0px 0px 40px lightgray;
}

input {
  width: calc(100% - 0px);
  border: 0;
  padding: 20px;
  font-size: 1.3em;
  background-color: #323333;
  color: #687f7f;
}
.inputField {
  width: calc(100% - 40px);
  border: 0;
  padding: 20px;
  font-size: 1.3em;
  background-color: #323333;
  color: #687f7f;
}
textarea {
  width: calc(100% - 40px);
  border: 0;
  padding: 20px;
  font-size: 1.3em;
  background-color: #323333;
  color: #687f7f;
}
.alert {
  background: #fdf2ce;
  font-weight: bold;
  display: inline-block;
  padding: 5px;
  margin-top: -20px;
}
i {
  float: right;
  cursor: pointer;
}
</style>
