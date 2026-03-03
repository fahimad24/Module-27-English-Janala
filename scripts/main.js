
const loadLessonBtn = async () => {
    const loadLessonBtn = getId("lesson-container");
    const res = await fetch("https://openapi.programming-hero.com/api/levels/all");
    const data = await res.json();
    const lessons = data.data;
    lessons.forEach((lesson) => {
        const { level_no } = lesson;
        const li = document.createElement("li");
        li.innerHTML = `
          <button onclick="loadLessonDetails(${level_no})" class="btn btn-outline btn-primary border-2">
        <i class="fa-solid fa-book-open"></i>
        Lesson ${level_no}
      </button>
        `;
        loadLessonBtn.appendChild(li);
    });
}

loadLessonBtn();


// {id: 5, level: 1, word: 'Eager', meaning: 'আগ্রহী', pronunciation: 'ইগার'}

const loadLessonDetails = async (id) => {
    const lessonWordContainer = getId("lesson-word-container");
    const lessonSelecte = getId("lesson-select-container");
    lessonWordContainer.innerHTML = "";
    const res = await fetch(`https://openapi.programming-hero.com/api/level/${id}`);
    const data = await res.json();
    const words = data.data;
    console.log(words);

    if (words.length === 0) {
        lessonWordContainer.classList.add("hidden");
        return;
    } else {
        lessonSelecte.classList.add("hidden");
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
                    <button class="btn bg-[#badeff4d] mt-4 w-12 h-12 rounded-lg">
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
}