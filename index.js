(function () {
  const initialImages = document.querySelectorAll("img");
  const initialBodyHeight = document.body.style.height;
  const initialBodyOverflowY = document.body.style.overflowY;
  const timestamp = Date.now();

  const createStyleSheet = () => {
    const styleSheet = document.createElement("style");
    styleSheet.appendChild(document.createTextNode(""));
    document.head.appendChild(styleSheet);
    styleSheet.sheet.insertRule(
      `.alt_form_${timestamp} {position: fixed; background-color: white; padding: 15px; border-radius: 10px; border: 1px solid grey; z-index: 10000; font-size: 16px; }`
    );
    styleSheet.sheet.insertRule(
      `.alt_form_${timestamp} .alt_form_input_${timestamp} {width: 300px; font-size:16px; padding: 10px; display: block; outline: none; border-radius: 5px; border: 1px solid grey; margin: 10px 0px }`
    );
    styleSheet.sheet.insertRule(
      `.alt_form_${timestamp} .alt_form_input_${timestamp}:focus { border: 2px solid blue; }`
    );
    styleSheet.sheet.insertRule(
      `.alt_form_${timestamp} .alt_form_buttons_wrapper_${timestamp} { display: flex; width: 100%; justify-content: flex-end; margin-top: 10px; align-items: center }`
    );
    styleSheet.sheet.insertRule(
      `.alt_form_${timestamp} .alt_form_button_${timestamp} {border: none; border-radius: 5px; font-size:16px; color: white; padding: 10px; cursor: pointer; user-select: none; }`
    );
    styleSheet.sheet.insertRule(
      `.alt_form_${timestamp} .button_submit_${timestamp} {background-color:  #5cb85c; }`
    );
    styleSheet.sheet.insertRule(
      `.alt_form_${timestamp} .button_cancel_${timestamp} { background-color: #ed4337; margin-right: 10px; }`
    );
    styleSheet.sheet.insertRule(
      `.alt_form_${timestamp} .alt_form_button_${timestamp}:hover {background-color: black; }`
    );
    styleSheet.sheet.insertRule(
      `.alt_form_canvas_overlay_${timestamp} { position: fixed; display: block; top: 0; left: 0; opacity: 0.5; }`
    );
    styleSheet.sheet.insertRule(
      `.image_in_editing_${timestamp} { border: 4px solid red }`
    );
    styleSheet.sheet.insertRule(
      `.image_edited_${timestamp} { border: 4px solid blue }`
    );
    styleSheet.sheet.insertRule(
      `.alt_form_${timestamp} .alt_form_label_${timestamp} { font-weight: 600; font-size: 18px; }`
    )
  };

  const handleCloseFormAndOverlay = () => {
    const selectedImageElement = document.querySelector(
      `img.image_in_editing_${timestamp}`
    );
    selectedImageElement?.classList.replace(
      `image_in_editing_${timestamp}`,
      `image_edited_${timestamp}`
    );
    document.getElementById(
      `custom_alt_form_canvas_overlay_${timestamp}`
    ).style.display = "none";
    document.getElementById(
      `custom_alt_form_change_${timestamp}`
    ).style.display = "none";
    document.getElementById(`alt_form_input_${timestamp}`).value = "";
    document.body.style.height = initialBodyHeight;
    document.body.style.overflowY = initialBodyOverflowY;
  };

  const createCanvasOverlay = () => {
    const canvas = document.createElement("canvas");
    canvas.id = `custom_alt_form_canvas_overlay_${timestamp}`;
    canvas.className = `alt_form_canvas_overlay_${timestamp}`;
    canvas.style.display = "none";
    document.body.appendChild(canvas);
  };

  const createFormElement = () => {
    const formElement = document.createElement("form");
    formElement.className = `alt_form_${timestamp}`;
    formElement.id = `custom_alt_form_change_${timestamp}`;
    formElement.addEventListener("submit", (ev) => {
      ev.preventDefault();
      const selectedImageElement = document.querySelector(
        `img.image_in_editing_${timestamp}`
      );
      const formData = new FormData(ev.target);
      selectedImageElement.setAttribute("alt", formData.get("newAltAttribute"));
      handleCloseFormAndOverlay();
    });
    formElement.style.display = "none";

    const inputLabel = document.createElement("label");
    inputLabel.innerText = 'New alt value';
    inputLabel.for = `alt_form_input_${timestamp}`;
    inputLabel.className = `alt_form_label_${timestamp}`;

    const newAltInput = document.createElement("input");
    newAltInput.placeholder = "Please enter new alt attribute value";
    newAltInput.name = "newAltAttribute";
    newAltInput.id = `alt_form_input_${timestamp}`;
    newAltInput.className = `alt_form_input_${timestamp}`;

    const buttonsWrapperElement = document.createElement("div");
    buttonsWrapperElement.className = `alt_form_buttons_wrapper_${timestamp}`;

    const saveButtonElement = document.createElement("button");
    saveButtonElement.innerText = "SAVE";
    saveButtonElement.type = "submit";
    saveButtonElement.className = `alt_form_button_${timestamp} button_submit_${timestamp}`;

    const cancelButtonElement = document.createElement("button");
    cancelButtonElement.innerText = "CANCEL";
    cancelButtonElement.className = `alt_form_button_${timestamp} button_cancel_${timestamp}`;
    cancelButtonElement.addEventListener("click", (ev) => {
      ev.preventDefault();
      handleCloseFormAndOverlay();
    });

    formElement.appendChild(inputLabel);
    formElement.appendChild(newAltInput);
    buttonsWrapperElement.appendChild(cancelButtonElement);
    buttonsWrapperElement.appendChild(saveButtonElement);
    formElement.appendChild(buttonsWrapperElement);
    document.body.appendChild(formElement);
  };

  const handleOpenFormOverlay = () => {
    const selectedImageElement = document.querySelector(
      `img.image_in_editing_${timestamp}`
    );
    const selectedImagePosition = selectedImageElement.getBoundingClientRect();
    const canvasElement = document.getElementById(
      `custom_alt_form_canvas_overlay_${timestamp}`
    );
    canvasElement.style.display = "block";
    canvasElement.width = window.innerWidth;
    canvasElement.height = window.innerHeight;
    const ctx = canvasElement.getContext("2d");
    ctx.fillRect(0, 0, canvasElement.width, canvasElement.height);
    ctx.clearRect(
      selectedImagePosition.left,
      selectedImagePosition.top,
      selectedImagePosition.width,
      selectedImagePosition.height
    );
    canvasElement.addEventListener("click", (ev) => {
      if (ev.target.tagName === "CANVAS") {
        handleCloseFormAndOverlay();
      }
    });
  };

  const showAddOrUpateAltForm = () => {
    const selectedImageElement = document.querySelector(
      `img.image_in_editing_${timestamp}`
    );
    selectedImageElement.scrollIntoView();
    const selectedImagePosition = selectedImageElement.getBoundingClientRect();
    const inputAndButtonPositionTop =
      selectedImagePosition.y + selectedImagePosition.height / 2;
    const formElement = document.getElementById(
      `custom_alt_form_change_${timestamp}`
    );
    formElement.style = ` top:${inputAndButtonPositionTop}px; left: ${
      selectedImagePosition.x + 10
    }px;`;
    document.body.style.height = "100vh";
    document.body.style.overflowY = "hidden";
    formElement.style.display = "block";
    handleOpenFormOverlay();
  };

  const handleImageClick = (ev) => {
    ev.target.classList.replace(
      `image_edited_${timestamp}`,
      `image_in_editing_${timestamp}`
    );
    showAddOrUpateAltForm();
  };

  const fetchAltKeywordsAndAssignToImages = (imagesNodes) => {
    fetch(
      `https://random-word-api.herokuapp.com/word?number=${imagesNodes.length}`,
      {
        method: "GET",
      }
    )
      .then((altKeywords) => altKeywords.json())
      .then((altKeywords) => {
        let currImageIndex = 0;
        for (let image of imagesNodes) {
          image.setAttribute("alt", altKeywords[currImageIndex]);
          currImageIndex += 1;
          image.classList.add(`image_edited_${timestamp}`);
        }
      });
  };

  const mutationCallback = (mutationList) => {
    for (const mutation of mutationList) {
      const imageNodesAdded = [...mutation.addedNodes].filter(
        (node) => node.tagName === "IMG"
      );
      if (
        (mutation.type === "subtree" || mutation.type === "childList") &&
        imageNodesAdded.length > 0
      ) {
        fetchAltKeywordsAndAssignToImages(imageNodesAdded);
      }
    }
  };

  const mutationObserver = new MutationObserver(mutationCallback);
  mutationObserver.observe(document.body, { childList: true, subtree: true });

  createStyleSheet();
  createFormElement();
  createCanvasOverlay();
  fetchAltKeywordsAndAssignToImages(initialImages);
  document.addEventListener(
    "click",
    (ev) => {
      if (ev.target.tagName === "IMG") {
        handleImageClick(ev);
      }
    },
    { capture: true }
  );
})();
