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
    $("#cards-container").innerHTML = "";
    jobList.forEach(
        ({ id, image, name, description, ship, department, seniority }) => {
            const card = document.createElement("div");

            card.id = id;
            card.className = "card m-3 shadow";
            card.style.width = "18rem";

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

//-----------------
// Job details get individual job from api
//------------------

const showJobDetails = ({
    id,
    image,
    name,
    description,
    ship,
    department,
    seniority,
    salary,
    languages,
    airplaine_tickets,
    benefits: { contract, vacation, internet_paid },
}) => {
    $("#show-title").innerHTML = name;
    $("#show-description").innerHTML = description;
    $("#show-salary").innerHTML = salary;
    $("#show-contract").innerHTML = contract;
    $("#show-vacation").innerHTML = vacation;
    $("#show-ship").innerHTML = ship;
    $("#show-department").innerHTML = department;
    $("#show-seniority").innerHTML = seniority;
    $("#show-image").setAttribute("src", image);
    $("#show-languages").innerHTML = `${languages.join("  ")}`;
    showTag(airplaine_tickets, $("#show-tickets"));
    showTag(internet_paid, $("#show-internet"));
    showView("show-details");

    $("#btn-delete-job").addEventListener("click", () => deleteJob(id));
};

$("#edit-view").addEventListener("click", () => {
    $("#edit-career").classList.remove("visually-hidden");
});

const showTag = (value, tag) => {
    if (value) {
        tag.classList.remove("visually-hidden");
    } else {
        tag.classList.add("visually-hidden");
    }
};

//EDIT JOB

const editValues = ({
    id,
    image,
    name,
    description,
    ship,
    department,
    seniority,
    salary,
    languages: [lan1, lan2, lan3],
    airplaine_tickets,
    benefits: { contract, vacation, internet_paid },
}) => {
    $("#edit-title").value = name;
    $("#edit-description").value = description;
    $("#edit-salary").value = salary;
    $("#edit-contract").value = contract;
    $("#edit-vacation").value = vacation;
    $("#edit-ship").value = ship;
    $("#edit-department").value = department;
    $("#edit-seniority").value = seniority;
    $("#edit-image").value = image;
    $("#edit-lan-1").value = lan1;
    $("#edit-lan-2").value = lan2;
    $("#edit-lan-3").value = lan3;
    $("#edit-tickets").checked = airplaine_tickets;
    $("#edit-internet").checked = internet_paid;

    $("#edit-job").addEventListener("click", () => {
        editJob(id, {
            name: $("#edit-title").value,
            image: $("#edit-image").value,
            description: $("#edit-description").value,
            ship: $("#edit-ship").value,
            department: $("#edit-department").value,
            seniority: $("#edit-seniority").value,
            benefits: {
                vacation: $("#edit-vacation").value,
                contract: $("#edit-contract").value,
                internet_paid: $("#edit-internet").checked,
            },
            salary: $("#edit-salary").value,
            airplaine_tickets: $("#edit-tickets").checked,
            languages: [
                $("#edit-lan-1").value,
                $("#edit-lan-2").value,
                $("#edit-lan-3").value,
            ],
        });
    });
};

//----------
//GET FILTERS FROM API
//--------------

const getFilter = async (filter, data) => {
    const dataList = await data;
    const arrayOfOptions = [];

    dataList.forEach((job) => {
        if (!arrayOfOptions.includes(job[filter])) {
            arrayOfOptions.push(job[filter]);
        }
    });

    $("#select-value").innerHTML = "";
    $("#select-value").innerHTML =
        "<option value='' disabled selected>Options</option>";
    arrayOfOptions.forEach((option) => {
        $(
            "#select-value"
        ).innerHTML += `<option value='${option}'>${option}</option>`;
    });
};

$("#select-tag").addEventListener("change", (e) =>
    getFilter(e.target.value, getInfo())
);

$("#search-job").addEventListener("click", () => getFilteredJobs());
$("#clear-search").addEventListener("click", () => {
    $("#select-tag").value = "";
    $("#select-value").value = "";
});

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
        languages: [
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
