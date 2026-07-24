import api from "./axios";

export const messageService = {
  send: (data: { name: string; email: string; subject: string; message: string }) =>
    api.post("/messages", data),
};
