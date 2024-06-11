import { axiosInstance as ax } from "./axios";

export const messageService = {
  find: async (params) => {
    return await ax.get('https://dev.dikahadir.com/collectui/mobile_message_list/', {
      params: params,
    });
  },
  post: async (payload) => {
    return await ax.post(`/collectui/mobile_sendchat`, payload, {
      headers: {
        
        "Content-Type": "application/x-www-form-urlencoded",

        Accept: "Application/json",
      },
    });
  },
};
