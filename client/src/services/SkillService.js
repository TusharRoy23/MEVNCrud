import Api from '@/services/Api'

export default {
    fetchSkills() {
        return Api().get('skill/dashboard')
    },
    addSkill(params) {
        return Api().post('skill/create', params)
    },
    deleteSkill(table_id) {
        return Api().get('skill/delete/' + table_id);
    },
    updateSkill(params) {
        return Api().put('skill/update/', params);
    }
}