import api from "./axios";

export async function listarPets(){

    const {data} = await api.get("/admin/pets");

    return data;

}

export async function aprovarPet(id) {
    const { data } = await api.patch(
        `/admin/pets/${id}/aprovar`
    );

    return data;
}

export async function deletarPet(id){
    const {data} = await api.delete(`/admin/pets/${id}/deletar`);
    return data;
}