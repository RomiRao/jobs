const $ = (selector) => document.querySelector(selector);
const $$ = (selector) => document.querySelectorAll(selector);

const printJobs = (jobList) => {
    $("#cards-container").innerHTML = "";
    jobList.forEach((job) => {
        $(
            "#cards-container"
        ).innerHTML += `<div class="card m-3" style="width: 16.6rem;">
    <img src="${job.image}" class="card-img-top" alt="ship/job ilustration">
    <div class="card-body d-flex flex-column justify-content-around">
      <h5 class="card-title">
        ${job.name}
      </h5>
      <p class="card-text">
        ${cutText(job.description)}
      </p>
      <div class="my-2">
        <span class="bg-tags rounded px-2 m-1 fs-8 text fw-semibold">
          ${job.ship}
        </span>
        <span class="bg-tags rounded px-2 m-1 fs-8 text fw-semibold">
          ${job.department}
        </span>
        <span class="bg-tags rounded px-2 m-1 fs-8 text fw-semibold">
          ${job.seniority}
        </span>
      </div>
      <div>
        <a href="#" class="btn bg-primary-c">
          See details
        </a>
      </div>
    </div>
    </div>`;
    });
};

const cutText = (text) => {
    if (text.length > 150) {
        return `${text.slice(0, 150)}...`;
    }
};
