const formatarData = (data) => {
    if (!data) return 'Nunca';
    return new Date(data).toLocaleString('pt-BR', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    });
};

export default formatarData;