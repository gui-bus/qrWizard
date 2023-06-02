// TODO Criação do QRCode
const form = document.getElementById("generate-form");
const qr = document.getElementById("qrcode");
const successTitle = document.getElementById("sucessTitle");
const successParag = document.getElementById("successParag");
const spacer = document.getElementById("spacer");

let isProcessing = false;
const onGenerateSubmit = (e) => {
  e.preventDefault();

  if (isProcessing) {
    return; // !Sai da função se o processamento já estiver em andamento
  }

  isProcessing = true;

  clearUI();

  const url = document.getElementById("url").value;
  const size = document.getElementById("size").value;

  // !Verifica se o usuário deixou o campo de URL em branco
  if (url === "") {
    alert(
      "Oops! Parece que você não digitou uma URL. Por favor, informe uma URL válida para prosseguir com a geração do QR Code."
    );
  }
  // !Verifica se uma opção diferente de 'Selecione' foi selecionada no elemento <select>
  else if (size === "0") {
    alert("Por favor, selecione um tamanho válido para o QR Code.");
  } else {
    showSpinner();

    // !Mostra o spinner por 1000ms (1s)
    setTimeout(() => {
      HideSpinner();
      generateQRCode(url, size);

      // !Gera o botão de download depois da função de gerar o QR Code ter sido completa
      setTimeout(() => {
        const saveUrl = qr.querySelector("img").src;
        createSaveBtn(saveUrl);

        // !Smooth Scroll
        qr.scrollIntoView({ behavior: "smooth" });

        isProcessing = false; // !Marca o processamento como concluído
      }, 50);
    }, 1000);
  }
};

// !Função para obter o valor das cores selecionadas
const getSelectedColors = () => {
  const colorPickerPrimary = document.getElementById("color-picker-primary");
  const colorPickerSecondary = document.getElementById("color-picker-secondary");
  
  const colorDark = colorPickerPrimary.value;
  const colorLight = colorPickerSecondary.value;
  
  return { colorDark, colorLight };
};


// !Gera o QRCode usando a lib
const generateQRCode = (url, size) => {
  const { colorDark, colorLight } = getSelectedColors();
  
  const qrcode = new QRCode("qrcode", {
    text: url,
    width: size,
    height: size,
    colorDark: colorDark,
    colorLight: colorLight,
    correctLevel: QRCode.CorrectLevel.H
  });
};

// !Mostra o spinner
const showSpinner = () => {
  document.getElementById("spinner").style.display = "block";
};

// !Esconde o spinner
const HideSpinner = () => {
  document.getElementById("spinner").style.display = "none";
};

// !Limpa a HUD, remove o QRCode anterior e o botão de download
const clearUI = () => {
  qr.innerHTML = "";
  const saveBtn = document.getElementById("saveLink");
  if (saveBtn) {
    saveBtn.remove();
  }
};

// !Função para obter a extensão do arquivo selecionada pelo usuário
const getFileExtension = () => {
  const fileFormatSelect = document.getElementById("file-format");
  const selectedOption = fileFormatSelect.value;
  return selectedOption;
};

// !Função para download do QRCode
const downloadQRCode = () => {
  const qrCodeImage = document.querySelector("#qrcode img");
  const fileExtension = getFileExtension();
  const downloadLink = document.createElement("a");

  downloadLink.href = qrCodeImage.src;
  downloadLink.download = `QRCode.${fileExtension}`;
  downloadLink.style.display = "none";

  document.body.appendChild(downloadLink);
  downloadLink.click();
  document.body.removeChild(downloadLink);
};

const createSaveBtn = (saveUrl) => {
  const isMobile = window.innerWidth < 768;

  if (isMobile) {
    // !Verifica se a mensagem já existe
    const existingMessage = document.querySelector(".error-message");
    if (existingMessage) {
      existingMessage.remove(); // !Remove a mensagem existente
    }

    const message = document.createElement("p");
    message.classList = "error-message text-red-700 font-medium p-6 -mt-12 mb-4 text-center";
    message.innerHTML =
      "Para fazer o download em dispositivos móveis, altere o seu navegador para o modo 'para computador' nas configurações ou faça o download via desktop.";

    document.getElementById("generated").appendChild(message);
  } else {
    // !Criar o botão de download e exibir título e parágrafo de sucesso
    const link = document.createElement("a");
    link.id = "saveLink";
    link.classList =
      "bg-emerald-500 hover:bg-emerald-600 text-white font-bold py-2 rounded w-1/3 m-auto mt-5 mb-16";
    link.href = saveUrl;
    link.download = `QRCode.${getFileExtension()}`; // !Utiliza a extensão selecionada pelo usuário no nome do arquivo
    link.innerHTML = "Download";
    document.getElementById("generated").appendChild(link);

    successTitle.innerHTML = "Seu QR Code foi gerado com sucesso! <br>";
    successTitle.classList.add("text-wizardGreen"); // !Adiciona a classe 'text-wizardGreen' ao successTitle
    successParag.innerHTML =
      "Agora você pode escaneá-lo para acessar o conteúdo desejado ou baixá-lo e compartilhá-lo com outras pessoas, facilitando assim o acesso rápido e conveniente ao site desejado.";

    spacer.innerHTML = "<hr>";
  }
};

HideSpinner();

form.addEventListener("submit", onGenerateSubmit);

// TODO Controle do acordeão

// !Seleciona todos os itens do acordeão com a classe 'accordion'
const accordionItems = document.querySelectorAll(".accordion");

// !Percorre cada item do acordeão
accordionItems.forEach((item) => {
  // !Seleciona o cabeçalho do item
  const header = item.querySelector(".flex");

  // !Adiciona um evento de clique ao cabeçalho
  header.addEventListener("click", () => {
    // !Verifica se o item está aberto ou fechado
    const isOpen = item.classList.contains("open");

    // !Fecha todos os itens do acordeão
    closeAllItems();

    // !Abre ou fecha o item do acordeão clicado
    if (!isOpen) {
      openItem(item);
    }
  });
});

// !Função para fechar todos os itens do acordeão
function closeAllItems() {
  accordionItems.forEach((item) => {
    item.classList.remove("open");
    const content = item.querySelector(".px-6.py-4");
    content.classList.add("hidden");

    const icon = item.querySelector("svg");
    icon.classList.remove("rotate-180");
  });
}

// !Função para abrir um item específico do acordeão
function openItem(item) {
  item.classList.add("open");
  const content = item.querySelector(".px-6.py-4");
  content.classList.remove("hidden");

  const icon = item.querySelector("svg");
  icon.classList.add("rotate-180");
}

// TODO Controle do visualisador de caracteres restantes do formulário de contato
const textarea = document.getElementById("message");
const charCount = document.getElementById("charCount");

textarea.addEventListener("input", function () {
  const remainingChars = 500 - this.value.length;
  charCount.textContent = remainingChars + " caracteres restantes";

  if (remainingChars <= 20) {
    charCount.classList.add("text-red-500");
  } else {
    charCount.classList.remove("text-red-500");
  }
});
