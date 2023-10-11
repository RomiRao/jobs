const apiUrl = "https://651eecc744a3a8aa47693542.mockapi.io";

const getJobs = async () => {
    showView("spinner");
    let response = await fetch(`${apiUrl}/Jobs`);
    let data = await response.json();

    renderHome(data);
};

const postJob = async (newJob) => {
    showView("spinner");
    await fetch(`${apiUrl}/Jobs`, {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(newJob),
    });

    getJobs();
    cleanForm();
};

const getJobDetail = async (id) => {
    showView("spinner");
    let response = await fetch(`${apiUrl}/Jobs/${id}`);
    let data = await response.json();

    showJobDetails(data);
    editValues(data);
    $("#btn-delete-job").addEventListener("click", () => deleteJob(id));
};

const editJob = async (id, job) => {
    showView("spinner");
    await fetch(`${apiUrl}/Jobs/${id}`, {
        method: "PUT",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(job),
    });

    getJobs();
};

const deleteJob = async (id) => {
    showView("spinner");
    await fetch(`${apiUrl}/Jobs/${id}`, {
        method: "DELETE",
    });

    getJobs();
};

const renderHome = (data) => {
    printJobs(data);
    getShips(data);
    getSeniority(data);
    getDepartments(data);
};
