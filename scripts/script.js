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
                getJobDetail(id)
            );
        }
    );
};

const cutText = (text) => {
    if (text.length > 150) {
        return `${text.slice(0, 150)}...`;
    } else {
        return text;
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

//-----------------
// TO ADD NEW JOB AND POST ON API
//-----------------

const newJobView = () => {
    showView("new-career");
};

const createNewJob = () => {
    let newJob = {
        name: $("#job-title").value,
        image: $("#job-image").value,
        description: $("#job-description").value,
        ship: $("#job-ship").value,
        department: $("#job-department").value,
        seniority: $("#job-seniority").value,
        benefits: {
            vacation: $("#job-vacation").value,
            contract: $("#job-contract").value,
            internet_paid: $("#job-internet").checked,
        },
        salary: $("#job-salary").value,
        airplaine_tickets: $("#job-tickets").checked,
        languajes: [
            $("#job-lan-1").value,
            $("#job-lan-2").value,
            $("#job-lan-3").value,
        ],
    };

    postJob(newJob);
};

const cleanForm = () => {
    $("#job-title").value = "";
    $("#job-image").value = "";
    $("#job-description").value = "";
    $("#job-ship").value = "";
    $("#job-department").value = "";
    $("#job-seniority").value = "";
    $("#job-vacation").value = "";
    $("#job-contract").value = "";
    $("#job-internet").checked = false;
    $("#job-salary").value = "";
    $("#job-tickets").checked = false;
    $("#job-lan-1").value = "";
    $("#job-lan-2").value = "";
    $("#job-lan-3").value = "";
};

$("#home-btn").addEventListener("click", () => getJobs());
$("#create-job").addEventListener("click", () => newJobView());
$("#submit-job").addEventListener("click", () => createNewJob());
window.onload = getJobs();
