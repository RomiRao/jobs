const apiUrl = "https://651eecc744a3a8aa47693542.mockapi.io";

//get general info
const getInfo = async () => {
    let response = await fetch(`${apiUrl}/Jobs`);
    let data = await response.json();

    return data;
};

//print jobs info
const getJobs = async () => {
    showView("spinner");

    let data = await getInfo();

    printJobs(data);
    showView("home");
};

//filter jobs
const getFilteredJobs = async () => {
    showView("spinner");

    const url = new URL(`${apiUrl}/Jobs`);
    url.searchParams.append($("#select-tag").value, $("#select-value").value);

    let response = await fetch(url);
    let data = await response.json();

    printJobs(data);
    showView("home");
};

//new job on api
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

//see one job
const getJobDetail = async (id) => {
    showView("spinner");

    let response = await fetch(`${apiUrl}/Jobs/${id}`);
    let data = await response.json();

    showJobDetails(data);
    editValues(data);
};

//update job list
const editJob = async (id, job) => {
    showView("spinner");

    await fetch(`${apiUrl}/Jobs/${id}`, {
        method: "PUT",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(job),
    });

    getJobs();
};

//delete one job
const deleteJob = async (id) => {
    showView("spinner");

    await fetch(`${apiUrl}/Jobs/${id}`, {
        method: "DELETE",
    });

    getJobs();
};
