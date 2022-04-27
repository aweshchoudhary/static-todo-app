const cardsContainer = document.querySelector(".cards");
const body = document.querySelector("body");
const modelClass = document.querySelector(".model");
const black = document.querySelector(".screen-black");
const input = document.querySelector("#heading");
const textarea = document.querySelector("#textarea");
const add = document.querySelector("#add");
// textarea.value = "";

// components

const card = (id, heading, para, date) => {
  return ` <div class="card">
      <div class="top">${heading}</div>
      <div class="body">${para}</div>
      <div class="bottom">
        <div>${date}</div>
        <div class="btns">
          <button class="btn" onClick="del('${id}')">Delete</button>
          <button class="btn">Checked</button>
        </div>
      </div>
    </div>`;
};

// functions

const toggleModel = (turn) => {
  if (turn === "display") {
    modelClass.style.display = "block";
    black.style.display = "block";
    body.style.overflowY = "hidden";
  } else {
    modelClass.style.display = "none";
    black.style.display = "none";
    body.style.overflowY = "auto";
  }
};

add.addEventListener("click", async () => {
  let cards = [];
  const pastData = JSON.parse(localStorage.getItem("cards"));
  if (pastData) {
    await pastData.map((e) => {
      cards.push(e);
    });
  }
  const d = new Date();
  const card = {
    id: Date.now(),
    heading: input.value,
    desc: textarea.value,
    date: d.toLocaleDateString("en-IN"),
  };
  cards.push(card);
  const cardsStr = JSON.stringify(cards);
  localStorage.setItem("cards", cardsStr);

  toggleModel();
});

const del = async (id) => {
  let data = JSON.parse(localStorage.getItem("cards"));
  let newData = [];
  await data.map((e) => {
    if (!e.id == id) {
      newData.push(e);
    }
  });
  JSON.stringify(localStorage.setItem("cards", newData));
};

if (localStorage.getItem("cards")) {
  JSON.parse(localStorage.getItem("cards")).map((e) => {
    cardsContainer.insertAdjacentHTML(
      "beforeend",
      card(e.id, e.heading, e.desc, e.date)
    );
  });
} else {
  cardsContainer.insertAdjacentHTML(
    "beforeend",
    "<h1 class='nothing'>Nothing to show here. Add your todo.</h1>"
  );
}
