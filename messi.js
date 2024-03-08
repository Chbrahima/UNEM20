// Fonction pour générer une couleur aléatoire
function getRandomColor() {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

// Fonction pour calculer la moyenne d'une matière
function calculerMoyenneMatiere(noteDevoir, noteExamen, coefDevoir, coefExamen) {
    return (noteDevoir * coefDevoir + noteExamen * coefExamen) / (coefDevoir + coefExamen);
}

document.addEventListener('DOMContentLoaded', function() {
    const modulesContainer = document.getElementById('modules');
    const addModuleButton = document.getElementById('addModule');
    const calculateButton = document.getElementById('calculateAverage');
    const resultElement = document.getElementById('result');
    const moyenneGeneraleElement = document.createElement('p'); // Element pour afficher la moyenne générale
    const cancelButton = document.createElement('button'); // Bouton pour annuler
    const deleteModuleButton = document.createElement('button'); // Bouton pour supprimer un module

    cancelButton.textContent = 'Annuler';
    deleteModuleButton.textContent = 'Supprimer Module';
    

    function changeButtonColor(button) {
    button.style.backgroundColor = 'white';
    }

    addModuleButton.addEventListener('click', function() {
        const moduleDiv = document.createElement('div');
        moduleDiv.classList.add('module');
        moduleDiv.style.backgroundColor = getRandomColor();

        const moduleNameInput = document.createElement('input');
        moduleNameInput.setAttribute('type', 'text');
        moduleNameInput.setAttribute('placeholder', 'Nom du module');

        const moduleCoursesDiv = document.createElement('div');
        moduleCoursesDiv.classList.add('module-courses');

        const addCourseButton = document.createElement('button');
        addCourseButton.textContent = 'Ajouter une matière';
        addCourseButton.addEventListener('click', function() {
            const courseDiv = document.createElement('div');
            courseDiv.classList.add('course');

            const courseNameInput = document.createElement('input');
            courseNameInput.setAttribute('type', 'text');
            courseNameInput.setAttribute('placeholder', 'Nom de la matière');

            const creditInput = document.createElement('input');
            creditInput.setAttribute('type', 'number');
            creditInput.setAttribute('placeholder', 'Crédits');

            const assignmentInput = document.createElement('input');
            assignmentInput.setAttribute('type', 'number');
            assignmentInput.setAttribute('placeholder', 'Note de devoir');
            assignmentInput.setAttribute('min', '0');
            assignmentInput.setAttribute('max', '20');

            const examInput = document.createElement('input');
            examInput.setAttribute('type', 'number');
            examInput.setAttribute('placeholder', 'Note d\'examen');
            examInput.setAttribute('min', '0');
            examInput.setAttribute('max', '20');

            const resultElementMatiere = document.createElement('p');
            resultElementMatiere.classList.add('moyenne-matiere');

            courseDiv.appendChild(courseNameInput);
            courseDiv.appendChild(creditInput);
            courseDiv.appendChild(assignmentInput);
            courseDiv.appendChild(examInput);
            courseDiv.appendChild(resultElementMatiere);
            moduleCoursesDiv.appendChild(courseDiv);
        });

        moduleDiv.appendChild(moduleNameInput);
        moduleDiv.appendChild(moduleCoursesDiv);
        moduleDiv.appendChild(addCourseButton);
        modulesContainer.appendChild(moduleDiv);
    });

    calculateButton.addEventListener('click', function() {
        let modules = document.querySelectorAll('.module');
        let totalCredits = 0;
        let totalPoints = 0;

        modules.forEach(module => {
            let moduleCourses = module.querySelectorAll('.course');
            let totalModuleCredits = 0;
            let totalModulePoints = 0;

            moduleCourses.forEach(course => {
                let creditInput = course.querySelector('input[type="number"]:nth-child(2)');
                let assignmentInput = course.querySelector('input[type="number"]:nth-child(3)');
                let examInput = course.querySelector('input[type="number"]:nth-child(4)');
                let resultElementMatiere = course.querySelector('.moyenne-matiere');

                let credits = parseFloat(creditInput.value);
                let assignmentGrade = parseFloat(assignmentInput.value);
                let examGrade = parseFloat(examInput.value);

                if (!isNaN(credits) && !isNaN(assignmentGrade) && !isNaN(examGrade) &&
                    assignmentGrade >= 0 && assignmentGrade <= 20 &&
                    examGrade >= 0 && examGrade <= 20) {

                    totalModuleCredits += credits;
                    let averageMatiere = calculerMoyenneMatiere(assignmentGrade, examGrade, 0.4, 0.6);
                    totalModulePoints += averageMatiere * credits;
                    resultElementMatiere.textContent = `Moyenne de la matière : ${isNaN(averageMatiere) ? 'NaN' : averageMatiere.toFixed(2)}`;
                    resultElementMatiere.style.color = averageMatiere >= 10 ? 'green' : 'red';
                    resultElementMatiere.textContent += averageMatiere >= 10 ? ' VALIDE' : ' RATTRAPAGE';
                } else {
                    resultElementMatiere.textContent = 'Veuillez saisir des notes valides (entre 0 et 20)';
                }
            });

            let averageModule = totalModulePoints / totalModuleCredits;
            let moduleName = module.querySelector('input[type="text"]').value;

            let moduleAverageElement = document.createElement('p');
            moduleAverageElement.textContent = `Moyenne du module ${moduleName}: ${isNaN(averageModule) ? 'NaN' : averageModule.toFixed(2)}`;
            module.appendChild(moduleAverageElement);

            totalCredits += totalModuleCredits;
            totalPoints += totalModulePoints;
        });

        let averageGeneral = totalPoints / totalCredits;
        moyenneGeneraleElement.textContent = `Moyenne générale : ${isNaN(averageGeneral) ? 'NaN' : averageGeneral.toFixed(2)}`;
        resultElement.appendChild(moyenneGeneraleElement);

        // Définir la couleur de la moyenne générale en fonction de la valeur
        resultElement.style.color = averageGeneral >= 10 ? 'green' : 'red';
    });

    // Ajout de l'écouteur d'événements pour le bouton "Annuler"
    cancelButton.addEventListener('click', function() {
        document.querySelectorAll('input[type="number"]').forEach(input => {
            input.value = '';
        });
    });

    // Ajout de l'écouteur d'événements pour le bouton "Supprimer Module"
    deleteModuleButton.addEventListener('click', function() {
        // Sélectionne le module parent du bouton "Supprimer Module" et le supprime
        let module = deleteModuleButton.parentNode;
        module.remove();
    });

    // Ajout des boutons au document avec un espace entre eux
    document.body.appendChild(cancelButton);
    document.body.appendChild(document.createTextNode(' ')); // Ajoute un espace
    document.body.appendChild(deleteModuleButton);
});
