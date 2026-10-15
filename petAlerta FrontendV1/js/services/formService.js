import { gerarPayload } from '../payload.js';
import { resetarFormulario } from './uiResetService.js';
import { imagePreview, videoPreview, statusCamera, textoBotaoCamera } from '../utils/domHelpers.js';
import { resetLoadingState, setLoadingState } from './formSubmitService.js';
import { buildPayload } from './formFlowService.js';
import { logPayload } from '../services/logPayload.js';
import { validarFormulario } from './validationService.js';
import { payloadToFormData } from './payloadToFormData.js';
import { limparErroFoto, mostrarErros } from '../utils/formErrorService.js';

export function initPetForm(cameraController) {

    const petForm = document.getElementById('petForm');
    // Quando tira foto OU escolhe da galeria, limpa o erro
    cameraController.onFotoCapturada = () => {
        limparErroFoto();
    };


    const inputGaleria = document.getElementById('petGalleryFile');
    inputGaleria.addEventListener('change', (event) => {
        const file = event.target.files[0];
        if (!file) return;
    });


    petForm.addEventListener('submit', async (event) => {
        event.preventDefault();
        limparErroFoto(petForm);

        // 1. Monta o payload
        const payload = buildPayload(petForm, cameraController);

        // 2. Valida os dados
        const validacao = validarFormulario(payload);

        if (!validacao.isValid) {
            mostrarErros(
                petForm,
                validacao.camposComErro,
                validacao.erros
            );
            return;
        }

        // 3. Converte o payload para FormData
        const formDataFinal = payloadToFormData(payload);

        // 4. Prepara o botão
        const botaoSubmit = petForm.querySelector('.btn-submit');
        setLoadingState(botaoSubmit);

        try {
            // 5. Envia o cadastro para a API
            const response = await fetch(
                'https://pet-alerta-backend.vercel.app/api/pets',
                {
                    method: 'POST',
                    body: formDataFinal
                }
            );

            // 6. Interpreta a resposta
            const resultado = await response.json().catch(() => null);

            console.log('Status HTTP:', response.status);
            console.log('Resposta da API:', resultado);

            if (!response.ok || !resultado?.success) {
                throw new Error(
                    resultado?.message ||
                    JSON.stringify(resultado) ||
                    `Erro ao cadastrar animal (HTTP ${response.status}).`
                );
            }

            // 7. Só limpa o formulário após sucesso confirmado
            cameraController.reset();

            resetarFormulario({
                petForm,
                imagePreview,
                videoPreview,
                statusCamera,
                textoBotaoCamera
            });

            limparErroFoto(petForm);

            alert('Animal cadastrado com sucesso!');

        } catch (error) {
            console.error('Erro ao cadastrar animal:', error);

            alert(
                error.message ||
                'Não foi possível cadastrar o animal. Tente novamente.'
            );

        } finally {
            // 8. Restaura o botão em caso de sucesso ou falha
            resetLoadingState(botaoSubmit);
        }
    });


    petForm.addEventListener('input', (e) => {
        if (e.target.matches('input, select, textarea')) {
            e.target.classList.remove('error');
            // Remove msg de erro do campo
            const msg = e.target.closest('.form-group')?.querySelector('.error-message');
            msg?.remove();
        }
    });

    // Pra foto: remove quando escolher arquivo ou tirar foto
    inputGaleria.addEventListener('change', () => {
        document.querySelector('.botoes-foto-container').classList.remove('error');
        document.querySelector('.botoes-foto-container +.error-message')?.remove();
    });
}