const user = {
  //  使用命名空间模块
  namespaced: true,
  state() {
    return {
      profile: {
        id: "",
        name: "",
        token: "",
      },
    };
  },
  mutations: {
    setProfile(state, payload) {
      console.log("payload", payload);
      // 判断 payload 对象是否为空
      if (Object.keys(payload).length !== 0) {
        state.profile = {
          ...state.profile,
          ...payload,
        };
      } else {
        state.profile = {
          id: "",
          name: "",
          token: "",
        };
      }
    },
    clearProfile(state) {
      state.profile = {
        id: "",
        name: "",
        token: "",
      };
    },
  },
};

export default user;
