const getJobs = async () => {
    showView("spinner");
    let response = await fetch(
        "https://651eecc744a3a8aa47693542.mockapi.io/Jobs"
    );
    let data = await response.json();

    renderHome(data);
};

const getJobDetail = (id) => {
    console.log("este es el id", id);
};

const renderHome = (data) => {
    printJobs(data);
    getShips(data);
    getSeniority(data);
    getDepartments(data);
};

const createNewJob = () => {
    let newJob = {
        name: "FrontEnd Developer",
        image: "image",
        description: "description ",
        location: "Brazil",
        category: "Development",
        seniority: "Junior",
        benefits: {
            vacation: "3 weeks",
            health_ensurance: "OSDE 210",
            internet_paid: true,
        },
        salary: 44,
        long_term: false,
        languajes: [],
    };
};
