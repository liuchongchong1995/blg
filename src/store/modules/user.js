
const state = { 
    name: '',
    avatar: '',
    introduction: '',
    roles: [],
    rolesype:[]
};

const mutations = {
    SET_TOKEN: (state, token) => {
        state.token = token;
    },
    SET_INTRODUCTION: (state, introduction) => {
        state.introduction = introduction;
    },
    SET_NAME: (state, name) => {
        state.name = name;
    },
    SET_AVATAR: (state, avatar) => {
        state.avatar = avatar;
    },
    SET_ROLES: (state, roles) => {
        state.roles = roles;
    },
    SET_ROLESTYPE: (state, rolesype) => {
        state.rolesype = rolesype;
    }
};

const actions = { 
    getInfo({ commit}) {
        return new Promise((resolve) => {
            const data = {
                roles: ['1']
            }; 
            const roles = ['1'];  

            commit('SET_ROLES', roles) 

            resolve(data)
        });
    }
};

export default {
    namespaced: true,
    state,
    mutations,
    actions
};
