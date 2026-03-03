const lessonWordContainer = getId("lesson-word-container");
const loadLessonBtn = async () => {
    loading(true);
    try {
        const loadLessonBtn = getId("lesson-container");
        const res = await fetch("https://openapi.programming-hero.com/api/levels/all");
        const data = await res.json();
        const lessons = data.data;
        lessons.forEach((lesson) => {
            const { level_no } = lesson;
            const li = document.createElement("li");
            li.innerHTML = `
          <button onclick="loadLessonDetails(${level_no})" class="btn btn-outline btn-primary border-2 lesson-btn">
        <i class="fa-solid fa-book-open"></i>
        Lesson ${level_no}
      </button>
        `;
            loadLessonBtn.appendChild(li);
        });
    } finally {
        loading(false);
    }
}

loadLessonBtn();


// {id: 5, level: 1, word: 'Eager', meaning: 'আগ্রহী', pronunciation: 'ইগার'}

const loadLessonDetails = async (id) => {
    lessonWordContainer.classList.add("hidden");
    dataLoading(true);

    try {
        const lessonSelecte = getId("lesson-select-container");
        const allLessonBtn = document.querySelectorAll(".lesson-btn");
        allLessonBtn.forEach((btn) => {
            btn.classList.remove("bg-primary", "text-white");
        });
        const selectedBtn = document.querySelector(`button[onclick="loadLessonDetails(${id})"]`);
        if (selectedBtn) {
            selectedBtn.classList.add("bg-primary", "text-white");
        }
        const lessonEmptyContainer = getId("lesson-empty-container");
        lessonWordContainer.innerHTML = "";
        const res = await fetch(`https://openapi.programming-hero.com/api/level/${id}`);
        const data = await res.json();
        const words = data.data;
        console.log(words);

        if (words.length === 0) {

            lessonEmptyContainer.classList.remove("hidden");
            return;
        } else {
            lessonSelecte.classList.add("hidden");
            lessonEmptyContainer.classList.add("hidden");
        }
        words.forEach((word) => {
            lessonWordContainer.innerHTML += `
                    <div
                  class="p-8 space-y-5 flex flex-col items-center justify-center rounded-lg bg-white"
                >
                  <h1 class="text-3xl font-bold">${word.word}</h1>
                  <p>Meaning /Pronunciation</p>
                  <h2 class="text-3xl text-center">${word.meaning} /${word.pronunciation}</h2>
                  <div class="flex gap-4 justify-between w-full">
                    <button id="word-details-${word.id}" onclick="showWordDetails(${word.id})" class="btn bg-[#badeff4d] mt-4 w-12 h-12 rounded-lg">
                      <i class="fa-solid fa-circle-info"></i>
                    </button>
                    <button class="btn bg-[#badeff4d] mt-4 w-12 h-12 rounded-lg">
                      <i class="fa-solid fa-volume-high"></i>
                    </button>
                  </div>
                </div>
                `;
        });

        lessonWordContainer.classList.remove("hidden");
    } finally {
        dataLoading(false);
    }
}

const showWordDetails = async (id) => {

    const res = await fetch(`https://openapi.programming-hero.com/api/word/${id}`);
    const data = await res.json();
    const wordDetails = data.data;
    console.log(wordDetails);
    const wordDetailsContent = getId("word-details-content");
    wordDetailsContent.innerHTML = `
        <div class="space-y-4 border-2 border-sky-200 p-3 rounded">
                <h2 class="text-2xl font-bold">${wordDetails.word} (<i class="fa-solid fa-microphone-lines"></i> : ${wordDetails.pronunciation})</h2>
                <div class="space-y-2">
                  <h3 class="text-lg font-semibold">Meaning</h3>
                  <p class="text-neutral-700">${wordDetails.meaning}</p>
                </div>
                <div class="space-y-2">
                  <h3 class="text-lg font-semibold">Example</h3>
                  <p class="text-neutral-700">
                    ${wordDetails.sentence}
                  </p>
                </div>
                <div class="space-y-2">
                  <h3 class="text-lg font-semibold">Synonyms</h3>
                  <div>${createElements(wordDetails.synonyms)}</div>
                </div>
              </div>
    `;
    const myModal = getId("my_modal");
    myModal.showModal();
}

const createElements = (arr) => {
    const htmlElements = arr.map((el) => `<span class="btn">${el}</span>`);
    return htmlElements.join(" ");
};

function loading(isLoading) {
    const loadingContainer = getId("loader");
    if (isLoading) {
        loadingContainer.classList.remove("hidden");
    } else {
        loadingContainer.classList.add("hidden");
    }
}

function dataLoading(isDataLoading) {
    const dataLoadingContainer = getId("data-loader");
    if (isDataLoading) {
        dataLoadingContainer.classList.remove("hidden");
    } else {
        dataLoadingContainer.classList.add("hidden");
    }
}