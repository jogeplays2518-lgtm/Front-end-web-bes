
function executar(evento) {
  evento.preventDefault();
  limparForm();

  if (!validarForm()) {
    return;
  }

  chamarApi();
}

async function chamarApi() {
  const dados = {
    nome: document.querySelector("#nome").value,
    idade: Number(document.querySelector("#idade").value),
    celular: document.querySelector("#celular").value.replace(/\D/g, ""),
    email: document.querySelector("#email").value,
    cpf: document.querySelector("#cpf").value.replace(/\D/g, ""),
    cep: document.querySelector("#cep").value.replace(/\D/g, ""),
    endereco: document.querySelector("#endereco").value,
    numero: Number(document.querySelector("#numero").value),
    bairro: document.querySelector("#bairro").value,
    cidade: document.querySelector("#cidade").value
  };

  try {
    const resposta = await fetch("https://postman-echo.com/post", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(dados),
    });

    if (!resposta.ok) {
      throw new Error(`Erro ${resposta.status}: ${resposta.statusText}`);
    }

    const resultado = await resposta.json();

    alert("Retorno da API:\n" + JSON.stringify(resultado, null, 2));

  } catch (erro) {
    alert("Não foi possível enviar o cadastro: " + erro.message);
  }
}

function validarForm() {
  let valido = true;

  function mostrarErro(id, mensagem) {
    const erro = document.querySelector("#erro-" + id);
    erro.textContent = mensagem;
    erro.classList.add("erro");
    erro.classList.remove("oculto");
    valido = false;
  }

  const nome = document.querySelector("#nome").value.trim();

  if (nome === "") {
    mostrarErro("nome", "Nome não pode estar vazio!");
  }

  const idade = document.querySelector("#idade").value;

  if (idade === "") {
    mostrarErro("idade", "Idade não pode estar vazia!");
  } else if (Number(idade) < 18) {
    mostrarErro("idade", "É necessário ter 18 anos!");
  }

  const celular = document.querySelector("#celular").value.replace(/\D/g, "");

  if (celular.length !== 10 && celular.length !== 11) {
    mostrarErro("celular", "Informe um celular válido!");
  }

  const email = document.querySelector("#email").value;
  const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!regexEmail.test(email)) {
    mostrarErro("email", "Informe um email válido!");
  }

  const cpf = document.querySelector("#cpf").value.replace(/\D/g, "");

  if (cpf.length !== 11) {
    mostrarErro("cpf", "O CPF deve conter 11 números!");
  }

  const cep = document.querySelector("#cep").value.replace(/\D/g, "");

  if (cep.length !== 8) {
    mostrarErro("cep", "O CEP deve conter 8 números!");
  }

  const endereco = document.querySelector("#endereco").value.trim();

  if (endereco === "") {
    mostrarErro("endereco", "Endereço não pode estar vazio!");
  }

  const numero = document.querySelector("#numero").value;

  if (numero === "" || Number(numero) <= 0) {
    mostrarErro("numero", "Informe um número válido!");
  }

  const bairro = document.querySelector("#bairro").value.trim();

  if (bairro === "") {
    mostrarErro("bairro", "Bairro não pode estar vazio!");
  }

  const cidade = document.querySelector("#cidade").value.trim();

  if (cidade === "") {
    mostrarErro("cidade", "Cidade não pode estar vazia!");
  }

  const termos = document.querySelector("#termos");

  if (!termos.checked) {
    mostrarErro("termos", "É preciso aceitar os termos!");
  }

  const concluido = document.querySelector("#concluido");

  if (!valido) {
    concluido.textContent = "Corrija os erros antes de prosseguir!";
    concluido.classList.add("erro");
    concluido.classList.remove("oculto");
  }

  return valido;
}

// () => {} arrow function

function limparForm() {
  document.querySelectorAll(".erro").forEach((item) => {
    item.classList.remove("erro");
    item.classList.add("oculto");
  });

  document.querySelector("#concluido").classList.add("oculto");
}

function mascararCelular(evento) {
  const campo = evento.target;

  const numeros = campo.value.replace(/\D/g, "").slice(0, 11);

  const ddd = numeros.slice(0, 2);
  const inicio = numeros.slice(2, 7);
  const fim = numeros.slice(7);

  if (numeros.length > 7) {
    campo.value = `(${ddd}) ${inicio}-${fim}`;
  } else if (numeros.length > 2) {
    campo.value = `(${ddd}) ${inicio}`;
  } else if (numeros.length > 0) {
    campo.value = `(${ddd}`;
  } else {
    campo.value = "";
  }
}
