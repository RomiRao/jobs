const getJobs = async () => {
    showView("spinner");
    let response = await fetch(
        "https://651eecc744a3a8aa47693542.mockapi.io/Jobs"
    );
    let data = await response.json();

    renderHome(data);
};

const postJob = async (newJob) => {
    showView("spinner");
    await fetch("https://651eecc744a3a8aa47693542.mockapi.io/Jobs", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(newJob),
    });

    getJobs();
    cleanForm();
};

const getJobDetail = async (id) => {
    showView("spinner");
    let response = await fetch(
        `https://651eecc744a3a8aa47693542.mockapi.io/Jobs/${id}`
    );
    let data = await response.json();

    showJobDetails(data);
    editValues(data);
};

const renderHome = (data) => {
    printJobs(data);
    getShips(data);
    getSeniority(data);
    getDepartments(data);
};
