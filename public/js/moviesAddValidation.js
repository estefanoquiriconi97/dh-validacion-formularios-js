window.onload = function () {
  let titulo = document.querySelector(".moviesAddTitulo");
  let formulario = document.querySelector("#formulario");
  let article = document.querySelector("article");
  titulo.innerHTML = "AGREGAR PELÍCULA";
  titulo.classList.add("titulo");
  article.classList.add("fondoTransparente");
  formulario.classList.add("fondoCRUD");

  let title = document.getElementById("title");
  let rating = document.getElementById("rating");
  let awards = document.getElementById("awards");
  let release_date = document.getElementById("release_date");
  let length = document.getElementById("length");
  let genre_id = document.getElementById("genre_id");

  const ulErrors = document.querySelector(".errores");

  //Focus en el título
  title.focus();

  //Función para alternar clases
  function toggleClass(input, isValid) {
    input.classList.toggle("is-invalid", !isValid);
    input.classList.toggle("is-valid", isValid);
  }

  //Función para validar un campo requerido
  function validateRequiredField(input) {
    const isValid = input.value.trim() !== "";
    toggleClass(input, isValid);
    return isValid;
  }

  //Función para validar un campo númerico entre un rango de valores
  function validateNumericField(input, min, max) {
    const isValid = input.value >= min && input.value <= max;
    toggleClass(input, isValid);
    return isValid;
  }

  //Validar clasificación
  rating.addEventListener("input", () => {
    validateNumericField(rating, 1, 10);
  });

  //Validar premios
  awards.addEventListener("input", () => {
    validateNumericField(awards, 1, 10);
  });

  //Validar la duración
  length.addEventListener("input", () => {
    validateNumericField(length, 60, 360);
  });

  //Valir título
  title.addEventListener("input", () => {
    validateRequiredField(title);
  });

  //Validar Género
  genre_id.addEventListener("input", () => {
    validateRequiredField(genre_id);
  });

  //Validar fecha de creación
  release_date.addEventListener("input", () => {
    validateRequiredField(release_date);
  });

  formulario.addEventListener("submit", (event) => {
    let errors = [];

    if (!validateRequiredField(title)) errors.push("Debes ingresar el título");
    if (!validateRequiredField(release_date))
      errors.push("Debes ingresar la fecha de creación");
    if (!validateRequiredField(genre_id))
      errors.push("Debes seleccionar un género");

    if (!validateRequiredField(rating)) {
      errors.push("Debes ingresar la clasificación");
    } else if (!validateNumericField(rating, 1, 10)) {
      errors.push("La clasificación debe ser entre 1 y 10");
    }

    if (!validateRequiredField(awards)) {
      errors.push("Debes ingresar los premios");
    } else if (!validateNumericField(awards, 1, 10)) {
      errors.push("Los premios deben ser entre 1 y 10");
    }

    if (!validateRequiredField(length)) {
      errors.push("Debes ingresar la duración");
    } else if (!validateNumericField(length, 60, 360)) {
      errors.push("La duración debe ser entre 60 y 360");
    }

    if (errors.length > 0) {
      event.preventDefault();
      ulErrors.innerHTML = "";
      ulErrors.classList.add("alert-warning");
      errors.forEach((error) => {
        ulErrors.innerHTML += `<li>${error}</li>`;
      });
    } else {
      alert("La película se guardó satisfactoriamente.");
    }
  });
};
