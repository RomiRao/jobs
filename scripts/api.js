const getJobs = () => {
    fetch("https://651eecc744a3a8aa47693542.mockapi.io/Jobs")
        .then((response) => response.json())
        .then((data) => inicializar(data));
};

const inicializar = (data) => {
    getCountries(data);
    //renderJobs(data)
};

const getCountries = (data) => {
    const countries = [];
    data.forEach((element) => {
        if (!countries.includes(element.location)) {
            countries.push(element.location);
        }
    });
    console.log(countries);
    return countries;
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

window.onload = getJobs();
