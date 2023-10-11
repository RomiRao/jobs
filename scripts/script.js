const $ = (selector) => document.querySelector(selector);
const $$ = (selector) => document.querySelectorAll(selector);

//To switch views
const showView = (id) => {
    $$(".view").forEach((view) => {
        view.classList.add("visually-hidden");
        $(`#${id}`).classList.remove("visually-hidden");
    });
};

//GETS JOBS FROM API AND PRINT THEM
const printJobs = (jobList) => {
    showView("home");
    $("#cards-container").innerHTML = "";
    jobList.forEach(
        ({ id, image, name, description, ship, department, seniority }) => {
            const card = document.createElement("div");

            card.id = id;
            card.className = "card m-3 shadow";
            card.style.width = "16.6rem";

            card.innerHTML = `
    <img src="${image}" class="card-img-top" alt="ship/job ilustration">
    <div class="card-body d-flex flex-column justify-content-around">
      <h5 class="card-title">
        ${name}
      </h5>
      <p class="card-text">
        ${cutText(description)}
      </p>
      <div class="my-2">
        <span class="bg-tags rounded px-2 m-1 fs-8 text fw-semibold">
          ${ship}
        </span>
        <span class="bg-tags rounded px-2 m-1 fs-8 text fw-semibold">
          ${department}
        </span>
        <span class="bg-tags rounded px-2 m-1 fs-8 text fw-semibold">
          ${seniority}
        </span>
      </div>
      <div>
        <a href="#" class="btn detail-btn bg-primary-c">
          See details
        </a>
      </div>
    </div>`;

            $("#cards-container").appendChild(card);

            card.querySelector(".detail-btn").addEventListener("click", () =>
                printJobDetail(id)
            );
        }
    );
};

const printJobDetail = (id) => {
    console.log("este es el id", id);
};

const cutText = (text) => {
    if (text.length > 150) {
        return `${text.slice(0, 150)}...`;
    }
};

//----------
//GET FILTERS FROM API
//--------------
const getShips = (data) => {
    $("#select-ship").innerHTML = "";
    $("#select-ship").innerHTML =
        '<option value="" selected disabled>Ship</option>';
    let ships = [];
    data.forEach((job) => {
        if (!ships.includes(job.ship)) {
            ships.push(job.ship);
        }
    });
    ships.forEach((ship) => {
        $(
            "#select-ship"
        ).innerHTML += `<option value="${ship}">${ship}</option>`;
    });
};

const getSeniority = (data) => {
    $("#select-seniority").innerHTML = "";
    $("#select-seniority").innerHTML =
        '<option value="" selected disabled>Seniority</option>';
    let seniority = [];
    data.forEach((job) => {
        if (!seniority.includes(job.seniority)) {
            seniority.push(job.seniority);
        }
    });
    seniority.forEach((seniority) => {
        $(
            "#select-seniority"
        ).innerHTML += `<option value="${seniority}">${seniority}</option>`;
    });
};

const getDepartments = (data) => {
    $("#select-department").innerHTML = "";
    $("#select-department").innerHTML =
        '<option value="" selected disabled>Department</option>';
    let department = [];
    data.forEach((job) => {
        if (!department.includes(job.department)) {
            department.push(job.department);
        }
    });
    department.forEach((department) => {
        $(
            "#select-department"
        ).innerHTML += `<option value="${department}">${department}</option>`;
    });
};

window.onload = getJobs();
