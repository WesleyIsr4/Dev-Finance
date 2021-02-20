const $ = document.querySelector.bind(document);

const html = {
  novaTransacao: $(".form-modal"),
  editModal: $(".edit-modal"),
  switchTheme: $(":root"),
};

const assignClass = (elemento, classe) => {
  return elemento.classList.toggle(classe);
};

//NOVA TRANSAÇÃO MODAL
$(".new").addEventListener("click", () =>
  assignClass(html.novaTransacao, "active")
);
$("#form-button").addEventListener("click", () =>
  assignClass(html.novaTransacao, "active")
);

//Edição Transação
$(".edit").addEventListener("click", () =>
  assignClass(html.editModal, "active")
);
$("#edit-button").addEventListener("click", () =>
  assignClass(html.editModal, "active")
);

const deleteTransaction = (id) => {
  window.location.href = `http://localhost:8080/${id}`;
};

// code of dark theme
let body = document.body;
let toggleBtn = $(".toggle-btn");
let currentTheme = localStorage.getItem("currentTheme");
let toggleImg = localStorage.getItem("toggleImg");

if (currentTheme) {
  body.classList.add("dark-theme");
}

toggleBtn.addEventListener("click", function () {
  body.classList.toggle("dark-theme");

  if (body.classList.contains("dark-theme")) {
    localStorage.setItem("currentTheme", "themeActive");
  } else {
    localStorage.removeItem("currentTheme");
  }
});





