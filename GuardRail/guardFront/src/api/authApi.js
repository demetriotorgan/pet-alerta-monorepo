import api from "./axios";

export async function loginUsuario(email, senha) {

    const { data } = await api.post("/auth/login", {
        email,
        senha
    });

    return data;
};

export async function authMe(){
    const {data} = await api.get('/auth/me');
    return data.user
}

export async function cadastrarUsuario(userData) {
    const { data } = await api.post("/auth/register", userData);
    return data;
}

export async function listarUsuarios(){
    const {data} = await api.get('/auth/usuarios');    
    return data
}

export async function deletarUsuario(id){
    const {data} = await api.delete(`/auth/${id}/deletar`);
}