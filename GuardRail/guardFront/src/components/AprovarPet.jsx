
import './AprovarPet.css'
import { useEffect, useState } from "react";
import { aprovarPet, deletarPet, listarPets } from "../api/petApi";

const AprovarPet = () => {
    const [pets, setPets] = useState([]);
    const [loading, setLoading] = useState(true);
    const [erro, setErro] = useState("");
    const [aprovandoId, setAprovandoId] = useState(null);
    const [mensagem, setMensagem] = useState("");
    const [excluindoId, setExcluindoId] = useState(null);

    useEffect(() => {
        async function carregarPets() {
            try {
                setLoading(true);
                setErro("");

                const resposta = await listarPets();

                setPets(resposta.data);
            } catch (error) {
                console.error("Erro ao listar pets:", error);

                setErro(
                    error.response?.data?.message ||
                    "Não foi possível carregar os pets."
                );
            } finally {
                setLoading(false);
            }
        }

        carregarPets();
    }, []);

    if (loading) {
        return (
            <p className="aprovar-pet-mensagem">
                Carregando pets...
            </p>
        );
    }

    if (erro) {
        return (
            <p className="aprovar-pet-mensagem aprovar-pet-erro" role="alert">
                {erro}
            </p>
        );
    }

    if (pets.length === 0) {
        return (
            <p className="aprovar-pet-mensagem">
                Nenhum pet encontrado.
            </p>
        );
    }


    async function handleAprovar(id) {
        try {
            setAprovandoId(id);
            setMensagem("");

            const resposta = await aprovarPet(id);

            if (resposta.success === false) {
                throw new Error(
                    resposta.message || "Não foi possível aprovar o pet."
                );
            }

            // Atualiza o registro com os dados devolvidos pela API.
            const petAtualizado = resposta.data;

            if (petAtualizado?._id) {
                setPets((petsAtuais) =>
                    petsAtuais.map((pet) =>
                        pet._id === petAtualizado._id
                            ? petAtualizado
                            : pet
                    )
                );
            } else {
                // Se a API não devolver o pet atualizado, consulta novamente.
                const listaAtualizada = await listarPets();
                setPets(listaAtualizada.data);
            }

            setMensagem("Pet aprovado com sucesso!");
        } catch (error) {
            console.error("Erro ao aprovar pet:", error);

            setMensagem(
                error.response?.data?.message ||
                error.message ||
                "Erro ao aprovar o pet."
            );
        } finally {
            setAprovandoId(null);
        }
    };


    async function handleDeletar(pet) {
        const confirmar = window.confirm(
            `Deseja realmente excluir o cadastro de ${pet.nomeAnimal}?`
        );

        if (!confirmar) {
            return;
        }

        try {
            setExcluindoId(pet._id);
            setMensagem("");

            const resposta = await deletarPet(pet._id);

            if (resposta.success === false) {
                throw new Error(
                    resposta.message || "Não foi possível excluir o pet."
                );
            }

            // Remove o card somente após a confirmação da API.
            setPets((petsAtuais) =>
                petsAtuais.filter(
                    (item) => item._id !== pet._id
                )
            );

            setMensagem(
                `O cadastro de ${pet.nomeAnimal} foi excluído com sucesso.`
            );
        } catch (error) {
            console.error("Erro ao excluir pet:", error);

            setMensagem(
                error.response?.data?.message ||
                error.message ||
                "Não foi possível excluir o pet."
            );
        } finally {
            setExcluindoId(null);
        }
    };



    return (
        <section className="aprovar-pet">
            <h1>Moderação de pets</h1>
            <p className="subtitulo">
                Revise os cadastros recebidos pelo PetAlerta.
            </p>
            {mensagem && (
                <p role="status" aria-live="polite">
                    {mensagem}
                </p>
            )}
            <div className="lista-pets">
                {pets.map((pet) => (
                    <article key={pet._id} className="pet-card">
                        <img
                            src={pet.foto?.url}
                            alt={`Foto de ${pet.nomeAnimal}`}
                            className="pet-card-foto"
                        />

                        <div className="pet-card-conteudo">
                            <h2>{pet.nomeAnimal}</h2>

                            <div>
                                <strong>Status: </strong>

                                {(() => {
                                    const status = pet.moderacao?.status || "PENDENTE";

                                    const classeStatus = {
                                        PENDENTE: "pet-status-pendente",
                                        APROVADO: "pet-status-aprovado",
                                        REJEITADO: "pet-status-rejeitado",
                                    }[status] || "pet-status-pendente";

                                    return (
                                        <span className={`pet-status ${classeStatus}`}>
                                            {status}
                                        </span>
                                    );
                                })()}
                            </div>

                            <p>
                                <strong>Responsável:</strong>{" "}
                                {pet.nomeResponsavel}
                            </p>

                            <p>
                                <strong>Telefone:</strong>{" "}
                                {pet.telefone}
                            </p>

                            <p>
                                <strong>Cidade:</strong>{" "}
                                {pet.cidade}
                            </p>

                            <div className="pet-card-acoes">
                                {pet.moderacao?.status === "PENDENTE" && (
                                    <button
                                        type="button"
                                        className="pet-btn-aprovar"
                                        onClick={() => handleAprovar(pet._id)}
                                        disabled={aprovandoId === pet._id}
                                    >
                                        {aprovandoId === pet._id
                                            ? "Aprovando..."
                                            : "Aprovar"}
                                    </button>
                                )}

                                <button
                                    type="button"
                                    className="pet-btn-excluir"
                                    onClick={() => handleDeletar(pet)}
                                    disabled={
                                        excluindoId === pet._id ||
                                        aprovandoId === pet._id
                                    }
                                >
                                    {excluindoId === pet._id
                                        ? "Excluindo..."
                                        : "Excluir"}
                                </button>
                            </div>
                        </div>
                    </article>
                ))}
            </div>            
        </section>
    );
};

export default AprovarPet;
